import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { StoryInterface } from '@tfb/api-interfaces';
import { FlagService, StoryService } from '@tfb/web/data';
import { map, pipe } from 'rxjs';

@Component({
  selector: 'tfb-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {
  story!: StoryInterface;
  faTrophy = faTrophy;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storyService: StoryService,
    private flagService: FlagService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      const id = params['id'];

      if (!id) {
        return;
      }

      this.storyService.getStory(id).subscribe((value) => {
        if (!value.id) {
          const res = <any>value;
          if (res['status'] === 404) {
            this.router.navigate(['404']);
          }
          return;
        } else {
          this.story = value;
        }
      });
    });
  }

  getFlag() {
    return this.flagService.get(this.story?.country.iso);
  }

  getDate() {
    if (!this.story) {
      return '';
    }
    const d = new Date(this.story.date);
    return `${d.getUTCDate()}.${d.getMonth()}.${d.getFullYear()}`;
  }

  getImageUrls() {
    const urls: string[] = [];
    for (const imgName of this.story.imgNames) {
      const url = this.storyService.getPicture(imgName);
      urls.push(url);
    }
    return urls;
  }

  navigateToPage(url: string) {
    this.router.navigate([url]);
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
