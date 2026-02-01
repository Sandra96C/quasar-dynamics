import { Component, OnInit } from "@angular/core";
import { Column, Employee, Project, Task } from "../../models/models";
import { EmployeeService } from "../../services/employee.service";
import { ActivatedRoute, Router } from "@angular/router";
import { TasksService } from "../../services/tasks.service";
import { CommonModule } from "@angular/common";
import { TagModule } from "primeng/tag";
import { TableModule } from "primeng/table";
import { CardModule } from "primeng/card";
import { TableComponent } from "../../components/table/table.component";
import { ProjectService } from "../../services/project.service";
import { forkJoin, Observable } from "rxjs";

@Component({
  selector: "app-employee-detail",
  standalone: true,
  imports: [CardModule, TableModule, TagModule, CommonModule, TableComponent],
  templateUrl: "./employee-detail.component.html",
  styleUrl: "./employee-detail.component.scss",
})
export class EmployeeDetailComponent implements OnInit {
  employeeId!: string;
  employee!: Employee;
  projects: Project[] = [];
  tasks: Task[] = [];
  columnsProject: Column[] = [];
  columnsTask: Column[] = [];

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private taskService: TasksService,
    private projectService: ProjectService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get("id")!;
    this.getEmployeeByUrl();
  }

  getEmployeeByUrl() {
    this.employeeService
      .getEmployees({ employeeId: parseInt(this.employeeId) })
      .subscribe({
        next: (data: Employee[] | undefined) => {
          if (data && data.length) {
            this.employee = data[0];
            this.getProjects();
          } else {
            this.router.navigate(["/404"]);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getProjects() {
    let obs: Observable<Project[]>[] = this.employee.projects.map(
      (projectId: number) => this.projectService.getProjects({ projectId }),
    );

    forkJoin(obs).subscribe({
      next: (data: Project[][]) => {
        this.projects = data.flat();
        this.columnsProject = [
          { key: "id", label: "id" },
          { key: "name", label: "nombre" },
          { key: "description", label: "descripción" },
          { key: "startDate", label: "fecha inicio", type: "date" },
          { key: "endDate", label: "fecha fin", type: "date" },
        ];
        this.getTasks();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getTasks() {
    let obs: Observable<Task[]>[] = this.employee.tasks.map((taskId: number) =>
      this.taskService.getTasks({ taskId }),
    );

    forkJoin(obs).subscribe({
      next: (data: Task[][]) => {
        this.tasks = data.flat();
        this.columnsTask = [
          { key: "id", label: "id" },
          { key: "title", label: "titulo" },
          { key: "description", label: "descripción" },
          { key: "status", label: "estado", type: "status" },
          { key: "startDate", label: "fecha inicio", type: "date" },
          { key: "endDate", label: "fecha fin", type: "date" },
        ];
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
