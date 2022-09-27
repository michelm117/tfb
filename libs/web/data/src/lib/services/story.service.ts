import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventInterface, StoryInterface } from '@tfb/api-interfaces';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  stories: EventInterface[] = [];

  url = 'https://api.michel.lu/story';
  constructor(private http: HttpClient) {}

  createStory(story: Partial<StoryInterface>) {
    return this.http.post<StoryInterface>(this.url, story, {
      responseType: 'json',
    });
  }

  getStory(id: number): Observable<StoryInterface> {
    return this.http.get<StoryInterface>(`${this.url}/${id}`, {
      responseType: 'json',
    });
  }

  getAllStories(): Observable<StoryInterface[]> {
    return this.http.get<StoryInterface[]>(`${this.url}/all`, {
      responseType: 'json',
    });
  }

  getStories(): Observable<StoryInterface[]> {
    return this.http.get<StoryInterface[]>(this.url, {
      responseType: 'json',
    });
  }

  getCalendar(): Observable<
    Record<number, Record<number, Record<number, string[][]>>>
  > {
    return this.http.get<
      Record<number, Record<number, Record<number, string[][]>>>
    >(this.url + '/calendar', { responseType: 'json' });
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
      {
        responseType: 'json',
      }
    );
  }

  deleteStory(id: number) {
    return this.http.delete<any>(`${this.url}/${id}`, { responseType: 'json' });
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

  getPicture(imageName: string) {
    return `${this.url}/image/${imageName}`;
  }

  getYearsStoriesMap() {
    return this.http.get<Record<string, StoryInterface[]>>(`${this.url}/map`, {
      responseType: 'json',
    });
  }

  getYears() {
    return this.http.get<string[]>(`${this.url}/years`, {
      responseType: 'json',
    });
  }
}
