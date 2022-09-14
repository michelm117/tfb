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

  createAgeCat(name: string, surname: string, country: number) {
    return this.http.post<AgeCategoryInterface>(this.url, {
      name: name,
      surname: surname,
      country: country,
    });
  }

  getAgeCatById(id: number): Observable<AgeCategoryInterface> {
    return this.http.get<AgeCategoryInterface>(`${this.url}/${id}`, {
      responseType: 'json',
    });
  }

  getAgeCats(): Observable<AgeCategoryInterface[]> {
    return this.http.get<AgeCategoryInterface[]>(`${this.url}`, {
      responseType: 'json',
    });
  }

  updateAgeCat(ageCat: AgeCategoryInterface) {
    return this.http.patch(`${this.url}/${ageCat.id}`, {
      name: ageCat.name,
    });
  }

  deleteAgeCat(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
