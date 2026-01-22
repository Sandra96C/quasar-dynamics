import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProjectService } from "../../services/project.service";
import { Column, Project, Task } from "../../models/models";
import { TasksService } from "../../services/tasks.service";
import { CardModule } from "primeng/card";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { CommonModule } from "@angular/common";
import { TableComponent } from "../../components/table/table.component";

@Component({
  selector: "app-project-detail",
  standalone: true,
  imports: [CardModule, TableModule, TagModule, CommonModule, TableComponent],
  templateUrl: "./project-detail.component.html",
  styleUrl: "./project-detail.component.scss",
})
export class ProjectDetailComponent implements OnInit {
  projectId!: string;
  project!: Project;
  tasks: Task[] = [];
  columns: Column[] = [];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private TaskService: TasksService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get("id")!;
    this.getProjectByUrl();
    console.log(this.projectId);
  }

  getProjectByUrl() {
    this.projectService
      .getProjects({ projectId: parseInt(this.projectId) })
      .subscribe({
        next: (data: Project[] | undefined) => {
          if (data && data.length) {
            this.project = data[0];
            this.getProjectTasks();
          } else {
            this.router.navigate(["/404"]);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getProjectTasks() {
    this.TaskService.getTasks({ projectId: this.project.id }).subscribe({
      next: (data: Task[] | undefined) => {
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
}
