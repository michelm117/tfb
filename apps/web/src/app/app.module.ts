import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WebLayoutModule } from '@tfb/web/layout';
import { WebModulesModule } from '@tfb/web/modules';
import { WebSharedModule } from '@tfb/web/shared';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,

    // own modules
    WebLayoutModule,
    WebModulesModule,
    WebSharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
