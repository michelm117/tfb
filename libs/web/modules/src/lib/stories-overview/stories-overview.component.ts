import { Component, OnInit } from '@angular/core';
import { StoryInterface } from '@tfb/api-interfaces';
import { StoryService } from '@tfb/web/data';

@Component({
  selector: 'tfb-stories-overview',
  templateUrl: './stories-overview.component.html',
  styleUrls: ['./stories-overview.component.scss'],
})
export class StoriesOverviewComponent implements OnInit {
  urlPrefix = 'stories';
  stories: Record<string, StoryInterface[]> = {};
  years: string[] = [];
  thumbnails: Record<string, string> = {};

  constructor(private storyService: StoryService) {}

  ngOnInit(): void {
    this.storyService.getYearsStoriesMap().subscribe((map) => {
      this.stories = map;
    });
    this.storyService.getYears().subscribe((years) => {
      this.years = years;
    });
    this.storyService.getStories().subscribe((stories) => {
      stories.forEach((story) => {
        let imgUrl = 'assets/img/default/story.jpg';
        if (story.imgNames.length != 0) {
          imgUrl = this.storyService.getPicture(story.imgNames[0]);
        }
        this.thumbnails[story.id] = imgUrl;
      });
    });
  }
}
