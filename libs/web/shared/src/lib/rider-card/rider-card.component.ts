import { Component, Input } from '@angular/core';
import { Rider } from '@tfb/api-interfaces';

@Component({
  selector: 'tfb-rider-card',
  templateUrl: './rider-card.component.html',
  styleUrls: ['./rider-card.component.scss'],
})
export class RiderCardComponent {
  @Input() rider?: Rider;

  getFlagClass(langCode: string) {
    return 'flag-icon-' + langCode;
  }
}
