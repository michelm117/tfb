import { Component, Input } from '@angular/core';
import { EventInterface } from '@tfb/api-interfaces';

@Component({
  selector: 'tfb-event-overview',
  templateUrl: './event-overview.component.html',
  styleUrls: ['./event-overview.component.scss'],
})
export class EventOverviewComponent {
  @Input() title = 'title';
  @Input() urlPrefix = 'stories';
  @Input() events: Record<string, EventInterface[]> = {};
  @Input() years: string[] = [];

  getEventsFromYear(year: string): EventInterface[] {
    const stories = this.events[year];
    if (stories) {
      return stories;
    }
    return [];
  }
}
