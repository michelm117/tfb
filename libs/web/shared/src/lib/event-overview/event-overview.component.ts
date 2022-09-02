import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Event } from '@tfb/api-interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'tfb-event-overview',
  templateUrl: './event-overview.component.html',
  styleUrls: ['./event-overview.component.scss'],
})
export class EventOverviewComponent implements OnInit {
  @Input() title = 'title';
  @Input() urlPrefix = 'stories';
  @Input() events = new Map<number, Event[]>();

  years: number[] = [];

  ngOnInit(): void {
    this.years = Array.from(this.events.keys());
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   this.events = changes['events'].currentValue;
  // }

  getEventFromYear(year: number): Event[] {
    const stories = this.events.get(year);
    if (stories) {
      return stories;
    }
    return [];
  }
}
