import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${environment.uri}/auth/login`, { email, password }).pipe(
      tap(response => localStorage.setItem('token', response.token))
    );
  }

  register(name: string, email: string, password: string, city_id: string): Observable<any> {
    return this.http.post(`${environment.uri}/users/register`, {
      name,
      role: 'paciente',
      email,
      password,
      city_id,
    });
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/auth';
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  getRole(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = this.jwtHelper.decodeToken(token);
      return decoded.role;
    }
    return null;
  }

  getUserId(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = this.jwtHelper.decodeToken(token);
      return decoded.sub;
    }
    return null;
  }
}
