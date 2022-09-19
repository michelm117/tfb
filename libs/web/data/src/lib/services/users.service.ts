import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserExposedInterface } from '@tfb/api-interfaces';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

const USERS_API = '/users';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getOwnUser() {
    return this.http.get<UserExposedInterface>(
      USERS_API + 'profile',
      httpOptions
    );
  }

  getUserById(id: number) {
    return this.http.get<UserExposedInterface>(
      USERS_API + `profile/${id}`,
      httpOptions
    );
  }
}
