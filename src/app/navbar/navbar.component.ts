import { Component, Inject, type OnInit } from '@angular/core';
import { AuthService, type User } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: User | null = null;

  constructor (
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(Router) private readonly router: Router
  ) {}

  ngOnInit (): void {
    this.user = this.authService.currentUser;
  }

  logout (): void {
    this.authService.logout();
    void this.router.navigate(['auth']);
  }
}
