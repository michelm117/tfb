import { Component, Input, OnInit } from '@angular/core';
import { RiderInterface } from '@tfb/api-interfaces';
import { FlagService, RiderService } from '@tfb/web/data';

@Component({
  selector: 'tfb-rider-card',
  templateUrl: './rider-card.component.html',
  styleUrls: ['./rider-card.component.scss'],
})
export class RiderCardComponent implements OnInit {
  @Input() rider!: RiderInterface;

  constructor(
    private flagService: FlagService,
    private riderService: RiderService
  ) {}

  ngOnInit(): void {
    this.getPicture();
  }

  getFlag() {
    return this.flagService.get(this.rider.country.iso);
  }

  getPicture() {
    return this.riderService.getProfilePicture(this.rider.imgName);
  }

  changeSource(event: any) {
    event.target.src = 'assets/img/default/profile.jpg';
  }
}
