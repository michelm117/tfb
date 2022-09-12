import { Component, Input, OnInit } from '@angular/core';
import { CountryInterface, StoryInterface } from '@tfb/api-interfaces';
import { CountryService, FlagService, StoryService } from '@tfb/web/data';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'tfb-story-tab',
  templateUrl: './story-tab.component.html',
  styleUrls: ['./story-tab.component.scss'],
})
export class StoryTabComponent implements OnInit {
  countries: CountryInterface[] = [];

  displayedColumns = ['id', 'title', 'place', 'country', 'date', 'podium'];

  stories: StoryInterface[] = [];
  selectedStory: StoryInterface | undefined;
  selectedTitel = '';
  selectedPlace = '';
  selectedCountry?: CountryInterface;
  selectedDate: Date | undefined;
  selectedPodium = false;
  selectedContent = '';
  selectedImages: string[] = [];

  faTrophy = faTrophy;
  faBan = faBan;

  constructor(
    private storyService: StoryService,
    private countryService: CountryService,
    private flagService: FlagService
  ) {}

  ngOnInit(): void {
    this.storyService.getStories().subscribe((stories) => {
      this.stories = stories;
    });
    this.countryService.getCountries().subscribe((countries) => {
      this.countries = countries;
    });
  }

  updateSelectedStory(clickedStory: StoryInterface) {
    this.selectedStory = clickedStory;
    this.selectedTitel = clickedStory.title;
    this.selectedPlace = clickedStory.place;
    this.selectedCountry = clickedStory.country;
    this.selectedDate = clickedStory.date;
    this.selectedPodium = clickedStory.podium;
    this.selectedContent = clickedStory.text;
    this.selectedImages = clickedStory.imgNames;
  }

  deselectStory() {
    this.selectedStory = undefined;
    this.selectedTitel = '';
    this.selectedPlace = '';
    // this.selectedCountry?: CountryInterface;
    // this.selectedDate?: Date;
    this.selectedPodium = false;
    this.selectedContent = '';
    this.selectedImages = [];
  }

  getFlag(iso: string) {
    return this.flagService.get(iso);
  }

  getImage(imgName: string) {
    return this.storyService.getPicture(imgName);
  }

  onSubmit() {
    // this.riderService.addRider(name, surname, country).subscribe((rider) => {
    //   if (this.selectedFiles && this.selectedFiles[0]) {
    //     this.riderService
    //       .uploadImage(rider.id, this.selectedFiles[0])
    //       .subscribe((imgName) => {
    //         console.log(imgName);
    //       });
    //   }
    // this.refreshRiders.emit();
  }
}
