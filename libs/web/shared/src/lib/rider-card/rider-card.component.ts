import { Component, Input } from '@angular/core';
import { RiderInterface } from '@tfb/api-interfaces';
import { FlagService } from '@tfb/web/data';

@Component({
  selector: 'tfb-rider-card',
  templateUrl: './rider-card.component.html',
  styleUrls: ['./rider-card.component.scss'],
})
export class RiderCardComponent {
  @Input() rider!: RiderInterface;

  constructor(private flagService: FlagService) {}

  getFlag() {
    return this.flagService.get(this.rider.country.iso);
  }
}
