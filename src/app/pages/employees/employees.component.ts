import { Component, OnInit } from "@angular/core";
import { TableComponent } from "../../components/table/table.component";
import { EmployeeService } from "../../services/employee.service";
import { ButtonModule } from "primeng/button";
import { Column, Entity, Employee } from "../../models/models";
import { EntityModalComponent } from "../../components/entity-modal/entity-modal.component";

@Component({
  selector: "app-employees",
  standalone: true,
  imports: [TableComponent, ButtonModule, EntityModalComponent],
  templateUrl: "./employees.component.html",
  styleUrl: "./employees.component.scss",
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  columns: Column[] = [];
  employeeDialog = false;
  entity?: Entity;
  dialogVisible: boolean = false;

  constructor(private employeeService: EmployeeService) {}

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

  createNewEmployee() {
    this.entity = {
      name: "Crear Nuevo Empleado",
      fields: [
        {
          key: "fullName",
          label: "Nombre",
          type: "string",
        },
        {
          key: "email",
          label: "Correo",
          type: "string",
        },
        {
          key: "password",
          label: "Contrasena",
          type: "string",
        },
        {
          key: "role",
          label: "Rol",
          type: "string",
        },
        {
          key: "projects",
          label: "Proyectos",
          type: "string",
        },
        {
          key: "task",
          label: "Tareas",
          type: "string",
        },
      ],
    };
    this.dialogVisible = true;
  }

  onEditEmployee(item: any) {
    this.entity = {
      name: "Editar Empleado",
      fields: [
        {
          key: "fullName",
          label: "Nombre",
          value: item.fullName,
          type: "string",
        },
        {
          key: "email",
          label: "Correo",
          value: item.email,
          type: "string",
        },
        {
          key: "password",
          label: "Contrasena",
          value: item.password,
          type: "string",
        },
        {
          key: "role",
          label: "Rol",
          value: item.role,
          type: "string",
        },
        {
          key: "projects",
          label: "Proyectos",
          value: item.projects,
          type: "string",
        },
        {
          key: "task",
          label: "Tareas",
          value: item.task,
          type: "string",
        },
      ],
    };
    this.dialogVisible = true;
  }
}
