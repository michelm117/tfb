import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'tfb-image-upload-panel',
  templateUrl: './image-upload-panel.component.html',
  styleUrls: ['./image-upload-panel.component.scss'],
})
export class ImageUploadPanelComponent {
  // current event images
  imgNames: string[] = [];

  // new event images
  previews: string[] = [];
  selectedFiles?: FileList = undefined;
  selectedFileNames: string[] = [];

  constructor(public dialog: MatDialog) {}

  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }

  deleteImage(imageName: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data: {
        titel: 'Deleting Image?',
        text: 'Are you sure you want to delete the selected image?',
      },
    });

    const dialogSubmitSubscription =
      dialogRef.componentInstance.submitClicked.subscribe(() => {
        this.imgNames.forEach((img, index) => {
          if (imageName === img) this.imgNames.splice(index, 1);
        });
        dialogSubmitSubscription.unsubscribe();
      });
  }
}
