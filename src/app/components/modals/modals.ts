import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'dialog-update',
  templateUrl: 'update.html',
})
export class UpdateDialog {
  constructor(public dialogRef: MatDialogRef<UpdateDialog>) { }
  closeDialog() {
    this.dialogRef.close('update');
  }
}

@Component({
  selector: 'dialog-create',
  templateUrl: 'create.html',
})
export class CreateDialog {
  constructor(public dialogRef: MatDialogRef<CreateDialog>) { }
  closeDialog() {
    this.dialogRef.close('create');
  }
}

@Component({
  selector: 'dialog-delete',
  templateUrl: 'delete.html',
})
export class DeleteDialog {
  constructor(public dialogRef: MatDialogRef<DeleteDialog>) { }
  closeDialog() {
    this.dialogRef.close('cancel');
  }
  borrar(){
    this.dialogRef.close('delete');
  }
}

@Component({
  selector: 'dialog-error',
  templateUrl: 'error.html',
})
export class ErrorDialog {
  public msg:string;
  constructor(public dialogRef: MatDialogRef<ErrorDialog>, @Inject(MAT_DIALOG_DATA) public data:any) { }
  closeDialog() {
    this.dialogRef.close('cancel');
  }
}

