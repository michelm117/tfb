import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import jwt_decode from 'jwt-decode';

export interface Payload {
  exp: number;
  iat: number;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private cookieService: CookieService) {}

  hasAccessToken(): boolean {
    return this.cookieService.hasKey('Authentication');
  }

  hasRefreshToken(): boolean {
    return this.cookieService.hasKey('Refresh');
  }

  getAccessToken(): string {
    const token = this.cookieService.get('Authentication');
    if (!token) {
      return '';
    }
    return token;
  }

  getRefreshToken(): string {
    const token = this.cookieService.get('Refresh');
    if (!token) {
      return '';
    }
    return token;
  }

  isAccessTokenExpired() {
    console.log('Cookies', this.cookieService.getAll());
    console.log('document', document.cookie);

    const token = this.getAccessToken();
    return this.isTokenExpired(token);
  }

  isRefreshTokenExpired() {
    const token = this.getRefreshToken();
    return this.isTokenExpired(token);
  }

  getAccessTokenExpirationDate() {
    const token = this.getAccessToken();
    const expDate = this.getTokenExpirationDate(token);
    return expDate;
  }

  getRefreshTokenExpirationDate() {
    const token = this.getRefreshToken();
    const expDate = this.getTokenExpirationDate(token);
    return expDate;
  }

  private isTokenExpired(token: string): boolean {
    if (!token) {
      return true;
    }

    const expDate = this.getTokenExpirationDate(token);
    if (!expDate) {
      return true;
    }
    const dateNow = new Date();

    return !(expDate?.valueOf() > dateNow.valueOf());
  }

  private getTokenExpirationDate(token: string): Date | null {
    if (!token) {
      return null;
    }
    const payload: Payload = jwt_decode(token);

    const exp = payload.exp;
    if (!exp || typeof payload.exp !== 'number') {
      return null;
    }

    const expDate = new Date(0);
    expDate.setUTCSeconds(payload.exp);
    return expDate;
  }
}
