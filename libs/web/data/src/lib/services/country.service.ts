import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountryInterface, RiderInterface } from '@tfb/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  url = 'https://api.michel.lu/country';
  constructor(private http: HttpClient) {}

  getCountryById(id: number): Observable<CountryInterface> {
    return this.http.get<CountryInterface>(`${this.url}/${id}`, {
      responseType: 'json',
    });
  }
  getCountryByIso(iso: string): Observable<CountryInterface> {
    return this.http.get<CountryInterface>(`${this.url}/${iso}`, {
      responseType: 'json',
    });
  }

  getCountries(): Observable<CountryInterface[]> {
    return this.http.get<CountryInterface[]>(`${this.url}`, {
      responseType: 'json',
    });
  }

  createCountry(name: string, iso: string) {
    return this.http.post<CountryInterface>(
      `${this.url}`,
      { name: name, iso: iso },
      {
        responseType: 'json',
      }
    );
  }

  updateCountry(id: number, name: string, iso: string) {
    return this.http.patch<CountryInterface>(
      `${this.url}/${id}`,
      { name: name, iso: iso },
      {
        responseType: 'json',
      }
    );
  }

  delete(id: number) {
    return this.http.delete<CountryInterface>(`${this.url}/${id}`, {
      responseType: 'json',
    });
  }
}
