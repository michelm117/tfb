import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { RaceInterface } from '@tfb/api-interfaces';
import { FlagService, RaceService } from '@tfb/web/data';

@Component({
  selector: 'tfb-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss'],
})
export class RaceComponent implements OnInit {
  race!: RaceInterface;
  faTrophy = faTrophy;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private raceService: RaceService,
    private flagService: FlagService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      const id = params['id'];

      if (!id) {
        this.router.navigate(['404']);
        return;
      }

      this.raceService.getRace(id).subscribe((value) => {
        if (!value.id) {
          const res = <any>value;
          if (res['status'] === 404) {
            this.router.navigate(['404']);
          }
          return;
        } else {
          this.race = value;
        }
      });
    });
  }

  getFlag() {
    return this.flagService.get(this.race?.country.iso);
  }

  getDate() {
    if (!this.race) {
      return '';
    }
    const d = new Date(this.race.date);
    return `${d.getUTCDate()}.${d.getMonth()}.${d.getFullYear()}`;
  }

  getImageUrls() {
    const urls: string[] = [];
    for (const imgName of this.race.imgNames) {
      const url = this.raceService.getPicture(imgName);
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
