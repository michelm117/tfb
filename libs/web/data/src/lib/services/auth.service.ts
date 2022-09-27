import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  delay,
  map,
  Observable,
  of,
  Subscription,
} from 'rxjs';
import { Router } from '@angular/router';
import { UserExposedInterface } from '@tfb/api-interfaces';
import { TokenService } from './token.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<UserExposedInterface | null>;
  public user: Observable<UserExposedInterface | null>;
  private tokenSubscription = new Subscription();

  url = 'https://api.michel.lu/auth';
  httpOptions = {
    headers: new HttpHeaders({
      // 'Authorization': fooBarToken,
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenService: TokenService,
    private userService: UsersService
  ) {
    this.userSubject = new BehaviorSubject<UserExposedInterface | null>(null);
    this.user = this.userSubject.asObservable();

    this.setLogoutTimer();
  }

  register(
    name: string,
    email: string,
    password: string,
    key: string
  ): Observable<any> {
    return this.http.post(
      this.url + '/register',
      {
        email,
        password,
        name,
        key,
      },
      this.httpOptions
    );
  }

  login(
    email: string,
    password: string
  ): Observable<number | HttpErrorResponse> {
    const statusCode = this.http
      .post(
        this.url + '/login',
        {
          email,
          password,
        },
        {
          observe: 'response',
          ...this.httpOptions,
        }
      )
      .pipe(
        map((res) => {
          if (res.ok) {
            this.setLogoutTimer();
            const user = <UserExposedInterface>res.body;
            this.userSubject.next(user);
          }
          return res.status;
        }),
        catchError((err) => of('error', err))
      );

    return statusCode;
  }

  logout(): void {
    if (this.tokenService.hasAccessToken()) {
      this.http.post(this.url + '/logout', this.httpOptions).subscribe();
    }
    this.userSubject.next(null);
    this.router.navigate(['login']);
    // if (this.router.url.includes('admin')) {
    //   this.router.navigate(['login']);
    // }
  }

  refresh(): Observable<any> {
    return this.http.get(this.url + 'refresh', this.httpOptions);
  }

  expirationCounter(timeout: number) {
    this.tokenSubscription.unsubscribe();
    this.tokenSubscription = of(null)
      .pipe(delay(timeout))
      .subscribe(() => {
        console.error('Refresh Token Expired');
        this.logout();
      });
  }

  setLogoutTimer() {
    if (!this.tokenService.hasRefreshToken()) {
      return;
    }
    const exp = this.tokenService.getRefreshTokenExpirationDate();
    if (!exp) {
      throw Error('Expiration date not found');
    }

    const timeoutInMilliseconds = exp.getTime() - new Date().getTime();
    this.expirationCounter(timeoutInMilliseconds);
  }
}
