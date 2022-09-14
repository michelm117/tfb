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
  years: string[] = [];
  thumbnails: Record<string, string> = {};

  constructor(private raceService: RaceService) {}

  ngOnInit(): void {
    this.raceService.getYearsRacesMap().subscribe((map) => {
      this.races = map;
    });

    this.raceService.getYears().subscribe((years) => {
      this.years = years;
    });

    this.raceService.getRaces().subscribe((races) => {
      races.forEach((race) => {
        let imgUrl = 'assets/img/default/story.jpg';
        if (race.imgNames.length != 0) {
          imgUrl = this.raceService.getPicture(race.imgNames[0]);
        }
        this.thumbnails[race.id] = imgUrl;
      });
    });
  }
}
