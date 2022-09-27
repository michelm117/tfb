import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserExposedInterface } from '@tfb/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url = 'https://api.michel.lu/users/';
  httpOptions = {
    headers: new HttpHeaders({
      // 'Authorization': fooBarToken,
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
  };

  constructor(private http: HttpClient) {}

  getOwnUser() {
    return this.http.get<UserExposedInterface>(
      this.url + 'profile',
      this.httpOptions
    );
  }

  getUserById(id: number) {
    return this.http.get<UserExposedInterface>(
      this.url + `profile/${id}`,
      this.httpOptions
    );
  }
}
