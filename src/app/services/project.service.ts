import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { Project, ProjectFilters } from "../models/models";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  private URL = "assets/data/projects.json";

  private projectsCache: Project[] | null = null;

  constructor(private http: HttpClient) {}

  getProjects(filters?: ProjectFilters): Observable<Project[]> {
    if (this.projectsCache) {
      return of(this.filterProjects(filters));
    }
    return this.http.get<{ projects: Project[] }>(this.URL).pipe(
      map((res) => {
        this.projectsCache = res.projects.map((p) => ({
          ...p,
          startDate: p.startDate ? new Date(p.startDate) : undefined,
          endDate: p.endDate ? new Date(p.endDate) : undefined,
        }));

        return this.filterProjects(filters);
      }),
    );
  }

  private filterProjects(filters?: ProjectFilters): Project[] {
    if (!this.projectsCache) return [];

    return this.projectsCache.filter((project) => {
      if (filters?.projectId && project.id !== filters.projectId) return false;
      if (
        filters?.name &&
        !project.name.toLowerCase().includes(filters.name.toLowerCase())
      )
        return false;
      return true;
    });
  }

  updateProject(
    projectId: number,
    updatedProject: Project,
  ): Observable<Project> {
    if (!this.projectsCache) return of(updatedProject);

    const index = this.projectsCache.findIndex((p) => p.id === projectId);
    if (index !== -1) {
      this.projectsCache[index] = { ...updatedProject };
    }

    return of(this.projectsCache[index]);
  }
}
