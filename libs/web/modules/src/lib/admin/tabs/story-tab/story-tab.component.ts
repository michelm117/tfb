import { Component, Input, OnInit } from '@angular/core';
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
  Validators,
} from '@angular/forms';

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

  previews: string[] = [];
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];

  faTrophy = faTrophy;
  faBan = faBan;

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
      content: ['', [Validators.required]],
      podium: [false, [Validators.required]],
      country: [-1, [Validators.required]],
      date: [null, [Validators.required]],
    });
    this.fetchStories();
    this.countryService.getCountries().subscribe((countries) => {
      this.countries = countries;
    });
  }

  updateSelectedStory(clickedStory: StoryInterface) {
    this.storyForm.setValue({
      title: clickedStory.title,
      content: clickedStory.text,
      country: clickedStory.country.id,
      date: clickedStory.date,
      place: clickedStory.place,
      podium: clickedStory.podium,
    });
    this.selectedStory = clickedStory;
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

  onSubmit() {
    const title = this.storyForm.get('title')?.value;
    const place = this.storyForm.get('place')?.value;
    const text = this.storyForm.get('content')?.value;
    const podium = this.storyForm.get('podium')?.value;
    const country = this.storyForm.get('country')?.value;
    const date = this.storyForm.get('date')?.value;

    const storyDto: Partial<StoryInterface> = {
      title,
      place,
      text,
      podium,
      country,
      date,
    };
    if (this.selectedStory) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { imgNames, ...updateStory } = storyDto;
      this.updateStory(this.selectedStory.id, updateStory);
    } else {
      this.createStory(storyDto);
    }
  }

  updateStory(id: number, story: Partial<StoryInterface>) {
    this.storyService.updateStory(id, story).subscribe((res) => {
      console.log(res);
      this.fetchStories();
    });
  }

  createStory(story: Partial<StoryInterface>) {
    console.log('Create', JSON.stringify(story));

    this.storyService.createStory(story).subscribe((story) => {
      console.log(story);
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
      dialogRef.componentInstance.submitClicked.subscribe((result) => {
        // this.riderService.deleteRider(id).subscribe(() => {
        //   this.refreshRiders.emit();
        // });
        this.fetchStories();
        dialogSubmitSubscription.unsubscribe();
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
    });
    this.selectedStory = undefined;
  }

  private fetchStories() {
    this.storyService.getStories().subscribe((stories) => {
      this.stories = stories;
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.storyForm.controls;
  }
}
