import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'tfb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  toggleTransparency = true;
  showOverlayMenu = false;

  toggleOverlayMenu() {
    this.showOverlayMenu = !this.showOverlayMenu;

    if (!this.showOverlayMenu) {
      // activate Transparency when scrolling back to banner
      const navbarHeight = 95;
      const bannerHeight = 500;
      const currentScrollHeight =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      if (currentScrollHeight > bannerHeight - navbarHeight) {
        this.toggleTransparency = false;
      } else {
        this.toggleTransparency = true;
      }

      if (this.showOverlayMenu) {
        this.toggleTransparency = false;
      }
    } else {
      // remove Transparency when overlayMenu is active.
      this.toggleTransparency = false;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbarHeight = 90;
    const bannerHeight = 500;
    const currentScrollHeight =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    if (currentScrollHeight > bannerHeight - navbarHeight) {
      this.toggleTransparency = false;
    } else {
      this.toggleTransparency = true;
    }

    if (this.showOverlayMenu) {
      this.toggleTransparency = false;
    }
  }

  scrollToTop() {
    (function smoothscroll() {
      const currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 500) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - currentScroll / 20);
      }
    })();
  }

  scrollToHeader() {
    window.scroll({ top: 500, behavior: 'smooth' });
  }

  toggleOverlayAndScrollUp() {
    this.toggleOverlayMenu();
    this.scrollToBanner();
  }

  scrollToBanner() {
    const currentScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 500) {
      this.scrollToTop();
    } else {
      this.scrollToHeader();
    }
  }
}
