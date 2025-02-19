import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BASE_URL } from 'src/app/config';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

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

  // login
  login(api: string, suffixURL: string, data: any): Observable<any> {
    // console.log(data);
    return this.http.post(`${BASE_URL}${api}/${suffixURL}`, data);
  }

  // CREATE
  create(api: string, suffixURL: string, data: any): Observable<any> {
    // console.log(data);
    return this.http.post(`${BASE_URL}${api}/${suffixURL}`, data);
  }

  // READ GLOBAL
  getList(api: string, suffixUrl: string) {
    return this.http.get<any[]>(`${BASE_URL}${api}/${suffixUrl}`);
  }

  getClauseID(api: string, suffixUrl: string, value: any) {
    let params = {
      params: {
        id: value,
      },
    };
    return this.http.get<any[]>(`${BASE_URL}${api}/${suffixUrl}/`, params);
  }

  saveToken(
    token: string,
    idUser: string,
    idAgence: string,
    privilege: string
  ) {
    if (token !== undefined) {
      localStorage.setItem('id_user', idUser);
      localStorage.setItem('token', token);
      localStorage.setItem('id_agence', idAgence);
      localStorage.setItem('privilege', privilege);
      this.toastr.success('Vous êtes bien authentifier', 'Success!', {
        progressBar: true,
        closeButton: true,
      });
      // this.router.navigate(['/home/home']);
      window.location.href = '/home/home';
    } else {
      this.toastr.error('Informations incorrect !', 'Incorrect!', {
        progressBar: true,
      });
      this.router.navigate(['auth/login']);
    }
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token');
    // console.log(token);
    return !!token;
  }

  clearToken(): void {
    localStorage.removeItem('id_user');
    localStorage.removeItem('token');
    localStorage.removeItem('id_agence');
    this.toastr.info('Session Femer avec success', 'Fermeture !', {
      progressBar: true,
    });
    this.router.navigate(['/auth/login']);
  }

  clearTokenExpired(): void {
    localStorage.removeItem('id_user');
    localStorage.removeItem('token');
    localStorage.removeItem('id_agence');
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getIdUser(): string | null {
    return localStorage.getItem('id_user');
  }
}
