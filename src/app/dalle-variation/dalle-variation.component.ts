import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { DalleVariationService } from '../services/dalle-variation.service';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'dalle-variation',
  templateUrl: './dalle-variation.component.html',
  styleUrls: ['./dalle-variation.component.scss'],
})
export class DalleVariationComponent implements OnInit {
  @ViewChild('imgRef') variantPic!: ElementRef;
  fileArr: any[] = [];
  fileObj: any[] = [];
  form: FormGroup;
  msg!: string;
  progress: any = 0;
  uploadedFileImageUrl: any;
  sliderValue: any = 1;

  constructor(
    public fb: FormBuilder,
    private sanitizer: DomSanitizer,
    public dalleVariationService: DalleVariationService,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      file: [null],
    });
  }

  ngOnInit() {}

  upload(e: any) {
    this.progress = 0;
    this.fileArr = [];
    this.fileObj = [];

    const fileListAsArray = Array.from(e);
    fileListAsArray.forEach((item, i) => {
      const file = e as any;
      const url = URL.createObjectURL(file[i]);
      this.fileArr.push({ item, url: url });
    });

    this.fileArr.forEach((item) => {
      this.fileObj.push(item.item);
    });

    this.form.patchValue({
      file: this.fileObj,
    });

    this.form.get('file')?.updateValueAndValidity();

    // Upload to server
    this.dalleVariationService
      .imageVariation(this.form.value.file, this.sliderValue)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            this.msg = 'Upload started!';
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            if (event.total) {
              this.progress = Math.round((event.loaded / event.total) * 100);
              console.log(`Uploaded! ${this.progress}%`);
              this.msg = `Uploaded: ${this.progress}%`;
            }
            break;
          case HttpEventType.Response:
            console.log('File uploaded successfully!', event.body);
            this.msg = 'File uploaded successfully!';
            setTimeout(() => {
              // this.progress = 0;
              // this.fileArr = [];
              // this.fileObj = [];
              this.msg = event.body.message;
              this.uploadedFileImageUrl = event.body.images;
            }, 3000);
        }
      });
  }

  async downloadProfilePic() {
    var url = this.variantPic.nativeElement.src;
    window.open(url);

    // this.http.get(url, { responseType: 'blob' }).subscribe((val) => {
    //   console.log(val);
    //   const url = URL.createObjectURL(val);
    //   this.downloadUrl(url, 'image.png');
    //   URL.revokeObjectURL(url);
    // });
  }

  downloadUrl(url: string, fileName: string) {
    const a: any = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    a.remove();
  }

  // Clean Url
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  formatLabel(value: number): string {
    return `${value}`;
  }
}
