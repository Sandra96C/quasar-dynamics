import { Component, OnInit } from "@angular/core";
import { TableComponent } from "../../components/table/table.component";
import { ProjectService } from "../../services/project.service";
import { ButtonModule } from "primeng/button";
import { EntityModalComponent } from "../../components/entity-modal/entity-modal.component";
import { Column, Entity, Project } from "../../models/models";
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-projects",
  standalone: true,
  imports: [TableComponent, ButtonModule, EntityModalComponent, RouterOutlet],
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
        if (data) {
          this.projects = data;
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

  createNewProject() {
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
    };
    this.dialogVisible = true;
  }

  onEditProject(item: any) {
    this.entity = {
      name: "Editar Proyecto",
      fields: [
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
    };
    this.dialogVisible = true;
  }

  onViewProject(item: any) {
    this.router.navigate([item.id], { relativeTo: this.route });
  }
}
