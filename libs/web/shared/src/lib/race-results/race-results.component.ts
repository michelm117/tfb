import { Component, Input, OnInit } from '@angular/core';
import { RaceInterface, ResultInterface } from '@tfb/api-interfaces';
import { RaceService } from '@tfb/web/data';

@Component({
  selector: 'tfb-race-results',
  templateUrl: './race-results.component.html',
  styleUrls: ['./race-results.component.scss'],
})
export class RaceResultsComponent implements OnInit {
  @Input() results: ResultInterface[];

  displayedColumns: string[] = ['result', 'rider', 'acResult', 'ageCategory'];

  constructor(private raceService: RaceService) {}

  ngOnInit(): void {
    this.results.sort((a, b) => {
      return a.result - b.result;
    });
  }
}
