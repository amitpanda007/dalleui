import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './common/angular-material.module';
import { NavComponent } from './common/nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { DalleImageComponent } from './dalle-image/dalle-image.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DalleVariationComponent } from './dalle-variation/dalle-variation.component';
import { DragDropFileUploadDirective } from './common/drag-drop-file-upload.directive';
import { CamCaptureComponent } from './cam-capture/cam-capture.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DragDropFileUploadDirective,
    DalleImageComponent,
    DalleVariationComponent,
    CamCaptureComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
