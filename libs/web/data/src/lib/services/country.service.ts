import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountryInterface, RiderInterface } from '@tfb/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  url = 'https://api.michel.lu/country';
  httpOptions = {
    headers: new HttpHeaders({
      // 'Authorization': fooBarToken,
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
  };

  constructor(private http: HttpClient) {}

  getCountryById(id: number): Observable<CountryInterface> {
    return this.http.get<CountryInterface>(
      `${this.url}/${id}`,
      this.httpOptions
    );
  }
  getCountryByIso(iso: string): Observable<CountryInterface> {
    return this.http.get<CountryInterface>(
      `${this.url}/${iso}`,
      this.httpOptions
    );
  }

  getCountries(): Observable<CountryInterface[]> {
    return this.http.get<CountryInterface[]>(`${this.url}`, this.httpOptions);
  }

  createCountry(name: string, iso: string) {
    return this.http.post<CountryInterface>(
      `${this.url}`,
      { name: name, iso: iso },
      this.httpOptions
    );
  }

  updateCountry(id: number, name: string, iso: string) {
    return this.http.patch<CountryInterface>(
      `${this.url}/${id}`,
      { name: name, iso: iso },
      this.httpOptions
    );
  }

  delete(id: number) {
    return this.http.delete<CountryInterface>(
      `${this.url}/${id}`,
      this.httpOptions
    );
  }
}
