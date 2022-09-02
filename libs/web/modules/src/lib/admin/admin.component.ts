import { Component, OnInit } from '@angular/core';
import { CountryInterface } from '@tfb/api-interfaces';

@Component({
  selector: 'tfb-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  countries: CountryInterface[] = [];
  constructor() {}

  ngOnInit(): void {}
}
