import { Component, OnInit } from "@angular/core";
import { TableComponent } from "../../components/table/table.component";
import { EmployeeService } from "../../services/employee.service";
import { ButtonModule } from "primeng/button";
import { Column, Entity, Employee } from "../../models/models";
import { EntityModalComponent } from "../../components/entity-modal/entity-modal.component";
import { Observable, tap } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: "app-employees",
  standalone: true,
  imports: [TableComponent, ButtonModule, EntityModalComponent],
  providers: [ConfirmationService, MessageService],
  templateUrl: "./employees.component.html",
  styleUrl: "./employees.component.scss",
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  columns: Column[] = [];
  entity?: Entity;
  dialogVisible: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (data: Employee[]) => {
        if (data) {
          this.employees = data;
          this.columns = [
            { key: "id", label: "id" },
            { key: "fullName", label: "nombre" },
            { key: "email", label: "correo electronico" },
            { key: "role", label: "rol" },
            { key: "projects", label: "proyectos" },
            { key: "tasks", label: "tareas asignadas" },
          ];
          console.log(data);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onEditEmployee(item: any) {
    this.buildEntity("Editar Empleado/a", this.editEmployee.bind(this), item);

    this.dialogVisible = true;
  }

  editEmployee(employee: Employee): Observable<Employee> {
    return this.employeeService.updateEmployee(employee.id, employee).pipe(
      tap((updatedEmployee: Employee) => {
        this.employees = this.employees.map((p) =>
          p.id === updatedEmployee.id ? updatedEmployee : p,
        );
      }),
    );
  }

  onViewEmployee(item: any) {
    this.router.navigate([item.id], { relativeTo: this.route });
  }

  onCreateNewEmployee() {
    this.buildEntity("Nuevo Empleado", this.createNewEmployee.bind(this));
    this.dialogVisible = true;
  }

  createNewEmployee(item: any): Observable<any> {
    return this.employeeService.createEmployee(item).pipe(
      tap((createdEmployee: Employee) => {
        this.employees.push(createdEmployee);
      }),
    );
  }

  onDeleteEmployee(item: any) {
    this.employeeService.deleteEmployee(item.id).subscribe({
      next: () => {
        this.employees = this.employees.filter(
          (employee) => employee.id !== item.id,
        );

        this.messageService.add({
          severity: "info",
          summary: "Confirmed",
          detail: "Proyecto Eliminado",
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  buildEntity(title: string, fn: (entity: any) => Observable<any>, item?: any) {
    this.entity = {
      name: title,
      fields: [
        {
          key: "id",
          label: "id",
          value: item?.id || "",
          type: "number",
          disabled: true,
        },
        {
          key: "fullName",
          label: "Nombre",
          value: item?.fullName || "",
          type: "string",
        },
        {
          key: "email",
          label: "Correo",
          value: item?.email || "",
          type: "string",
        },
        {
          key: "role",
          label: "Rol",
          value: item?.role || "",
          type: "string",
        },
        {
          key: "projects",
          label: "Proyectos",
          value: item?.projects || "",
          type: "string",
        },
        {
          key: "tasks",
          label: "Tareas",
          value: item?.tasks || "",
          type: "string",
        },
      ],
      onSave: fn,
    };
  }
}
