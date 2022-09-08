import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CountryInterface, RiderInterface } from '@tfb/api-interfaces';
import { FlagService, RiderService } from '@tfb/web/data';
import { ImgDialogComponent } from '@tfb/web/shared';

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

  constructor(
    private flagService: FlagService,
    private riderService: RiderService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.riders.forEach((rider) => {
      this.editing.set(rider.id, false);
    });
  }

  getFlag(iso: string) {
    return this.flagService.get(iso);
  }

  profileImageClicked(id: number) {
    // check if row is in editing mode
    if (!this.editing.get(id)) {
      return;
    }

    this.openDialog(id);
  }

  getPicture(imgName: string) {
    return this.riderService.getProfilePicture(imgName);
  }

  private openDialog(id: number): void {
    const rider = this.getRiderFromId(id);

    const dialogRef = this.dialog.open(ImgDialogComponent, {
      width: '450px',
      data: {
        titel: 'Updating Profile Picture?',
        text: `Updating rider ${rider.name}'s profile picture.`,
        imgPath: this.getPicture(rider.imgName),
      },
    });

    const dialogSubmitSubscription =
      dialogRef.componentInstance.submitClicked.subscribe((result) => {
        dialogSubmitSubscription.unsubscribe();
      });
  }

  private getRiderFromId(id: number): RiderInterface {
    const rider = this.riders.filter((rider) => rider.id === id)[0];
    return rider;
  }
}
