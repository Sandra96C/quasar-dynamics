import { Injectable } from "@angular/core";
import { EmployeeService } from "./employee.service";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly STORAGE_KEY = "auth_token";

  constructor(private employeeService: EmployeeService) {}

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.STORAGE_KEY);
  }

  getCurrentUser(): any | null {
    const data = sessionStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  login(
    email: string,
    password: string,
  ): Observable<{ success: boolean; error?: string }> {
    return this.employeeService.getEmployees().pipe(
      map((employees) => {
        const user = employees.find(
          (e) => e.email.toLocaleLowerCase() === email.toLocaleLowerCase(),
        );

        if (!user) {
          return { success: false, error: "Usuario no encontrado" };
        }

        if (user.password !== password) {
          return { success: false, error: "Contraseña incorrecta" };
        }

        sessionStorage.setItem(
          this.STORAGE_KEY,
          JSON.stringify({
            id: user.id,
            fullName: user.fullName,
            role: user.role,
          }),
        );

        return { success: true };
      }),
    );
  }

  logout(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
  }
}
