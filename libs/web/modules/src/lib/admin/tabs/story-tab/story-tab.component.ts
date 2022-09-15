import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CountryInterface, StoryInterface } from '@tfb/api-interfaces';
import { CountryService, FlagService, StoryService } from '@tfb/web/data';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@tfb/web/shared';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { forkJoin, Observable, of } from 'rxjs';

@Component({
  selector: 'tfb-story-tab',
  templateUrl: './story-tab.component.html',
  styleUrls: ['./story-tab.component.scss'],
})
export class StoryTabComponent implements OnInit {
  countries: CountryInterface[] = [];

  displayedColumns = ['id', 'title', 'place', 'country', 'date', 'podium'];

  selectedStory: StoryInterface | undefined;
  stories: StoryInterface[] = [];
  storyForm!: FormGroup;

  @ViewChild('imageInput', { static: false })
  imageInputVar: ElementRef;
  previews: string[] = [];
  selectedFiles?: FileList = undefined;
  selectedFileNames: string[] = [];

  createNewStory = true;

  faTrophy = faTrophy;
  faBan = faBan;
  showLoading = false;

  constructor(
    private storyService: StoryService,
    private countryService: CountryService,
    public dialog: MatDialog,
    private flagService: FlagService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.storyForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      place: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.minLength(450)]],
      podium: [false, [Validators.required]],
      country: [-1, [Validators.required, Validators.min(0)]],
      date: [null, [Validators.required]],
    });
    this.fetchStories();
    this.countryService.getCountries().subscribe((countries) => {
      this.countries = countries;
    });
  }

  rowClicked(clickedStory: StoryInterface) {
    this.storyForm.setValue({
      title: clickedStory.title,
      content: clickedStory.text,
      country: clickedStory.country.id,
      date: clickedStory.date,
      place: clickedStory.place,
      podium: clickedStory.podium,
    });
    this.selectedStory = clickedStory;
    this.createNewStory = false;
    this.previews = [];
    this.selectedFiles = undefined;
    this.imageInputVar.nativeElement.value = '';
  }

  getFlag(iso: string) {
    return this.flagService.get(iso);
  }

  getImage(imgName: string) {
    return this.storyService.getPicture(imgName);
  }

  addImage() {
    console.log('CLICK');
  }

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

  async onSubmit() {
    if (this.getFormValidationErrors()?.length > 0) {
      return;
    }
    this.showLoading = true;

    const title = this.storyForm.get('title')?.value;
    const place = this.storyForm.get('place')?.value;
    const text = this.storyForm.get('content')?.value;
    const podium = this.storyForm.get('podium')?.value;
    const country = this.storyForm.get('country')?.value;
    const date = this.storyForm.get('date')?.value;

    const story: Partial<StoryInterface> = {
      title,
      country,
      place,
      text,
      podium,
      date,
      imgNames: [],
    };

    if (this.createNewStory) {
      // Create Story
      this.storyService.createStory(story).subscribe((story) => {
        // Update the new story locally
        if (this.selectedFiles) {
          this.uploadImagesAndUpdateStory(story.id, story);
        } else {
          this.fetchStories();
        }
      });
    } else {
      // Update Story
      if (!this.selectedStory) {
        this.showLoading = false;
        return;
      }

      const id = this.selectedStory.id;
      story.imgNames = this.selectedStory.imgNames;

      if (this.selectedFiles) {
        // Upload selected images and update the story with the generated image names
        this.uploadImagesAndUpdateStory(id, story);
      } else {
        // No images where added
        this.storyService.updateStory(id, story).subscribe((story) => {
          // Update the new story locally
          this.updateLocalStory(id, story);
        });
      }
    }
  }

  deleteStory() {
    this.showLoading = true;
    if (!this.selectedStory) {
      return;
    }
    const id = this.selectedStory.id;
    this.storyService.deleteStory(id).subscribe((res) => {
      console.log(res);
      this.fetchStories();
    });
  }

  uploadImagesAndUpdateStory(id: number, story: Partial<StoryInterface>) {
    if (this.selectedFiles) {
      // Create array of tasks. One task is to upload an image
      const tasks: Observable<{ imagePath: string }>[] = [];
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const file = this.selectedFiles.item(i);
        if (!file) {
          continue;
        }
        const task = this.storyService.uploadImage(id, file);
        tasks.push(task);
      }

      // Upload all images and the update the story with the given image names
      forkJoin(tasks).subscribe((res) => {
        const addedImages: string[] = [];
        for (let i = 0; i < res.length; i++) {
          const imageName = res[i].imagePath;
          addedImages.push(imageName);
        }

        if (this.selectedStory) {
          // add old images
          story.imgNames = addedImages.concat(this.selectedStory.imgNames);
        } else {
          story.imgNames = addedImages;
        }

        this.storyService.updateStory(id, story).subscribe((story) => {
          this.updateLocalStory(id, story);
        });
      });
    }
  }

  createStory(story: Partial<StoryInterface>) {
    this.showLoading = true;
    this.storyService.createStory(story).subscribe((story) => {
      this.fetchStories();
    });
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
        this.selectedStory?.imgNames.forEach((img, index) => {
          if (imageName === img) this.selectedStory?.imgNames.splice(index, 1);
        });
        dialogSubmitSubscription.unsubscribe();
      });
  }

  uploadImage(id: number, file: File) {
    return this.storyService.uploadImage(id, file);
  }

  resetSelection() {
    this.storyForm.setValue({
      title: '',
      content: '',
      country: -1,
      date: null,
      place: '',
      podium: false,
    });
    this.selectedStory = undefined;
    this.createNewStory = true;
  }

  private fetchStories() {
    this.storyService.getStories().subscribe((stories) => {
      stories.sort((a, b) => {
        return a.id - b.id;
      });
      this.stories = stories;
      this.resetSelection();
      this.showLoading = false;
    });
  }

  private updateLocalStory(id: number, story: StoryInterface) {
    const foundIndex = this.stories.findIndex((x) => x.id == id);
    if (foundIndex >= 0) {
      this.stories[foundIndex] = story;
    }

    this.selectedStory = story;

    // Reset selection
    this.selectedFileNames = [];
    this.selectedFiles = undefined;
    this.previews = [];
    this.imageInputVar.nativeElement.value = '';

    this.fetchStories();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.storyForm.controls;
  }

  getFormValidationErrors() {
    const result: any[] = [];

    if (!this.storyForm) {
      return result;
    }
    Object.keys(this.storyForm.controls).forEach((key) => {
      const control = this.storyForm.get(key);
      if (!control) {
        return;
      }
      const controlErrors: ValidationErrors | null = control.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach((keyError) => {
          result.push({
            control: key,
            error: keyError,
            value: controlErrors[keyError],
          });
        });
      }
    });

    return result;
  }
}
