import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  private redirectToLoginPage(): false {
    this.authService.logout();
    return false;
  }

  canActivate() {
    const accessExpired = this.tokenService.isAccessTokenExpired();
    const refreshExpired = this.tokenService.isRefreshTokenExpired();
    console.log(
      'accessExpired:',
      accessExpired,
      'refreshExpired:',
      refreshExpired
    );

    if (accessExpired && refreshExpired) {
      this.router.navigate(['login']);
      return false;
    } else if (accessExpired && !refreshExpired) {
      return this.authService.refresh().pipe(
        map((res) => {
          if (res === 200) {
            const newAccessExpired = this.tokenService.isAccessTokenExpired();
            if (newAccessExpired) {
              return this.redirectToLoginPage();
            }
            return true;
          }
          return this.redirectToLoginPage();
        })
      );
    } else if (!accessExpired && refreshExpired) {
      return true;
    } else if (!accessExpired && !refreshExpired) {
      return true;
    }
    return this.redirectToLoginPage();
  }
}
