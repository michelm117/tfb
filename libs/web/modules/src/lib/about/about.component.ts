import { Component } from '@angular/core';
import { Rider } from '@tfb/api-interfaces';

@Component({
  selector: 'tfb-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  riders: Rider[] = [];

  constructor() {
    this.riders = [
      {
        id: 1,
        name: 'Marc',
        surname: 'Michel',
        country: 'Luxembourg',
        langCode: 'lu',
        imgUrl:
          'https://www.alpecin-fenix.com/images/team/laurens-de-vreese.jpg',
      },
      {
        id: 2,
        name: 'Claas',
        surname: 'Bollen',
        country: 'Germany',
        langCode: 'de',
        imgUrl:
          'https://www.alpecin-fenix.com/images/team/gianni-vermeersch.jpg',
      },
      {
        id: 3,
        name: 'Juliano',
        surname: 'Almeida Bonfim',
        country: 'Brasil',
        langCode: 'br',
        imgUrl:
          'https://www.alpecin-fenix.com/images/team/david-van-der-poel.jpg',
      },
      {
        id: 4,
        name: 'Patrick',
        surname: 'Altefrohne',
        country: 'Germany',
        langCode: 'de',
        imgUrl:
          'https://www.alpecin-fenix.com/images/team/edward-planckaert.jpg',
      },
      {
        id: 5,
        name: 'Christian',
        surname: 'Hackenberg',
        country: 'Germany',
        langCode: 'de',
        imgUrl:
          'https://www.alpecin-fenix.com/images/team/jasper-philipsen.jpg',
      },
      {
        id: 6,
        name: 'Bastian',
        surname: 'Hettich',
        country: 'Germany',
        langCode: 'de',
        imgUrl: 'https://www.alpecin-fenix.com/images/team/roy-jans.jpg',
      },
      {
        id: 7,
        name: 'Carolyn',
        surname: 'Schaltegger',
        country: 'Switzerland',
        langCode: 'ch',
        imgUrl:
          'https://www.alpecin-fenix.com/images/team/puck-pieterse-mb.jpg',
      },
      {
        id: 8,
        name: 'Sebastian',
        surname: 'Schmitt',
        country: 'Germany',
        langCode: 'de',
        imgUrl: 'https://www.alpecin-fenix.com/images/team/silvan-dillier.jpg',
      },
    ];
  }

  sort(riders: Rider[]) {
    return riders.sort((a, b) => (a?.surname > b?.surname ? 1 : -1));
  }
}
