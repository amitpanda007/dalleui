import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CamCaptureComponent } from './cam-capture/cam-capture.component';
import { DalleImageComponent } from './dalle-image/dalle-image.component';
import { DalleVariationComponent } from './dalle-variation/dalle-variation.component';

const routes: Routes = [
  { path: '', component: DalleImageComponent },
  { path: 'aiavatar', component: DalleVariationComponent },
  { path: 'aiavatarcam', component: CamCaptureComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
