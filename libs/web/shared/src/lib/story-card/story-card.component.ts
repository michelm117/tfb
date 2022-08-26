import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { Story } from '@tfb/api-interfaces';

@Component({
  selector: 'tfb-story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.scss'],
})
export class StoryCardComponent implements OnInit {
  @Input() story!: Story;

  faTrophy = faTrophy;
  onPodium = false;
  storyId = -1;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.story.podium == true) {
      this.onPodium = true;
    }

    this.storyId = this.story.id;
  }

  shortenText(text: string, maxLength: number) {
    //trim the string to the maximum length
    let trimmedString = text.substring(0, maxLength);
    //re-trim if we are in the middle of a word
    trimmedString = trimmedString.substring(
      0,
      Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
    );
    return trimmedString + ' ...';
  }

  navigateToStory() {
    this.router.navigate(['stories/' + this.storyId]);
    this.scrollToTop();
  }

  scrollToTop() {
    (function smoothscroll() {
      const currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 550) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 20);
      }
    })();
  }
}
