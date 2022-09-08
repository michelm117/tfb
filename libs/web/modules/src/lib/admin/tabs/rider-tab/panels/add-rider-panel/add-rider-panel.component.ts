import { Component, Input } from '@angular/core';
import { CountryInterface } from '@tfb/api-interfaces';
import { FlagService } from '@tfb/web/data';

@Component({
  selector: 'tfb-add-rider-panel',
  templateUrl: './add-rider-panel.component.html',
  styleUrls: ['./add-rider-panel.component.scss'],
})
export class AddRiderPanelComponent {
  @Input() countries: CountryInterface[] = [];
  selectedCountry = 2;

  selectedFiles?: FileList;
  selectedFileName = '';
  previews: string[] = [];

  constructor(private flagService: FlagService) {}

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
}
