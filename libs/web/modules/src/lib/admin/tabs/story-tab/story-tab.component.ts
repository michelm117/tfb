import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CountryInterface, StoryInterface } from '@tfb/api-interfaces';
import { CountryService, FlagService, StoryService } from '@tfb/web/data';
import { faTrophy, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, ImageUploadPanelComponent } from '@tfb/web/shared';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { forkJoin, Observable, of, Subject } from 'rxjs';

@Component({
  selector: 'tfb-story-tab',
  templateUrl: './story-tab.component.html',
  styleUrls: ['./story-tab.component.scss'],
})
export class StoryTabComponent implements OnInit {
  countries: CountryInterface[] = [];

  displayedColumns = [
    'show',
    'id',
    'title',
    'place',
    'country',
    'date',
    'podium',
  ];

  selectedStory: StoryInterface | undefined;
  stories: StoryInterface[] = [];
  storyForm!: FormGroup;

  @ViewChild(ImageUploadPanelComponent, { static: true })
  imageUploadPanel: ImageUploadPanelComponent;
  clearImagePreviewEvent: Subject<void> = new Subject<void>();

  createNewStory = true;

  faTrophy = faTrophy;
  faEye = faEye;
  faBan = faBan;
  faEyeSlash = faEyeSlash;
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
      podium: [false],
      country: [-1, [Validators.required, Validators.min(0)]],
      date: [null, [Validators.required]],
      show: [false],
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
      show: clickedStory.show,
    });
    this.selectedStory = clickedStory;
    this.createNewStory = false;
    this.clearImagePreviewEvent.next();
  }

  getFlag(iso: string) {
    return this.flagService.get(iso);
  }

  async onSubmit() {
    if (this.getFormValidationErrors()?.length > 0) {
      return;
    }
    this.showLoading = true;

    const imageFiles = this.imageUploadPanel.getImageFiles();
    const title = this.storyForm.get('title')?.value;
    const place = this.storyForm.get('place')?.value;
    const text = this.storyForm.get('content')?.value;
    const podium = this.storyForm.get('podium')?.value;
    const show = this.storyForm.get('show')?.value;
    const country = this.storyForm.get('country')?.value;
    const date = this.storyForm.get('date')?.value;

    const story: Partial<StoryInterface> = {
      title,
      country,
      place,
      text,
      podium,
      show,
      date,
      imgNames: [],
    };

    if (this.createNewStory) {
      // Create Story
      this.storyService.createStory(story).subscribe((story) => {
        // Update the new story locally
        if (imageFiles) {
          this.uploadImagesAndUpdateStory(story.id, story, imageFiles);
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

      if (imageFiles) {
        // Upload selected images and update the story with the generated image names
        this.uploadImagesAndUpdateStory(id, story, imageFiles);
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
      this.fetchStories();
    });
  }

  uploadImagesAndUpdateStory(
    id: number,
    story: Partial<StoryInterface>,
    imageFiles: FileList
  ) {
    if (imageFiles) {
      // Create array of tasks. One task is to upload an image
      const tasks: Observable<{ imagePath: string }>[] = [];
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles.item(i);
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

  resetSelection() {
    this.storyForm.setValue({
      title: '',
      content: '',
      country: -1,
      date: null,
      place: '',
      podium: false,
      show: false,
    });
    this.selectedStory = undefined;
    this.createNewStory = true;
  }

  private fetchStories() {
    this.storyService.getAllStories().subscribe((stories) => {
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
    this.clearImagePreviewEvent.next();

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

  getPictures() {
    const images: string[] = [];
    if (!this.selectedStory) {
      return images;
    }
    for (let i = 0; i < this.selectedStory.imgNames.length; i++) {
      const imageName = this.selectedStory.imgNames[i];
      images.push(this.storyService.getPicture(imageName));
    }
    return images;
  }

  deleteImage(index: number) {
    if (!this.selectedStory) {
      return;
    }
    this.selectedStory.imgNames.splice(index, 1);
  }
}
