import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable, of } from "rxjs";
import { Employee, EmployeeFilters } from "../models/models";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  private URL = "assets/data/employees.json";

  private employeesCache: Employee[] | null = null;

  constructor(private http: HttpClient) {}

  getEmployees(filters?: EmployeeFilters): Observable<Employee[]> {
    if (this.employeesCache) {
      return of(this.filterEmployees(filters));
    }

    return this.http.get<{ employees: Employee[] }>(this.URL).pipe(
      map((res) => {
        this.employeesCache = res.employees.map((employee) => ({
          ...employee,
        }));

        return this.filterEmployees(filters);
      }),
    );
  }

  private filterEmployees(filters?: EmployeeFilters): Employee[] {
    if (!this.employeesCache) return [];

    return this.employeesCache.filter((employee) => {
      if (filters?.employeeId && employee.id !== filters.employeeId) {
        return false;
      }

      if (filters?.role && employee.role !== filters.role) {
        return false;
      }

      if (
        filters?.projectId &&
        !employee.projects.includes(filters.projectId)
      ) {
        return false;
      }

      return true;
    });
  }

  updateEmployee(
    employeeId: number,
    updatedEmployee: Employee,
  ): Observable<Employee> {
    if (!this.employeesCache) return of(updatedEmployee);

    const index = this.employeesCache.findIndex((e) => e.id === employeeId);

    if (index !== -1) {
      this.employeesCache[index] = { ...updatedEmployee };
    }

    return of(this.employeesCache[index]);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    if (!this.employeesCache) {
      this.employeesCache = [];
    }

    const maxId = this.employeesCache.length
      ? Math.max(...this.employeesCache.map((e) => e.id))
      : 0;

    const newEmployee: Employee = {
      ...employee,
      id: maxId + 1,
    };

    this.employeesCache = [...this.employeesCache, newEmployee];

    return of(newEmployee);
  }

  deleteEmployee(employeeId: number): Observable<Employee[]> {
    if (!this.employeesCache) return of([]);

    this.employeesCache = this.employeesCache.filter(
      (employee) => employee.id !== employeeId,
    );

    return of(this.employeesCache);
  }
}
