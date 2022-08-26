import { Component } from '@angular/core';
import {
  faInstagram,
  faStrava,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'tfb-social-bar',
  templateUrl: './social-bar.component.html',
  styleUrls: ['./social-bar.component.scss'],
})
export class SocialBarComponent {
  faInstagram = faInstagram;
  faStrava = faStrava;
  faTwitter = faTwitter;
}
