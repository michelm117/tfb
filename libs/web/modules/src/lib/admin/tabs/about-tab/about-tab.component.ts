import { Component, OnInit } from '@angular/core';
import { AboutService } from '@tfb/web/data';

@Component({
  selector: 'tfb-about-tab',
  templateUrl: './about-tab.component.html',
  styleUrls: ['./about-tab.component.scss'],
})
export class AboutTabComponent implements OnInit {
  count = 0;
  aboutText = '';
  constructor(private aboutService: AboutService) {}

  ngOnInit(): void {
    this.aboutService.count().subscribe((count) => {
      this.count = count;
      if (count < 1) {
        return;
      }
      this.aboutService.get().subscribe((texts) => {
        this.aboutText = texts[0].text;
        console.log(this.aboutText);
      });
    });
  }

  submit(text: string) {
    if (this.count === 0) {
      this.aboutService.create(text).subscribe((texts) => {
        this.aboutText = texts[0].text;
      });
    } else {
      this.aboutService.update(text).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
