import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WebModulesModule } from '@tfb/web/modules';
import { Router, RouterLink, RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, FontAwesomeModule, WebModulesModule, RouterModule],
  declarations: [FooterComponent, HeaderComponent],
  exports: [FooterComponent, HeaderComponent],
})
export class WebLayoutModule {}
