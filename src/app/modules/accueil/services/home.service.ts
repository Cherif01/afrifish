import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/config';
import { DefaultDeleteComponent } from 'src/app/public/default-delete/default-delete.component';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  // CREATE
  create(api: string, suffixURL: string, data: any): Observable<any> {
    // console.log(data);
    return this.http.post(`${BASE_URL}${api}/${suffixURL}`, data);
  }

  update(api: string, suffixUrl: string, data: any): Observable<any> {
    const url = `${BASE_URL}${api}/${suffixUrl}`;
    return this.http.post(url, data);
  }

  // READ GLOBAL
  getall(api: string, suffixUrl: string) {
    return this.http.get<any[]>(`${BASE_URL}${api}/${suffixUrl}`);
  }

  // GET

  getallParams(api: string, suffixUrl: string, id_: any, idFacture: any) {
    const url = `${BASE_URL}${api}/${suffixUrl}/${id_}/`;
    let params = {
      params: {
        id: id_,
        idFacture: idFacture,
      },
    };
    return this.http.get<any[]>(url, params);
  }

  // GET Unique
  getOne(api: string, suffixUrl: string, id_: any) {
    return this.http.get<any[]>(`${BASE_URL}${api}/${suffixUrl}?id=${id_}`);
  }

  // GET Unique
  getOneByID(api: string, suffixUrl: string, id_: any) {
    const url = `${BASE_URL}${api}/${suffixUrl}/` + id_;
    return this.http.get<any[]>(url);
  }

  // GET Unique

  delete(
    api: string,
    suffixUrl: any,
    table: string,
    id: any
  ): Observable<boolean> {
    const url = `${BASE_URL}${api}/${suffixUrl}/${id}/`;
    let params = {
      params: {
        table: table,
        id: id,
      },
    };
    return this.http.delete<boolean>(url, params);
  }

}
