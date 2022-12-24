import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { DalleVariationService } from '../services/dalle-variation.service';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'cam-capture',
  templateUrl: './cam-capture.component.html',
  styleUrls: ['./cam-capture.component.scss'],
})
export class CamCaptureComponent implements AfterViewInit {
  WIDTH = 640;
  HEIGHT = 480;

  @ViewChild('video')
  public video: ElementRef | undefined;

  @ViewChild('canvas')
  public canvas: ElementRef | undefined;

  captures: string[] = [];
  error: any;
  isCaptured: boolean = false;

  async ngAfterViewInit() {
    await this.setupDevices();
  }

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (stream) {
          this.video!.nativeElement.srcObject = stream;
          this.video!.nativeElement.play();
          this.error = null;
        } else {
          this.error = 'You have no output video device';
        }
      } catch (e) {
        this.error = e;
      }
    }
  }

  capture() {
    this.drawImageToCanvas(this.video?.nativeElement);
    this.captures.push(this.canvas?.nativeElement.toDataURL('image/png'));
    this.isCaptured = true;
  }

  drawImageToCanvas(image: any) {
    this.canvas?.nativeElement
      .getContext('2d')
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }
}
