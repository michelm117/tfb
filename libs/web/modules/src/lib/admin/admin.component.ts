import { Component, OnInit } from '@angular/core';
import { CountryInterface } from '@tfb/api-interfaces';
import { CountryService, FlagService } from '@tfb/web/data';

@Component({
  selector: 'tfb-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  countries: CountryInterface[] = [];
  constructor(
    private countryService: CountryService,
    private flagService: FlagService
  ) {}

  ngOnInit(): void {
    this.countryService.getCountries().subscribe((countries) => {
      this.countries = countries;
      console.log(countries);
    });
  }

  getFlag(iso: string) {
    return this.flagService.get(iso);
  }
}
