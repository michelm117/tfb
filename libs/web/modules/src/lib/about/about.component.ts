import { Component } from '@angular/core';
import { RiderInterface } from '@tfb/api-interfaces';

@Component({
  selector: 'tfb-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  riders: RiderInterface[] = [];

  constructor() {
    this.riders = [
      {
        id: 1,
        name: 'Marc',
        surname: 'Michel',
        country: { id: 0, name: 'Luxembourg', iso: 'lux' },
        imgUrl:
          'https://www.alpecin-deceuninck.com/images/team/no-image-2022.jpg',
      },
      {
        id: 2,
        name: 'Claas',
        surname: 'Bollen',
        country: { id: 0, name: 'Luxembourg', iso: 'lux' },
        imgUrl:
          'https://www.alpecin-deceuninck.com/images/team/no-image-2022.jpg',
      },
      {
        id: 3,
        name: 'Juliano',
        surname: 'Almeida Bonfim',
        country: { id: 0, name: 'Luxembourg', iso: 'lux' },
        imgUrl:
          'https://www.alpecin-deceuninck.com/images/team/no-image-2022.jpg',
      },
      {
        id: 4,
        name: 'Patrick',
        surname: 'Altefrohne',
        country: { id: 0, name: 'Luxembourg', iso: 'lux' },
        imgUrl:
          'https://www.alpecin-deceuninck.com/images/team/no-image-2022.jpg',
      },
      {
        id: 5,
        name: 'Christian',
        surname: 'Hackenberg',
        country: { id: 0, name: 'Luxembourg', iso: 'lux' },
        imgUrl:
          'https://www.alpecin-deceuninck.com/images/team/no-image-2022.jpg',
      },
      {
        id: 6,
        name: 'Bastian',
        surname: 'Hettich',
        country: { id: 0, name: 'Luxembourg', iso: 'lux' },
        imgUrl:
          'https://www.alpecin-deceuninck.com/images/team/no-image-2022.jpg',
      },
      {
        id: 7,
        name: 'Carolyn',
        surname: 'Schaltegger',
        country: { id: 0, name: 'Luxembourg', iso: 'lux' },
        imgUrl:
          'https://www.alpecin-deceuninck.com/images/team/no-image-2022.jpg',
      },
      {
        id: 8,
        name: 'Sebastian',
        surname: 'Schmitt',
        country: { id: 0, name: 'Luxembourg', iso: 'lux' },
        imgUrl:
          'https://www.alpecin-deceuninck.com/images/team/no-image-2022.jpg',
      },
    ];
  }

  sort(riders: RiderInterface[]) {
    return riders.sort((a, b) => (a?.surname > b?.surname ? 1 : -1));
  }
}
