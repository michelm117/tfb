import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WebLayoutModule } from '@tfb/web/layout';
import { WebModulesModule } from '@tfb/web/modules';
import { WebSharedModule } from '@tfb/web/shared';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard, RefreshTokenInterceptor } from '@tfb/web/data';
import { CookieModule } from 'ngx-cookie';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,

    // own modules
    AppRoutingModule,
    WebLayoutModule,
    WebModulesModule,
    WebSharedModule,
    BrowserAnimationsModule,

    CookieModule.withOptions(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true,
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
