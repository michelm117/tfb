import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogImgData } from '@tfb/api-interfaces';

@Component({
  selector: 'tfb-dialog',
  templateUrl: './img-dialog.component.html',
  styleUrls: ['./img-dialog.component.scss'],
})
export class ImgDialogComponent {
  @Output() submitClicked = new EventEmitter<FileList>();
  selectedFiles?: FileList;
  selectedFileName = '';
  previews: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<ImgDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogImgData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.submitClicked.emit(this.selectedFiles);
    this.dialogRef.close();
  }

  selectFiles(event: any): void {
    this.selectedFileName = '';
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.previews.push(e.target.result);
      };

      reader.readAsDataURL(this.selectedFiles[0]);
      this.selectedFileName = this.selectedFiles[0].name;
    }
  }
}
