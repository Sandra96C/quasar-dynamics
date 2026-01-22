import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Task, TaskFilters } from "../models/models";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  private URL = "assets/data/tasks.json";

  constructor(private http: HttpClient) {}

  getTasks(filters?: TaskFilters): Observable<Task[]> {
    return this.http.get<{ tasks: Task[] }>(this.URL).pipe(
      map((res) =>
        res.tasks
          .filter((task) => {
            if (filters?.projectId && task.project !== filters.projectId) {
              return false;
            }

            if (filters?.status && task.status !== filters.status) {
              return false;
            }

            if (filters?.employee && task.employee !== filters.employee) {
              return false;
            }

            return true;
          })
          .map((task) => ({
            ...task,
            startDate: task.startDate ? new Date(task.startDate) : undefined,
            endDate: task.endDate ? new Date(task.endDate) : undefined,
          })),
      ),
    );
  }
}
