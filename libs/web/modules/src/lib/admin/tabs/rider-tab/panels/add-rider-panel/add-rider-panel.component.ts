import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CountryInterface, RiderInterface } from '@tfb/api-interfaces';
import { FlagService, RiderService } from '@tfb/web/data';

@Component({
  selector: 'tfb-add-rider-panel',
  templateUrl: './add-rider-panel.component.html',
  styleUrls: ['./add-rider-panel.component.scss'],
})
export class AddRiderPanelComponent {
  @Output() refreshRiders = new EventEmitter<any>();

  @Input() countries: CountryInterface[] = [];
  selectedCountry = 2;

  selectedFiles?: FileList;
  selectedFileName = '';
  previews: string[] = [];

  riderForm = this.formBuilder.group({
    name: '',
    surname: '',
    country: 2,
  });

  constructor(
    private riderService: RiderService,
    private flagService: FlagService,
    private formBuilder: FormBuilder
  ) {}

  getFlag(iso: string) {
    return this.flagService.get(iso);
  }

  selectFiles(event: any): void {
    this.selectedFileName = '';
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.previews.push(e.target.result);
      };

      reader.readAsDataURL(this.selectedFiles[0]);

      this.selectedFileName = this.selectedFiles[0].name;
    }
  }

  onSubmit() {
    const name = this.riderForm.get('name')?.value;
    const surname = this.riderForm.get('surname')?.value;
    const country = this.riderForm.get('country')?.value;
    if (!name || !surname || !country) {
      return;
    }

    this.riderService.addRider(name, surname, country).subscribe((rider) => {
      if (this.selectedFiles && this.selectedFiles[0]) {
        this.riderService
          .uploadImage(rider.id, this.selectedFiles[0])
          .subscribe();
      }

      this.refreshRiders.emit();
    });
  }
}
