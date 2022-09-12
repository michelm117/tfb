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
  FormControl,
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
      country: [null, [Validators.required]],
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
      country: clickedStory.country,
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
    console.log('SUBMIT');
  }

  addNewStory() {
    console.log('ADD STORY');
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
      country: null,
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
