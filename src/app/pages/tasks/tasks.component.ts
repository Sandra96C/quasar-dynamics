import { Component, OnInit } from "@angular/core";
import { TableComponent } from "../../components/table/table.component";
import { TasksService } from "../../services/tasks.service";
import { ButtonModule } from "primeng/button";
import { Column, Entity, Task } from "../../models/models";
import { EntityModalComponent } from "../../components/entity-modal/entity-modal.component";

@Component({
  selector: "app-tasks",
  standalone: true,
  imports: [TableComponent, ButtonModule, EntityModalComponent],
  templateUrl: "./tasks.component.html",
  styleUrl: "./tasks.component.scss",
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  columns: Column[] = [];
  taskDialog = false;
  entity?: Entity;
  dialogVisible: boolean = false;

  constructor(private taskService: TasksService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe({
      next: (data: Task[]) => {
        if (data) {
          this.tasks = data;
          this.columns = [
            { key: "id", label: "id" },
            { key: "title", label: "titulo" },
            { key: "description", label: "descripcion" },
            { key: "status", label: "estado", type: "status" },
            { key: "startDate", label: "fecha de inicio", type: "date" },
            { key: "endDate", label: "fecha fin", type: "date" },
            { key: "employee", label: "empleado" },
            { key: "project", label: "proyecto" },
          ];
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  createNewTask() {
    this.entity = {
      name: "Crear Nueva Tarea",
      fields: [
        { key: "title", label: "Titulo", type: "string" },
        {
          key: "description",
          label: "Descripcion",
          type: "textarea",
        },
        {
          key: "status",
          label: "Estado",
          type: "string",
        },
        {
          key: "startDate",
          label: "Fecha Inicio",
          type: "date",
        },
        {
          key: "endDate",
          label: "Fecha fin",
          type: "date",
        },
        {
          key: "employee",
          label: "Empleado",
          type: "string",
        },
        {
          key: "project",
          label: "Proyecto",
          type: "string",
        },
      ],
    };
    this.dialogVisible = true;
  }

  onEditTask(item: any) {
    console.log("item", item);
    this.entity = {
      name: "Editar Tarea",
      fields: [
        { key: "title", label: "Titulo", value: item.title, type: "string" },
        {
          key: "description",
          label: "Descripcion",
          value: item.description,
          type: "textarea",
        },
        {
          key: "status",
          label: "Estado",
          value: item.status,
          type: "string",
        },
        {
          key: "startDate",
          label: "Fecha Inicio",
          value: item.startDate,
          type: "date",
        },
        {
          key: "endDate",
          label: "Fecha fin",
          value: item.endDate,
          type: "date",
        },
        {
          key: "employee",
          label: "Empleado",
          value: item.employee,
          type: "string",
        },
        {
          key: "project",
          label: "Proyecto",
          value: item.project,
          type: "string",
        },
      ],
    };
    this.dialogVisible = true;
  }
}
