import { Component, OnInit } from "@angular/core";
import { TableComponent } from "../../components/table/table.component";
import { ProjectService } from "../../services/project.service";
import { ButtonModule } from "primeng/button";
import { EntityModalComponent } from "../../components/entity-modal/entity-modal.component";
import { Column, Entity, Project } from "../../models/models";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, tap } from "rxjs";

@Component({
  selector: "app-projects",
  standalone: true,
  imports: [TableComponent, ButtonModule, EntityModalComponent],
  templateUrl: "./projects.component.html",
  styleUrl: "./projects.component.scss",
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  columns: Column[] = [];
  entity?: Entity;
  dialogVisible: boolean = false;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.projectService.getProjects().subscribe({
      next: (data: Project[]) => {
        console.log({ data });

        if (data) {
          this.projects = data;
          this.columns = [
            { key: "id", label: "id" },
            { key: "name", label: "nombre" },
            { key: "description", label: "descripcion" },
            { key: "startDate", label: "fecha de inicio", type: "date" },
            { key: "endDate", label: "fecha fin", type: "date" },
          ];
          console.log(data);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onCreateNewProject() {
    this.entity = {
      name: "Crear Nuevo Proyecto",
      fields: [
        { key: "name", label: "Nombre", type: "string" },
        {
          key: "description",
          label: "Descripcion",
          type: "textarea",
        },
        {
          key: "startDate",
          label: "Fecha inicio",
          type: "date",
        },
        {
          key: "endDate",
          label: "Fecha fin",
          type: "date",
        },
      ],
      onSave: this.createNewProject.bind(this),
    };
    this.dialogVisible = true;
  }

  onEditProject(item: any) {
    console.log("Entra");

    this.entity = {
      name: "Editar Proyecto",
      fields: [
        {
          key: "id",
          label: "id",
          value: item.id,
          type: "number",
          disabled: true,
        },
        { key: "name", label: "Nombre", value: item.name, type: "string" },
        {
          key: "description",
          label: "Descripcion",
          value: item.description,
          type: "textarea",
        },
        {
          key: "startDate",
          label: "Fecha inicio",
          value: item.startDate,
          type: "date",
        },
        {
          key: "endDate",
          label: "Fecha fin",
          value: item.endDate,
          type: "date",
        },
      ],
      onSave: this.editProject.bind(this),
    };
    this.dialogVisible = true;
  }

  editProject(project: Project): Observable<Project> {
    console.log(project);
    return this.projectService.updateProject(project.id, project).pipe(
      tap((updatedProject: Project) => {
        this.projects = this.projects.map((p) =>
          p.id === updatedProject.id ? updatedProject : p,
        );
      }),
    );
  }

  onViewProject(item: any) {
    this.router.navigate([item.id], { relativeTo: this.route });
  }

  createNewProject(): Observable<any> {
    return new Observable();
  }
}
