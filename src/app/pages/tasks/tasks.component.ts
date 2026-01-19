import { Component, OnInit } from "@angular/core";
import { Column, TableComponent } from "../../components/table/table.component";
import { Task, TasksService } from "../../services/tasks.service";
import { ButtonModule } from "primeng/button";
export interface DataItem {
  name: string;
  type: string;
  value: any;
}
@Component({
  selector: "app-tasks",
  standalone: true,
  imports: [TableComponent, ButtonModule],
  templateUrl: "./tasks.component.html",
  styleUrl: "./tasks.component.scss",
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  columns: Column[] = [];
  taskDialog = false;
  selectedTask?: DataItem;

  constructor(private taskService: TasksService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        if (data) {
          console.log(data);

          this.tasks = data;
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
