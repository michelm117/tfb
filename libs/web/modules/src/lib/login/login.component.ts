import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@tfb/web/data';

@Component({
  selector: 'tfb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user = {
    email: '',
    password: '',
  };

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit(user: any) {
    this.authService.login(user.email, user.password).subscribe((user) => {
      if (user instanceof HttpErrorResponse) {
        this._snackBar.open('Credentials are incorrect', 'OK');
        this.authService.logout();
        return;
      }

      if (!user) {
        console.error('Received user is undefined');
        return;
      }

      this._snackBar.open('Logged in successfully', 'OK');
      this.router.navigate(['admin']);
    });
  }
}
