import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Employee } from "../models/models";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  private URL = "assets/data/employees.json";

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http
      .get<{ employees: Employee[] }>(this.URL)
      .pipe(map((res) => res.employees));
  }
}
