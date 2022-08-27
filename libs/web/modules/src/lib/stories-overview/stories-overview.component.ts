import { Component, OnInit } from '@angular/core';
import { Story } from '@tfb/api-interfaces';
import { StoryService } from '@tfb/web/data';

@Component({
  selector: 'tfb-stories-overview',
  templateUrl: './stories-overview.component.html',
  styleUrls: ['./stories-overview.component.scss'],
})
export class StoriesOverviewComponent implements OnInit {
  stories: Story[] = [];

  constructor(private storyService: StoryService) {}

  ngOnInit(): void {
    this.storyService.getStories().subscribe((stories) => {
      const sortedStories = this.storyService.sortByDate(stories);
      this.stories = sortedStories;
    });
  }
}
