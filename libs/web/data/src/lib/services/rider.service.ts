import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  uploadImage(id: number, file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    return this.http.post(`${this.url}/upload/${id}`, formData, options);
  }

  updateRider(rider: RiderInterface) {
    return this.http.patch(`${this.url}/${rider.id}`, {
      name: rider.name,
      surname: rider.surname,
      country: rider.country.id,
    });
  }

  deleteRider(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  addRider(name: string, surname: string, country: number) {
    return this.http.post<RiderInterface>(this.url, {
      name: name,
      surname: surname,
      country: country,
    });
  }
}
