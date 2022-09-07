import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RiderInterface } from '@tfb/api-interfaces';
import { FlagService } from '@tfb/web/data';
import { DialogComponent } from 'libs/web/shared/src/lib/dialog/dialog.component';

@Component({
  selector: 'tfb-delete-rider-panel',
  templateUrl: './delete-rider-panel.component.html',
  styleUrls: ['./delete-rider-panel.component.scss'],
})
export class DeleteRiderPanelComponent {
  @Input() riders: RiderInterface[] = [];
  selectedRidersId: RiderInterface[] = [];

  constructor(private flagService: FlagService, public dialog: MatDialog) {}

  getFlag(iso: string) {
    return this.flagService.get(iso);
  }

  getNameFromId(id: number): string {
    const results = this.riders.filter((rider) => rider.id === id);
    if (results.length > 0) {
      return results[0].name;
    }
    return '';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        titel: 'Are you sure?',
        text: 'Are you sure you want to delete?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
