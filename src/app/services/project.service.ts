import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Project } from "../models/models";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  private URL = "assets/data/projects.json";

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<{ projects: Project[] }>(this.URL).pipe(
      map((res) =>
        res.projects.map((p) => ({
          ...p,
          startDate: p.startDate ? new Date(p.startDate) : undefined,
          endDate: p.endDate ? new Date(p.endDate) : undefined,
        })),
      ),
    );
  }
}
