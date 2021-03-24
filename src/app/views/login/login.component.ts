import { AuthService } from '../../service/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loading = false;
  form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    const { email, password } = this.form.value;
    this.loading = true;
    this.authService
      .login(email, password)
      .then((res) => {
        console.log(res);
        this.loading = false;
        this.router.navigate(['member-list']);
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  }

  get isLoginDisabled(): boolean {
    if (this.form.status === 'VALID' && this.loading === false) return false;
    return true;
  }
}
