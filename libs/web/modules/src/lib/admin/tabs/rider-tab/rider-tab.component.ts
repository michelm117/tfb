import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CountryInterface, RiderInterface } from '@tfb/api-interfaces';
import { CountryService, FlagService, RiderService } from '@tfb/web/data';
import { FormControl, Validators } from '@angular/forms';
import { MaxSizeValidator } from '@angular-material-components/file-input';

@Component({
  selector: 'tfb-rider-tab',
  templateUrl: './rider-tab.component.html',
  styleUrls: ['./rider-tab.component.scss'],
})
export class RiderTabComponent implements OnInit {
  countries: CountryInterface[] = [];
  riders: RiderInterface[] = [];
  selectedCountry = 2;

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  previews: string[] = [];

  constructor(
    private countryService: CountryService,
    private riderService: RiderService,
    private flagService: FlagService
  ) {}

  ngOnInit(): void {
    this.countryService.getCountries().subscribe((countries) => {
      this.countries = countries;
    });
    this.riderService.getRiders().subscribe((riders) => {
      this.riders = riders;
    });
  }

  getFlag(iso: string) {
    return this.flagService.get(iso);
  }

  selectFiles(event: any): void {
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }

  upload(idx: number, file: File): void {}

  uploadFiles(): void {}
}
