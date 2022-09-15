import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'tfb-image-upload-panel',
  templateUrl: './image-upload-panel.component.html',
  styleUrls: ['./image-upload-panel.component.scss'],
})
export class ImageUploadPanelComponent implements OnInit {
  // current event images
  @Input() imgNames: string[] = [];
  @Input() clearPreviewEvent: Observable<void>;
  @Output() imageDeletedEvent = new EventEmitter<number>();

  private clearPreviewSubscription: Subscription;

  // new images variables
  @ViewChild('imageInput', { static: false })
  imageInputVar: ElementRef;
  previews: string[] = [];
  imageFiles?: FileList = undefined;
  selectedFileNames: string[] = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.clearPreviewSubscription = this.clearPreviewEvent.subscribe(() => {
      this.imgNames = [];
      this.previews = [];
      this.selectedFileNames = [];
      this.imageFiles = undefined;
      this.imageInputVar.nativeElement.value = '';
    });
  }

  ngOnDestroy() {
    this.clearPreviewSubscription.unsubscribe();
  }

  selectFiles(event: any): void {
    this.imageFiles = event.target.files;
    console.log(this.imageFiles?.length);

    this.previews = [];
    if (this.imageFiles && this.imageFiles[0]) {
      const numberOfFiles = this.imageFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.imageFiles[i]);
        this.selectedFileNames.push(this.imageFiles[i].name);
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
          if (imageName === img) {
            this.imgNames.splice(index, 1);
            this.imageDeletedEvent.emit(index);
          }
        });
        dialogSubmitSubscription.unsubscribe();
      });
  }

  public getImageFiles() {
    return this.imageFiles;
  }
}
