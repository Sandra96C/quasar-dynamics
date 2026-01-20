import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Task } from "../models/models";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  private URL = "assets/data/tasks.json";

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<{ tasks: Task[] }>(this.URL).pipe(
      map((res) =>
        res.tasks.map((p) => ({
          ...p,
          startDate: p.startDate ? new Date(p.startDate) : undefined,
          endDate: p.endDate ? new Date(p.endDate) : undefined,
        })),
      ),
    );
  }
}
