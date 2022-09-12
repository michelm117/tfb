import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventInterface, StoryInterface } from '@tfb/api-interfaces';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  stories: EventInterface[] = [];

  url = 'story';
  constructor(private http: HttpClient) {}

  getStory(id: number): Observable<StoryInterface> {
    return this.http.get<StoryInterface>(`${this.url}/${id}`, {
      responseType: 'json',
    });
  }

  getStories(): Observable<StoryInterface[]> {
    return this.http.get<StoryInterface[]>(this.url, { responseType: 'json' });
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

  getPicture(imageName: string) {
    return `${this.url}/image/${imageName}`;
  }

  updateStory(id: number, story: Partial<StoryInterface>) {
    return this.http.patch<any>(
      `${this.url}/${id}`,
      {
        title: story.title,
        place: story.place,
        country: story.country,
        date: story.date,
        text: story.text,
        podium: story.podium,
      },
      {
        responseType: 'json',
      }
    );
  }

  createStory(story: Partial<StoryInterface>) {
    return this.http.post<StoryInterface>(this.url, story, {
      responseType: 'json',
    });
  }
}
