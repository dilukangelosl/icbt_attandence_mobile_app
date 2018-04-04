import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MychekinsPage } from './mychekins';

@NgModule({
  declarations: [
    MychekinsPage,
  ],
  imports: [
    IonicPageModule.forChild(MychekinsPage),
  ],
})
export class MychekinsPageModule {}
