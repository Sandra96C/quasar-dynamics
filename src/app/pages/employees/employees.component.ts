import { Component, OnInit } from "@angular/core";
import { Column, TableComponent } from "../../components/table/table.component";
import { Employee, EmployeeService } from "../../services/employee.service";
import { ButtonModule } from "primeng/button";
export interface DataItem {
  name: string;
  type: string;
  value: any;
}
@Component({
  selector: "app-employees",
  standalone: true,
  imports: [TableComponent, ButtonModule],
  templateUrl: "./employees.component.html",
  styleUrl: "./employees.component.scss",
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  columns: Column[] = [];
  employeeDialog = false;
  selectedEmployee?: DataItem;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        if (data) {
          this.employees = data;
          this.columns = Object.keys(data[0]).map((key) => {
            return { name: key };
          });
          console.log(data);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
