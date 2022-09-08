import { Component, Input } from '@angular/core';

@Component({
  selector: 'tfb-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss'],
})
export class SkeletonLoaderComponent {
  @Input() Cwidth: any;
  @Input() Cheight: any;
  @Input() circle = false;

  getMyStyles() {
    const myStyles = {
      'width.px': this.Cwidth ? this.Cwidth : '',
      'height.px': this.Cheight ? this.Cheight : '',
      'border-radius': this.circle ? '50%' : '',
    };
    return myStyles;
  }
}
