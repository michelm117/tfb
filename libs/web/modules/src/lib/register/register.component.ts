import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@tfb/web/data';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'tfb-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: '',
    key: '',
  };

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit(user: any) {
    this.authService
      .register(user.name, user.email, user.password, user.key)
      .subscribe((res) => {
        if (res instanceof Number) {
          if (res === 200 || res === 201) {
            this._snackBar.open('Successfully registered', 'OK');
            this.router.navigate(['login']);
            return;
          }
        }
        this._snackBar.open('Secret Key is incorrect', 'OK');
      });
  }
}
