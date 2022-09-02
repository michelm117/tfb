import { Component } from '@angular/core';
import { RiderInterface } from '@tfb/api-interfaces';
import { RiderService } from '@tfb/web/data';

@Component({
  selector: 'tfb-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  riders: RiderInterface[] = [];

  constructor(private riderService: RiderService) {
    this.riderService.getRiders().subscribe((riders) => {
      this.riders = riders;
    });
  }

  sort(riders: RiderInterface[]) {
    return riders.sort((a, b) => (a?.surname > b?.surname ? 1 : -1));
  }
}
