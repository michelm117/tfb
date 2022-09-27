import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AboutInterface } from '@tfb/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  url = 'https://api.michel.lu/abouttext';
  httpOptions = {
    headers: new HttpHeaders({
      // 'Authorization': fooBarToken,
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
  };

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<AboutInterface[]>(this.url, this.httpOptions);
  }

  count() {
    return this.http.get<number>(`${this.url}/count`, this.httpOptions);
  }

  create(text: string) {
    return this.http.post<AboutInterface[]>(
      this.url,
      { text: text },
      this.httpOptions
    );
  }

  update(text: string) {
    return this.http.patch<any>(this.url, { text: text }, this.httpOptions);
  }
}
