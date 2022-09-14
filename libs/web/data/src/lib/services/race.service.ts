import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RaceInterface } from '@tfb/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RaceService {
  url = 'race';
  constructor(private http: HttpClient) {}

  getRace(id: number): Observable<RaceInterface> {
    return this.http.get<RaceInterface>(`${this.url}/${id}`, {
      responseType: 'json',
    });
  }

  getRaces(): Observable<RaceInterface[]> {
    return this.http.get<RaceInterface[]>(`${this.url}`, {
      responseType: 'json',
    });
  }

  getPicture(imageName: string) {
    return `${this.url}/image/${imageName}`;
  }

  getYearsRacesMap() {
    return this.http.get<Record<string, RaceInterface[]>>(`${this.url}/map`, {
      responseType: 'json',
    });
  }

  getYears() {
    return this.http.get<string[]>(`${this.url}/years`, {
      responseType: 'json',
    });
  }
}
