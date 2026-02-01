import { Component, OnInit } from "@angular/core";
import { TableComponent } from "../../components/table/table.component";
import { TasksService } from "../../services/tasks.service";
import { ButtonModule } from "primeng/button";
import { Column, Entity, Task } from "../../models/models";
import { EntityModalComponent } from "../../components/entity-modal/entity-modal.component";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: "app-tasks",
  standalone: true,
  imports: [TableComponent, ButtonModule, EntityModalComponent],
  providers: [ConfirmationService, MessageService],
  templateUrl: "./tasks.component.html",
  styleUrl: "./tasks.component.scss",
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  columns: Column[] = [];
  taskDialog = false;
  entity?: Entity;
  dialogVisible: boolean = false;

  constructor(
    private taskService: TasksService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

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
            { key: "description", label: "descripción" },
            { key: "status", label: "estado", type: "status" },
            { key: "startDate", label: "fecha inicio", type: "date" },
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

  onCreateNewTask() {
    this.buildEntity("Nueva Tarea", this.createNewTask.bind(this));
    this.dialogVisible = true;
  }

  onEditTask(item: any) {
    this.buildEntity("Editar Tarea", this.editTask.bind(this), item);
    this.dialogVisible = true;
  }

  editTask(task: Task): Observable<Task> {
    return this.taskService.updateTask(task.id, task).pipe(
      tap((updatedTask: Task) => {
        this.tasks = this.tasks.map((t) =>
          t.id === updatedTask.id ? updatedTask : t,
        );
      }),
    );
  }

  createNewTask(item: any): Observable<any> {
    return this.taskService.createTask(item).pipe(
      tap((createdTask: Task) => {
        this.tasks.push(createdTask);
      }),
    );
  }

  onDeleteTask(item: any) {
    this.taskService.deleteTask(item.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((task) => task.id !== item.id);

        this.messageService.add({
          severity: "info",
          summary: "Confirmed",
          detail: "Tarea Eliminada",
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onViewTask(item: any) {
    this.router.navigate([item.id], { relativeTo: this.route });
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
          key: "title",
          label: "Titulo",
          value: item?.title || "",
          type: "string",
        },
        {
          key: "description",
          label: "descripción",
          value: item?.description || "",
          type: "textarea",
        },
        {
          key: "status",
          label: "Estado",
          value: item?.status || "",
          type: "string",
        },
        {
          key: "startDate",
          label: "Fecha Inicio",
          value: item?.startDate || "",
          type: "date",
        },
        {
          key: "endDate",
          label: "Fecha fin",
          value: item?.endDate || "",
          type: "date",
        },
        {
          key: "employee",
          label: "Empleado",
          value: item?.employee || "",
          type: "string",
        },
        {
          key: "project",
          label: "Proyecto",
          value: item?.project || "",
          type: "string",
        },
      ],
      onSave: fn,
    };
  }
}
