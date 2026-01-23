import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent implements OnInit {
  user: any = "";
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const user = this.authService.getCurrentUser();
    console.log(user);
    this.user = user;
  }
}
