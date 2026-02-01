import { Component, OnInit } from "@angular/core";
import { Project, Task } from "../../models/models";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { TasksService } from "../../services/tasks.service";
import { ProjectService } from "../../services/project.service";
import { CardModule } from "primeng/card";
import { TagModule } from "primeng/tag";
import { CommonModule } from "@angular/common";
import { DividerModule } from "primeng/divider";

@Component({
  selector: "app-task-detail",
  standalone: true,
  imports: [CardModule, TagModule, CommonModule, DividerModule, RouterModule],
  templateUrl: "./task-detail.component.html",
  styleUrl: "./task-detail.component.scss",
})
export class TaskDetailComponent implements OnInit {
  taskId!: string;
  project!: Project;
  task!: Task;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private TaskService: TasksService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get("id")!;
    this.getTaskByUrl();
  }

  getTaskByUrl() {
    this.TaskService.getTasks({ taskId: parseInt(this.taskId) }).subscribe({
      next: (data: Task[] | undefined) => {
        if (data && data.length) {
          this.task = data[0];
        } else {
          this.router.navigate(["/404"]);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
