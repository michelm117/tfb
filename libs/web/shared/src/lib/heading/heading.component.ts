import { Component, Input } from '@angular/core';

@Component({
  selector: 'tfb-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss'],
})
export class HeadingComponent {
  @Input() titel = 'titel';
  @Input() showBar = true;
}
