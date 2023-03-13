import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    FileUploadComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule, MatButtonModule,

  ],
  exports: [
    FileUploadComponent
  ]
})
export class FileUploadModule { }