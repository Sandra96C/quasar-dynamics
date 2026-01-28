import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable, of } from "rxjs";
import { Task, TaskFilters } from "../models/models";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  private URL = "assets/data/tasks.json";

  private tasksCache: Task[] | null = null;

  constructor(private http: HttpClient) {}

  getTasks(filters?: TaskFilters): Observable<Task[]> {
    if (this.tasksCache) {
      return of(this.filterTasks(filters));
    }

    return this.http.get<{ tasks: Task[] }>(this.URL).pipe(
      map((res) => {
        this.tasksCache = res.tasks.map((task) => ({
          ...task,
          startDate: task.startDate ? new Date(task.startDate) : undefined,
          endDate: task.endDate ? new Date(task.endDate) : undefined,
        }));

        return this.filterTasks(filters);
      }),
    );
  }

  private filterTasks(filters?: TaskFilters): Task[] {
    if (!this.tasksCache) return [];

    return this.tasksCache.filter((task) => {
      if (filters?.projectId && task.project !== filters.projectId)
        return false;
      if (filters?.status && task.status !== filters.status) return false;
      if (filters?.employee && task.employee !== filters.employee) return false;

      return true;
    });
  }

  updateTask(taskId: number, updatedTask: Task): Observable<Task> {
    if (!this.tasksCache) return of(updatedTask);

    const index = this.tasksCache.findIndex((t) => t.id === taskId);

    if (index !== -1) {
      this.tasksCache[index] = { ...updatedTask };
    }

    return of(this.tasksCache[index]);
  }

  createTask(task: Task): Observable<Task> {
    if (!this.tasksCache) {
      this.tasksCache = [];
    }

    const maxId = this.tasksCache.length
      ? Math.max(...this.tasksCache.map((t) => t.id))
      : 0;

    const newTask: Task = {
      ...task,
      id: maxId + 1,
    };

    this.tasksCache = [...this.tasksCache, newTask];

    return of(newTask);
  }

  deleteTask(taskId: number): Observable<Task[]> {
    if (!this.tasksCache) return of([]);

    this.tasksCache = this.tasksCache.filter((task) => task.id !== taskId);

    return of(this.tasksCache);
  }
}
