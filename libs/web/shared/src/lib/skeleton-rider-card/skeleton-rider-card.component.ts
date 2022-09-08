import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tfb-skeleton-rider-card',
  templateUrl: './skeleton-rider-card.component.html',
  styleUrls: ['./skeleton-rider-card.component.scss'],
})
export class SkeletonRiderCardComponent {
  @Input() show = true;
}
