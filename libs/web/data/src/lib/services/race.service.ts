import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RaceInterface } from '@tfb/api-interfaces';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RaceService {
  url = 'https://api.michel.lu/myrace';
  httpOptions = {
    headers: new HttpHeaders({
      // 'Authorization': fooBarToken,
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
  };

  constructor(private http: HttpClient) {}

  getRace(id: number): Observable<RaceInterface> {
    return this.http.get<RaceInterface>(`${this.url}/${id}`, this.httpOptions);
  }

  getAllRaces(): Observable<RaceInterface[]> {
    return this.http.get<RaceInterface[]>(`${this.url}/all`, this.httpOptions);
  }

  getRaces(): Observable<RaceInterface[]> {
    return this.http.get<RaceInterface[]>(this.url, this.httpOptions);
  }

  getPicture(imageName: string) {
    const url = `${this.url}/image/${imageName}`;
    return url;
  }

  getYearsRacesMap() {
    return this.http.get<Record<string, RaceInterface[]>>(
      `${this.url}/map`,
      this.httpOptions
    );
  }

  getYears() {
    return this.http.get<string[]>(`${this.url}/years`, this.httpOptions);
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
      this.httpOptions
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
      this.httpOptions
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
      { ...options, ...this.httpOptions }
    );
  }

  deleteRace(id: number) {
    return this.http.delete<any>(`${this.url}/${id}`, this.httpOptions);
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
      this.httpOptions
    );
  }

  deleteResult(id: number, resultId: number) {
    return this.http.patch<RaceInterface>(
      `${this.url}/delete-result/${id}`,
      { resultId },
      this.httpOptions
    );
  }

  getCalendar(): Observable<
    Record<number, Record<number, Record<number, string[][]>>>
  > {
    return this.http.get<
      Record<number, Record<number, Record<number, string[][]>>>
    >(this.url + '/calendar', this.httpOptions);
  }
}
