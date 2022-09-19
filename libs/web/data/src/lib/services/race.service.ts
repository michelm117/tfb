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
    const url = `${this.url}/image/${imageName}`;
    return url;
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
    console.log('RACE', race);

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

  addResult(
    id: number,
    riderId: number,
    result: number,
    ageCategoryId: number,
    acResult: number
  ) {
    return this.http.patch<RaceInterface>(
      `${this.url}/add-result/${id}`,
      {
        riderId: riderId,
        result: result,
        ageCategoryId: ageCategoryId,
        acResult: acResult,
        raceId: id,
      },
      {
        responseType: 'json',
      }
    );
  }

  deleteResult(id: number, resultId: number) {
    console.log('ResultId', resultId);

    return this.http.patch<RaceInterface>(
      `${this.url}/delete-result/${id}`,
      { resultId },
      {
        responseType: 'json',
      }
    );
  }

  getCalendar(): Observable<
    Record<number, Record<number, Record<number, string[][]>>>
  > {
    return this.http.get<
      Record<number, Record<number, Record<number, string[][]>>>
    >(this.url + '/calendar', { responseType: 'json' });
  }
}
