import { Component, OnInit } from '@angular/core';
import { Event } from '@tfb/api-interfaces';
import { StoryService } from '@tfb/web/data';

@Component({
  selector: 'tfb-stories-overview',
  templateUrl: './stories-overview.component.html',
  styleUrls: ['./stories-overview.component.scss'],
})
export class StoriesOverviewComponent implements OnInit {
  urlPrefix = 'stories';
  stories = new Map<number, Event[]>();
  years: number[] = [];

  constructor(private storyService: StoryService) {}

  ngOnInit(): void {
    this.storyService.getYearStoryMap().subscribe((map) => {
      this.stories = map;
      this.years = Array.from(map.keys()).sort((a, b) => {
        return b - a;
      });
    });
  }

  getStoriesFromYear(year: number): Event[] {
    const stories = this.stories.get(year);
    if (stories) {
      return stories;
    }
    return [];
  }
}
