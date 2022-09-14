import { Component, OnInit } from '@angular/core';
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
import { DialogComponent } from '@tfb/web/shared';
import { Observable, forkJoin } from 'rxjs';

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

  selectedRace: RaceInterface | undefined;
  races: RaceInterface[] = [];
  raceForm!: FormGroup;

  previews: string[] = [];
  selectedFiles?: FileList = undefined;
  selectedFileNames: string[] = [];

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
  }

  resultRowClicked(clickedResult: ResultInterface) {
    this.selectedResult = clickedResult;
  }

  getFlag(iso: string) {
    return this.flagService.get(iso);
  }

  getImage(imgName: string) {
    return this.raceService.getPicture(imgName);
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
        if (this.selectedFiles) {
          this.uploadImagesAndUpdateRace(race.id, race);
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

      if (this.selectedFiles) {
        // Upload selected images and update the race with the generated image names
        this.uploadImagesAndUpdateRace(id, race);
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
    this.raceService.deleteRace(id).subscribe((res) => {
      console.log(res);
      this.fetchRaces();
    });
  }

  uploadImagesAndUpdateRace(id: number, race: Partial<RaceInterface>) {
    if (this.selectedFiles) {
      // Create array of tasks. One task is to upload an image
      const tasks: Observable<{ imagePath: string }>[] = [];
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const file = this.selectedFiles.item(i);
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
        this.selectedRace?.imgNames.forEach((img, index) => {
          if (imageName === img) this.selectedRace?.imgNames.splice(index, 1);
        });
        dialogSubmitSubscription.unsubscribe();
      });
  }

  uploadImage(id: number, file: File) {
    return this.raceService.uploadImage(id, file);
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
      }
      this.races = races;
      this.resetSelection();
      this.showLoading = false;
    });
  }

  private updateLocalRace(id: number, race: RaceInterface) {
    console.log('updateLocalRace');

    const foundIndex = this.races.findIndex((x) => x.id == id);
    if (foundIndex >= 0) {
      this.races[foundIndex] = race;
    }

    this.selectedRace = race;

    // Reset selection
    this.selectedFileNames = [];
    this.selectedFiles = undefined;
    this.previews = [];

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
}
