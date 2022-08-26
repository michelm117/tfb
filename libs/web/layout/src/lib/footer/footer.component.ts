import { Component } from '@angular/core';
import {
  faInstagram,
  faStrava,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'tfb-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  faInstagram = faInstagram;
  faStrava = faStrava;
  faTwitter = faTwitter;

  year = new Date().getFullYear();

  scrollToTop() {
    (function smoothscroll() {
      const currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 550) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 20);
      }
    })();
  }
}
