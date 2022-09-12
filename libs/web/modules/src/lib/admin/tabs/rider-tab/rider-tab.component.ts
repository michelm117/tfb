import { Component, OnInit } from '@angular/core';
import { CountryInterface, RiderInterface } from '@tfb/api-interfaces';
import { CountryService, FlagService, RiderService } from '@tfb/web/data';

@Component({
  selector: 'tfb-rider-tab',
  templateUrl: './rider-tab.component.html',
  styleUrls: ['./rider-tab.component.scss'],
})
export class RiderTabComponent implements OnInit {
  countries: CountryInterface[] = [];
  riders: RiderInterface[] = [];

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

  refreshRiders($event: any) {
    console.log('Refreshing riders');

    this.riderService.getRiders().subscribe((riders) => {
      this.riders = riders;
    });
  }
}
