import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { EventInterface } from '@tfb/api-interfaces';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';

@Component({
  selector: 'tfb-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent implements OnInit {
  @Input() event!: EventInterface;
  @Input() urlPrefix = 'stories';

  faTrophy = faTrophy;
  onPodium = false;
  storyId = -1;

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(this.event);

    if (!this.event) {
      return;
    }
    this.onPodium = this.event.podium;
    this.storyId = this.event.id;
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

  navigateToPage() {
    this.router.navigate([this.urlPrefix + '/' + this.storyId]);
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

  getFlag() {
    const flag = getUnicodeFlagIcon(this.event.country.iso);
    return flag;
  }
}
