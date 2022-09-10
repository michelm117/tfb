import { Component, OnInit } from '@angular/core';
import { EventInterface } from '@tfb/api-interfaces';
import { RaceService } from '@tfb/web/data';

@Component({
  selector: 'tfb-races-overview',
  templateUrl: './races-overview.component.html',
  styleUrls: ['./races-overview.component.scss'],
})
export class RacesOverviewComponent implements OnInit {
  races: Record<number, EventInterface[]> = {};
  urlPrefix = 'races';
  years: number[] = [];

  constructor(private raceService: RaceService) {}

  ngOnInit(): void {
    // this.raceService.getYearRaceMap().subscribe((map) => {
    //   this.races = map;
    //   this.years = Array.from(map.keys()).sort((a, b) => {
    //     return b - a;
    //   });
    // });
  }

  getStoriesFromYear(year: number): EventInterface[] {
    // const stories = this.races.get(year);
    // if (stories) {
    //   return stories;
    // }
    return [];
  }
}
