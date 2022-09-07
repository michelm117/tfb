import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RiderInterface } from '@tfb/api-interfaces';
import { FlagService } from '@tfb/web/data';
import { DialogComponent } from '@tfb/web/shared';

@Component({
  selector: 'tfb-delete-rider-panel',
  templateUrl: './delete-rider-panel.component.html',
  styleUrls: ['./delete-rider-panel.component.scss'],
})
export class DeleteRiderPanelComponent {
  @Input() riders: RiderInterface[] = [];
  selectedRidersId: number[] = [];

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

  openDialog(id: number): void {
    console.log(JSON.stringify(id));

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data: {
        titel: 'Deleting Rider?',
        text: `Are you sure you want to delete rider "${this.getNameFromId(
          id
        )}"?`,
      },
    });

    const dialogSubmitSubscription =
      dialogRef.componentInstance.submitClicked.subscribe((result) => {
        dialogSubmitSubscription.unsubscribe();
      });
  }
}
