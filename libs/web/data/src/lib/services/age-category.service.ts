import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgeCategoryInterface } from '@tfb/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class AgeCategoryService {
  url = 'age-category';
  constructor(private http: HttpClient) {}

  create(name: string) {
    return this.http.post<AgeCategoryInterface>(this.url, {
      name: name,
    });
  }

  get(id: number): Observable<AgeCategoryInterface> {
    return this.http.get<AgeCategoryInterface>(`${this.url}/${id}`, {
      responseType: 'json',
    });
  }

  getAll(): Observable<AgeCategoryInterface[]> {
    return this.http.get<AgeCategoryInterface[]>(`${this.url}`, {
      responseType: 'json',
    });
  }

  update(ageCat: AgeCategoryInterface) {
    return this.http.patch(`${this.url}/${ageCat.id}`, {
      name: ageCat.name,
    });
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
