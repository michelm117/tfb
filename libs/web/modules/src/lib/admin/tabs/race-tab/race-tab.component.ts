import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { faTrophy, faBan } from '@fortawesome/free-solid-svg-icons';
import {
  AgeCategoryInterface,
  CountryInterface,
  RaceInterface,
  ResultInterface,
  RiderInterface,
} from '@tfb/api-interfaces';
import {
  RaceService,
  CountryService,
  FlagService,
  RiderService,
  AgeCategoryService,
} from '@tfb/web/data';
import { ImageUploadPanelComponent } from '@tfb/web/shared';
import { Observable, forkJoin, Subject } from 'rxjs';

@Component({
  selector: 'tfb-race-tab',
  templateUrl: './race-tab.component.html',
  styleUrls: ['./race-tab.component.scss'],
})
export class RaceTabComponent implements OnInit {
  countries: CountryInterface[] = [];
  riders: RiderInterface[] = [];
  ageCategories: AgeCategoryInterface[] = [];

  displayedColumnsRaces = ['id', 'title', 'place', 'country', 'date'];

  displayedColumnsResults = [
    'id',
    'rider',
    'ageCategory',
    'result',
    'acResult',
  ];
  results = new MatTableDataSource<ResultInterface>([]);
  selectedResult: ResultInterface | undefined;

  @ViewChild(ImageUploadPanelComponent, { static: true })
  imageUploadPanel: ImageUploadPanelComponent;
  clearImagePreviewEvent: Subject<void> = new Subject<void>();

  selectedRace: RaceInterface | undefined;
  races: RaceInterface[] = [];
  raceForm!: FormGroup;

  createNewRace = true;

  faTrophy = faTrophy;
  faBan = faBan;
  showLoading = false;

  constructor(
    private raceService: RaceService,
    private riderService: RiderService,
    private countryService: CountryService,
    private ageCatService: AgeCategoryService,
    public dialog: MatDialog,
    private flagService: FlagService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.results.data = [];

    this.raceForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      place: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.minLength(450)]],
      country: [-1, [Validators.required, Validators.min(0)]],
      date: [null, [Validators.required]],
    });

    this.fetchRaces();

    this.countryService.getCountries().subscribe((countries) => {
      this.countries = countries;
    });

    this.riderService.getRiders().subscribe((riders) => {
      this.riders = riders;
    });

    this.ageCatService.getAgeCats().subscribe((ageCats) => {
      this.ageCategories = ageCats;
    });
  }

  raceRowClicked(clickedRace: RaceInterface) {
    this.results.data = clickedRace.results;
    this.raceForm.setValue({
      title: clickedRace.title,
      content: clickedRace.text,
      country: clickedRace.country.id,
      date: clickedRace.date,
      place: clickedRace.place,
    });
    this.selectedRace = clickedRace;
    this.createNewRace = false;
    this.clearImagePreviewEvent.next();
  }

  resultRowClicked(clickedResult: ResultInterface) {
    this.selectedResult = clickedResult;
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
    const title = this.raceForm.get('title')?.value;
    const place = this.raceForm.get('place')?.value;
    const text = this.raceForm.get('content')?.value;
    const country = this.raceForm.get('country')?.value;
    const date = this.raceForm.get('date')?.value;

    const race: Partial<RaceInterface> = {
      title,
      country,
      place,
      text,
      date,
      imgNames: [],
    };

    if (this.createNewRace) {
      // Create Race
      this.raceService.createRace(race).subscribe((race) => {
        // Update the new race locally
        if (imageFiles) {
          this.uploadImagesAndUpdateRace(race.id, race, imageFiles);
        } else {
          this.fetchRaces();
        }
      });
    } else {
      // Update Race
      if (!this.selectedRace) {
        return;
      }

      const id = this.selectedRace.id;
      race.imgNames = this.selectedRace.imgNames;

      if (imageFiles) {
        // Upload selected images and update the race with the generated image names
        this.uploadImagesAndUpdateRace(id, race, imageFiles);
      } else {
        // No images where added
        this.raceService.updateRace(id, race).subscribe((race) => {
          // Update the new race locally
          this.updateLocalRace(id, race);
        });
      }
    }
  }

  deleteRace() {
    this.showLoading = true;
    if (!this.selectedRace) {
      return;
    }
    const id = this.selectedRace.id;
    this.raceService.deleteRace(id).subscribe(() => {
      this.fetchRaces();
    });
  }

  uploadImagesAndUpdateRace(
    id: number,
    race: Partial<RaceInterface>,
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
        const task = this.raceService.uploadImage(id, file);
        tasks.push(task);
      }

      // Upload all images and the update the race with the given image names
      forkJoin(tasks).subscribe((res) => {
        const addedImages: string[] = [];
        for (let i = 0; i < res.length; i++) {
          const imageName = res[i].imagePath;
          addedImages.push(imageName);
        }

        if (this.selectedRace) {
          // add old images
          race.imgNames = addedImages.concat(this.selectedRace.imgNames);
        } else {
          race.imgNames = addedImages;
        }

        this.raceService.updateRace(id, race).subscribe((race) => {
          this.updateLocalRace(id, race);
        });
      });
    }
  }

  createRace(race: Partial<RaceInterface>) {
    this.showLoading = true;
    this.raceService.createRace(race).subscribe((race) => {
      this.fetchRaces();
    });
  }

  resetSelection() {
    this.raceForm.setValue({
      title: '',
      content: '',
      country: -1,
      date: null,
      place: '',
    });
    this.selectedRace = undefined;
    this.createNewRace = true;
    this.results.data = [];
  }

  private fetchRaces() {
    this.raceService.getRaces().subscribe((races) => {
      races.sort((a, b) => {
        return a.id - b.id;
      });

      for (let i = 0; i < races.length; i++) {
        const race = races[i];
        const maxId =
          // eslint-disable-next-line prefer-spread
          Math.max.apply(
            Math,
            race.results.map((o) => {
              return o.id;
            })
          ) + 1;

        race.results.push({
          acResult: 0,
          id: maxId,
          ageCategory: { id: -1, name: '' },
          result: 0,
          rider: {
            id: -1,
            imgName: '',
            name: 'rider',
            surname: 'rider',
            country: { id: 0, iso: 'zzz', name: 'Country' },
          },
        });
        race.results.sort((a, b) => {
          return a.id - b.id;
        });
      }
      this.races = races;
      this.resetSelection();
      this.showLoading = false;
    });
  }

  private updateLocalRace(id: number, race: RaceInterface) {
    const foundIndex = this.races.findIndex((x) => x.id == id);
    if (foundIndex >= 0) {
      this.races[foundIndex] = race;
    }

    this.selectedRace = race;

    // Reset selection
    this.clearImagePreviewEvent.next();

    this.fetchRaces();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.raceForm.controls;
  }

  getFormValidationErrors() {
    const result: any[] = [];

    if (!this.raceForm) {
      return result;
    }
    Object.keys(this.raceForm.controls).forEach((key) => {
      const control = this.raceForm.get(key);
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
    if (!this.selectedRace) {
      return images;
    }
    for (let i = 0; i < this.selectedRace.imgNames.length; i++) {
      const imageName = this.selectedRace.imgNames[i];
      images.push(this.raceService.getPicture(imageName));
    }
    return images;
  }

  deleteImage(index: number) {
    if (!this.selectedRace) {
      return;
    }
    this.selectedRace.imgNames.splice(index, 1);
  }
}
