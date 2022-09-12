import { Component, OnInit, Input } from '@angular/core';
import { CountryInterface } from '@tfb/api-interfaces';
import { CountryService, FlagService } from '@tfb/web/data';
import { max } from 'rxjs';

@Component({
  selector: 'tfb-country-tab',
  templateUrl: './country-tab.component.html',
  styleUrls: ['./country-tab.component.scss'],
})
export class CountryTabComponent implements OnInit {
  displayedColumns: string[] = ['id', 'flag', 'name', 'iso', 'edit', 'delete'];
  editing: Map<number, boolean> = new Map<number, boolean>();

  countries: CountryInterface[] = [];

  constructor(
    private countryService: CountryService,
    private flagService: FlagService
  ) {}

  ngOnInit(): void {
    this.fetchCountries();
  }

  private fetchCountries() {
    this.countryService.getCountries().subscribe((countries) => {
      this.countries = countries.sort((a, b) => {
        return a.id - b.id;
      });
      let maxId = -1;
      countries.forEach((country) => {
        if (maxId <= country.id) {
          maxId = country.id + 1;
        }
      });
      this.countries.push({ id: maxId, iso: '', name: '' });
      this.countries.forEach((country) => {
        this.editing.set(country.id, false);
      });
    });
  }

  getFlag(iso: string) {
    return this.flagService.get(iso);
  }

  updatedClicked(country: CountryInterface) {
    this.editing.set(country.id, false);

    this.countryService
      .updateCountry(country.id, country.name, country.iso)
      .subscribe(() => {
        this.fetchCountries();
      });
  }

  delete(id: number) {
    this.countryService.delete(id).subscribe(() => {
      this.fetchCountries();
    });
  }

  add(id: number) {
    const countries = this.countries.filter((country) => country.id === id);
    if (countries.length !== 1) {
      return;
    }
    const country = countries[0];
    this.countryService
      .createCountry(country.name, country.iso)
      .subscribe((res) => {
        this.fetchCountries();
      });
  }
}
