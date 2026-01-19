import { Component, OnInit } from "@angular/core";
import { Column, TableComponent } from "../../components/table/table.component";
import { Project, ProjectService } from "../../services/project.service";
import { ButtonModule } from "primeng/button";
export interface DataItem {
  name: string;
  type: string;
  value: any;
}

@Component({
  selector: "app-projects",
  standalone: true,
  imports: [TableComponent, ButtonModule],
  templateUrl: "./projects.component.html",
  styleUrl: "./projects.component.scss",
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  columns: Column[] = [];
  projectDialog = false;
  selectedProject?: DataItem;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.projectService.getProjects().subscribe({
      next: (data) => {
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
    // this.selectedItem = { ...item };
    this.projectDialog = true;
  }

  onSave(updatedItem: Project) {
    console.log("Item guardado:", updatedItem);
    this.projectDialog = false;
  }
}
