import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { Story } from '@tfb/api-interfaces';
import { StoryService } from '@tfb/web/data';

@Component({
  selector: 'tfb-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {
  story!: Story;
  faTrophy = faTrophy;

  onPodium = false;

  constructor(
    private route: ActivatedRoute,
    private storyService: StoryService
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
}
