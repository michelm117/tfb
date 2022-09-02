import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RiderInterface } from '@tfb/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class RiderService {
  url = 'riders';
  constructor(private http: HttpClient) {}

  getRiderById(id: number): Observable<RiderInterface> {
    return this.http.get<RiderInterface>(`${this.url}/${id}`, {
      responseType: 'json',
    });
  }

  getRiders(): Observable<RiderInterface[]> {
    return this.http.get<RiderInterface[]>(`${this.url}`, {
      responseType: 'json',
    });
  }

  getProfilePicture(imageName: string) {
    return `${this.url}/image/${imageName}`;
  }

  // sortByDate(riders: Event[]) {
  //   return riders.sort((a, b) => (a?.date > b?.date ? 1 : -1));
  // }

  // getYearStoryMap(): Observable<Map<number, Event[]>> {
  //   const map = new Map<number, Event[]>();
  //   this.riders.forEach((story) => {
  //     const year = story.date.getFullYear();
  //     if (!map.has(year)) {
  //       map.set(year, []);
  //     }
  //     map.get(year)?.push(story);
  //   });
  //   return of(map);
  // }
}
