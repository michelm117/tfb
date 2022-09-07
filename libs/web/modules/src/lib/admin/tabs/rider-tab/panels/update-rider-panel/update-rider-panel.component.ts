import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CountryInterface, RiderInterface } from '@tfb/api-interfaces';
import { FlagService } from '@tfb/web/data';

@Component({
  selector: 'tfb-update-rider-panel',
  templateUrl: './update-rider-panel.component.html',
  styleUrls: ['./update-rider-panel.component.scss'],
})
export default class UpdateRiderPanelComponent implements OnInit {
  @Input() riders: RiderInterface[] = [];
  @Input() countries: CountryInterface[] = [];

  displayedColumns: string[] = [
    'id',
    'name',
    'surname',
    'flag',
    'profileImage',
    'isEdit',
  ];

  editing: Map<number, boolean> = new Map<number, boolean>();

  constructor(private flagService: FlagService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.riders.forEach((rider) => {
      this.editing.set(rider.id, false);
    });
  }

  getFlag(iso: string) {
    return this.flagService.get(iso);
  }
}
