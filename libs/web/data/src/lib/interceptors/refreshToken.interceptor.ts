import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {
  BehaviorSubject,
  filter,
  take,
  Observable,
  switchMap,
  throwError,
  catchError,
} from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  /**
   * we want to queue all HTTP requests in case of refreshing. This means that
   * if the server responds with 401 Error, we want to start refreshing, block
   * all requests that may happen during refreshing, and release them once
   * refreshing is done. To be able to block and release requests during the
   * refreshing, we will use BehaviorSubject as a semaphore.
   */
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    public authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('refresh') || req.url.includes('login')) {
      return next.handle(req);
    }

    if (!req.url.includes('admin')) {
      return next.handle(req);
    }

    const accessExpired = this.tokenService.isAccessTokenExpired();
    const refreshExpired = this.tokenService.isRefreshTokenExpired();

    if (accessExpired && refreshExpired) {
      this.authService.logout();
      return next.handle(req);
    } else if (accessExpired && !refreshExpired) {
      return this.refreshToken(req, next);
    } else if (!accessExpired && refreshExpired) {
      return next.handle(req);
    } else if (!accessExpired && !refreshExpired) {
      return next.handle(req);
    } else {
      this.router.navigate(['/']);
      return throwError(() => 'Invalid call');
    }
  }

  private refreshToken(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = this.tokenService.getRefreshToken();
      if (token) {
        return this.authService.refresh().pipe(
          switchMap(() => {
            this.isRefreshing = false;

            const token = this.tokenService.getRefreshToken();
            this.refreshTokenSubject.next(token);

            return next.handle(req);
          }),
          catchError((err) => {
            this.isRefreshing = false;

            return throwError(() => new Error(err));
          })
        );
      }
    }

    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      // continue stream after token is set
      take(1),
      switchMap(() => next.handle(req))
    );
  }
}
