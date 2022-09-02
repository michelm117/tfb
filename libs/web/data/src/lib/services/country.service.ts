import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountryInterface, RiderInterface } from '@tfb/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  url = 'country';
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
}
