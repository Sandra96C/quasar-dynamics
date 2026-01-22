import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { PasswordModule } from "primeng/password";
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    PasswordModule,
    InputTextModule,
  ],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  error = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = "";

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe((result) => {
      this.loading = false;

      if (!result.success) {
        this.error = result.error!;
        return;
      }

      this.router.navigate(["/dashboard"]);
    });
  }
}
