import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoryInterface } from '@tfb/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  url = 'https://api.michel.lu/story';
  httpOptions = {
    headers: new HttpHeaders({
      // 'Authorization': fooBarToken,
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
  };

  constructor(private http: HttpClient) {}

  createStory(story: Partial<StoryInterface>) {
    return this.http.post<StoryInterface>(this.url, story, this.httpOptions);
  }

  getStory(id: number): Observable<StoryInterface> {
    return this.http.get<StoryInterface>(`${this.url}/${id}`, this.httpOptions);
  }

  getAllStories(): Observable<StoryInterface[]> {
    return this.http.get<StoryInterface[]>(`${this.url}/all`, this.httpOptions);
  }

  getStories(): Observable<StoryInterface[]> {
    return this.http.get<StoryInterface[]>(this.url, this.httpOptions);
  }

  getCalendar(): Observable<
    Record<number, Record<number, Record<number, string[][]>>>
  > {
    return this.http.get<
      Record<number, Record<number, Record<number, string[][]>>>
    >(this.url + '/calendar', this.httpOptions);
  }

  updateStory(id: number, story: Partial<StoryInterface>) {
    return this.http.patch<StoryInterface>(
      `${this.url}/${id}`,
      {
        title: story.title,
        place: story.place,
        country: story.country,
        imgNames: story.imgNames,
        date: story.date,
        text: story.text,
        podium: story.podium,
        show: story.show,
      },
      this.httpOptions
    );
  }

  deleteStory(id: number) {
    return this.http.delete<any>(`${this.url}/${id}`, this.httpOptions);
  }

  uploadImage(id: number, file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
      withCredentials: true,
    };

    return this.http.post<{ imagePath: string }>(
      `${this.url}/upload/${id}`,
      formData,
      options
    );
  }

  getPicture(imageName: string) {
    return `${this.url}/image/${imageName}`;
  }

  getYearsStoriesMap() {
    return this.http.get<Record<string, StoryInterface[]>>(
      `${this.url}/map`,
      this.httpOptions
    );
  }

  getYears() {
    return this.http.get<string[]>(`${this.url}/years`, this.httpOptions);
  }
}
