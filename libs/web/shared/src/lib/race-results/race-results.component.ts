import { Component, Input, OnInit } from '@angular/core';
import { Race } from '@tfb/api-interfaces';
import { RaceService } from '@tfb/web/data';

@Component({
  selector: 'tfb-race-results',
  templateUrl: './race-results.component.html',
  styleUrls: ['./race-results.component.scss'],
})
export class RaceResultsComponent {
  @Input() raceId!: number;
  races: Race[] = [];

  constructor(private raceService: RaceService) {}

  // ngOnInit(): void {
  //   // this.raceService.getRaceById(this.raceId).subscribe((race) => {
  //   //   this.races = [race];
  //   //   console.log(this.races);
  //   // });
  // }
}
