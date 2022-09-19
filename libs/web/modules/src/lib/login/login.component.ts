import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tfb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user = {
    name: '',
    password: '',
  };

  constructor() {}

  ngOnInit(): void {}

  onSubmit(user: any) {
    console.log(user);
  }
}
