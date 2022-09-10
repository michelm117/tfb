import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { EventInterface } from '@tfb/api-interfaces';
import { FlagService } from '@tfb/web/data';

@Component({
  selector: 'tfb-event-content',
  templateUrl: './event-content.component.html',
  styleUrls: ['./event-content.component.scss'],
})
export class EventContentComponent implements OnInit {
  event!: EventInterface;
  faTrophy = faTrophy;
  onPodium = false;

  constructor(private flagService: FlagService) {}

  ngOnInit(): void {
    this.onPodium = this.event.podium;
  }

  getFlag() {
    return this.flagService.get(this.event.country.iso);
  }
}
