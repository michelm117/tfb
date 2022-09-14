import { Component, OnInit } from '@angular/core';
import { RiderInterface } from '@tfb/api-interfaces';
import { AboutService, RiderService } from '@tfb/web/data';

@Component({
  selector: 'tfb-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  tmp = '';
  aboutText = '';
  aboutLoaded = false;
  ridersLoaded = false;

  riders: RiderInterface[] = [];

  constructor(
    private riderService: RiderService,
    private aboutService: AboutService
  ) {}

  ngOnInit(): void {
    this.riderService.getRiders().subscribe((riders) => {
      this.riders = riders;
      this.ridersLoaded = true;
    });
    this.aboutService.get().subscribe((aboutTextArray) => {
      if (aboutTextArray.length < 1) {
        return;
      }
      this.aboutText = aboutTextArray[0].text;
      this.aboutLoaded = true;
    });
  }

  sort(riders: RiderInterface[]) {
    return riders.sort((a, b) => (a?.surname > b?.surname ? 1 : -1));
  }
}
