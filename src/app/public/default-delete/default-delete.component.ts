import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-default-delete',
  templateUrl: './default-delete.component.html',
  styleUrls: ['./default-delete.component.scss'],
})
export class DefaultDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DefaultDeleteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: dialogData
  ) {}

  get title(): string {
    return this.data.title;
  }
  get message(): string {
    return this.data.message;
  }
  get messageNo() {
    return this.data?.messageNo;
  }
  get messageYes() {
    return this.data.messageYes;
  }

  closeDialog(yesNo: boolean) {
    this.dialogRef.close(yesNo);
  }
}

export interface dialogData {
  title: string;
  message: string;
  messageNo?: string;
  messageYes: string;
}
