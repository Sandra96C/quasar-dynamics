import { Injectable } from '@angular/core';
import { Employee, EmployeeService } from './employee.service';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_COOKIE = 'auth_token';
  constructor(private employeeService: EmployeeService, private http: HttpClient) { }


  isLoggedIn(): boolean {
    return document.cookie
      .split(';')
      .some(cookie => cookie.trim().startsWith(`${this.TOKEN_COOKIE}=`));
  }

  login(email: string, password: string): Observable<{ success: boolean; error?: string }> {
    return this.employeeService.getEmployees().pipe(
      map((employees: Employee[]) => {
        const user = employees.find(e => e.email === email);

        if (!user) {
          return { success: false, error: 'Usuario no encontrado' };
        }

        if (user.password !== password) {
          return { success: false, error: 'Contraseña incorrecta' };
        }

        // Login OK → guardamos info mínima en cookie
        document.cookie = `${this.TOKEN_COOKIE}=${user.id}; path=/`;

        return { success: true };
      })
    );
  }


  logout(): void {
    document.cookie = `${this.TOKEN_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  }

}
