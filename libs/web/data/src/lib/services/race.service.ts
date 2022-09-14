import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RaceInterface } from '@tfb/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RaceService {
  url = 'myrace';
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

  createRace(race: Partial<RaceInterface>) {
    return this.http.post<RaceInterface>(this.url, race, {
      responseType: 'json',
    });
  }

  updateRace(id: number, race: Partial<RaceInterface>) {
    return this.http.patch<RaceInterface>(
      `${this.url}/${id}`,
      {
        title: race.title,
        place: race.place,
        country: race.country,
        imgNames: race.imgNames,
        date: race.date,
        text: race.text,
      },
      {
        responseType: 'json',
      }
    );
  }

  uploadImage(id: number, file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    return this.http.post<{ imagePath: string }>(
      `${this.url}/upload/${id}`,
      formData,
      options
    );
  }

  deleteRace(id: number) {
    return this.http.delete<any>(`${this.url}/${id}`, { responseType: 'json' });
  }
}
