import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-project-detail",
  standalone: true,
  imports: [],
  templateUrl: "./project-detail.component.html",
  styleUrl: "./project-detail.component.scss",
})
export class ProjectDetailComponent implements OnInit {
  projectId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get("id")!;
    console.log(this.projectId);
  }
}
