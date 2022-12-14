import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RiderInterface } from '@tfb/api-interfaces';
import { FlagService, RiderService } from '@tfb/web/data';
import { DialogComponent } from '@tfb/web/shared';

@Component({
  selector: 'tfb-delete-rider-panel',
  templateUrl: './delete-rider-panel.component.html',
  styleUrls: ['./delete-rider-panel.component.scss'],
})
export class DeleteRiderPanelComponent {
  @Output() refreshRiders = new EventEmitter<any>();

  @Input() riders: RiderInterface[] = [];
  selectedRidersId: number[] = [];

  constructor(
    private flagService: FlagService,
    public dialog: MatDialog,
    private riderService: RiderService
  ) {}

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
        this.riderService.deleteRider(id).subscribe(() => {
          this.refreshRiders.emit();
        });
        dialogSubmitSubscription.unsubscribe();
      });
  }
}
