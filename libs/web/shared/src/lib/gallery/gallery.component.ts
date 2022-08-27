import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tfb-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  @Input() imgUrls: string[] = [];

  imgUrl =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png';
  imgIndex = 0;

  ngOnInit(): void {
    this.imgUrl = this.imgUrls[this.imgIndex];
  }

  nextImage() {
    this.imgIndex = (this.imgIndex + 1) % this.imgUrls.length;
    this.imgUrl = this.imgUrls[this.imgIndex];
  }

  previousImage() {
    this.imgIndex =
      (this.imgUrls.length + ((this.imgIndex - 1) % this.imgUrls.length)) %
      this.imgUrls.length;
    this.imgUrl = this.imgUrls[this.imgIndex];
  }
}
