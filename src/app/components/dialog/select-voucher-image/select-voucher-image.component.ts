import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';


@Component({
  selector: 'app-select-voucher-image',
  templateUrl: './select-voucher-image.component.html',
  styleUrls: ['./select-voucher-image.component.css']
})
export class SelectVoucherImageComponent extends BaseDialog<SelectVoucherImageComponent> {

  constructor(dialogRef:MatDialogRef<SelectVoucherImageComponent>, @Inject(MAT_DIALOG_DATA) public data:SelectVoucherImageState) { 
    super(dialogRef );
  }
}

export enum SelectVoucherImageState{
  Close
}
