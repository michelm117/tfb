import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { Event } from '@tfb/api-interfaces';
import { FlagService, StoryService } from '@tfb/web/data';

@Component({
  selector: 'tfb-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {
  story!: Event;
  faTrophy = faTrophy;

  onPodium = false;

  constructor(
    private route: ActivatedRoute,
    private storyService: StoryService,
    private flagService: FlagService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      const id = params['id'];
      if (!id) {
        return;
      }

      this.storyService.getStoriesById(id).subscribe((story) => {
        this.story = story;
        this.onPodium = story.podium;
      });
    });
  }

  getFlag() {
    return this.flagService.get(this.story.countryCode);
  }
}
