import { Component, Input, OnInit } from '@angular/core';
import { RiderInterface } from '@tfb/api-interfaces';
import { FlagService } from '@tfb/web/data';

@Component({
  selector: 'tfb-delete-rider-panel',
  templateUrl: './delete-rider-panel.component.html',
  styleUrls: ['./delete-rider-panel.component.scss'],
})
export class DeleteRiderPanelComponent {
  @Input() riders: RiderInterface[] = [];

  constructor(private flagService: FlagService) {}

  getFlag(iso: string) {
    return this.flagService.get(iso);
  }
}
