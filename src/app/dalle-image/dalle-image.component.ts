import { Component, OnInit } from '@angular/core';
import { DalleService } from '../services/dalle.service';

@Component({
  selector: 'dalle-image',
  templateUrl: 'dalle-image.component.html',
  styleUrls: ['dalle-image.component.scss'],
})
export class DalleImageComponent implements OnInit {
  message: string | undefined;
  apiImage: string | undefined;
  inputText: string | undefined = '';
  isLoadingImage: boolean = false;
  constructor(private dalleService: DalleService) {}

  async ngOnInit() {
    this.dalleService.apiHome().subscribe((data: any) => {
      console.log(data);
      this.message = data.message;
    });
  }

  generateImage() {
    this.isLoadingImage = true;
    if (this.inputText && this.inputText?.trim().length > 0) {
      console.log(this.inputText);
      this.dalleService
        .createRandomImageFromText(this.inputText)
        .subscribe((data: any) => {
          console.log(data);
          this.apiImage = data;
          this.isLoadingImage = false;
        });
    }
  }
}
