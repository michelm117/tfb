import { Injectable, IterableDiffers } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  delay,
  EMPTY,
  map,
  Observable,
  of,
  Subscription,
} from 'rxjs';
import { Router } from '@angular/router';
import { UserExposedInterface } from '@tfb/api-interfaces';
import { TokenService } from './token.service';
import { UsersService } from './users.service';

const url = 'https://api.michel.lu/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<UserExposedInterface | null>;
  public user: Observable<UserExposedInterface | null>;
  private tokenSubscription = new Subscription();

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

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(
      url + '/register',
      {
        email,
        password,
        name,
      },
      httpOptions
    );
  }

  login(
    email: string,
    password: string
  ): Observable<number | HttpErrorResponse> {
    const statusCode = this.http
      .post(
        url + '/login',
        {
          email,
          password,
        },
        {
          observe: 'response',
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
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
      this.http.post(url + '/logout', httpOptions).subscribe();
    }
    this.userSubject.next(null);
    this.router.navigate(['login']);
    // if (this.router.url.includes('admin')) {
    //   this.router.navigate(['login']);
    // }
  }

  refresh(): Observable<any> {
    return this.http.get(url + 'refresh', httpOptions);
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
