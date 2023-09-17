import { Component, Inject, type OnDestroy, type OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit, OnDestroy {
  accountForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  constructor (
    @Inject(FormBuilder) private readonly formBuilder: FormBuilder,
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(Router) private readonly router: Router
  ) { }

  ngOnInit (): void {
    const navElement = document.getElementsByTagName('nav')[0];
    navElement.style.display = 'none';
  }

  ngOnDestroy (): void {
    const navElement = document.getElementsByTagName('nav')[0];
    navElement.style.display = 'block';
  }

  loginOrRegister (register: boolean = false): void {
    const formValue = this.accountForm.value;
    if (formValue.username === null || formValue.username === undefined || formValue.username.trim() === '') {
      alert('Username must be not empty');
      return;
    }
    if (formValue.password === null || formValue.password === undefined || formValue.password.trim() === '') {
      alert('Password must be not empty');
      return;
    }

    const credentials = {
      username: formValue.username,
      password: formValue.password
    }
    const isAuthenticated = register
      ? this.authService.registerNewAccount(credentials)
      : this.authService.loginIntoAccount(credentials);

    if (isAuthenticated) {
      void this.router.navigate(['']);
    } else if (register) {
      alert('Account with this username already exists');
    } else {
      alert('Try again');
    }
  }
}
