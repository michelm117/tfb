import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AboutInterface } from '@tfb/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  url = 'abouttext';
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<AboutInterface[]>(this.url);
  }

  count() {
    return this.http.get<number>(`${this.url}/count`);
  }

  create(text: string) {
    return this.http.post<number>(`${this.url}/count`, text);
  }

  update(text: string) {
    return this.http.patch<number>(`${this.url}/count`, text);
  }
}
