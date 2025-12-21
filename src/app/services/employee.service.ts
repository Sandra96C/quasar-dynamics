import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Employee {
  id: number;
  fullName: string;
  email: string;
  password: string;
  role: string;
  projects: number[];
  tasks: number[];
}


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private URL = 'assets/data/employees.json';

  constructor(private http: HttpClient) {
  }

  getEmployees(): Observable<Employee[]> {
    return this.http
      .get<{ employees: Employee[] }>(this.URL)
      .pipe(map(res => res.employees));
  }
}
