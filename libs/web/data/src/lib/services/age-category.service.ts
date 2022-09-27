import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgeCategoryInterface } from '@tfb/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class AgeCategoryService {
  url = 'https://api.michel.lu/age-category';
  httpOptions = {
    headers: new HttpHeaders({
      // 'Authorization': fooBarToken,
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
  };

  constructor(private http: HttpClient) {}

  create(name: string) {
    return this.http.post<AgeCategoryInterface>(
      this.url,
      {
        name: name,
      },
      this.httpOptions
    );
  }

  get(id: number): Observable<AgeCategoryInterface> {
    return this.http.get<AgeCategoryInterface>(
      `${this.url}/${id}`,
      this.httpOptions
    );
  }

  getAll(): Observable<AgeCategoryInterface[]> {
    return this.http.get<AgeCategoryInterface[]>(
      `${this.url}`,
      this.httpOptions
    );
  }

  update(ageCat: AgeCategoryInterface) {
    return this.http.patch(
      `${this.url}/${ageCat.id}`,
      {
        name: ageCat.name,
      },
      this.httpOptions
    );
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, this.httpOptions);
  }
}
