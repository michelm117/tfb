import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RaceInterface } from '@tfb/api-interfaces';
import { Observable, of } from 'rxjs';

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

  getAllRaces(): Observable<RaceInterface[]> {
    return this.http.get<RaceInterface[]>(`${this.url}/all`, {
      responseType: 'json',
    });
  }

  getRaces(): Observable<RaceInterface[]> {
    return this.http.get<RaceInterface[]>(this.url, {
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

  createRace(
    title: string,
    place: string,
    countryId: number,
    date: Date,
    text: string,
    imgNames: string[],
    show: boolean
  ) {
    return this.http.post<RaceInterface>(
      this.url,
      {
        title: title,
        place: place,
        countryId: countryId,
        date: date,
        text: text,
        img: imgNames,
        show: show,
      },
      {
        responseType: 'json',
      }
    );
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
        show: race.show,
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
    acResult: number,
    show: boolean
  ) {
    return this.http.patch<RaceInterface>(
      `${this.url}/add-result/${id}`,
      {
        riderId: riderId,
        result: result,
        ageCategoryId: ageCategoryId,
        acResult: acResult,
        raceId: id,
        show: show,
      },
      {
        responseType: 'json',
      }
    );
  }

  deleteResult(id: number, resultId: number) {
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
