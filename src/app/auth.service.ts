import { Injectable } from '@angular/core';

export interface AccountCredentials {
  username: string
  password: string
};

export interface User {
  username: string
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registeredAccounts: AccountCredentials[] | null = null;
  private _currentUser: User | null = null;

  isAuthenticated (): boolean {
    return this.currentUser !== null;
  }

  public get registeredAccounts (): AccountCredentials[] {
    if (this._registeredAccounts === null) {
      const accounts: AccountCredentials[] = JSON.parse(localStorage.getItem('accounts') ?? '[]');
      this._registeredAccounts = accounts;
    }
    return this._registeredAccounts;
  }

  public set registeredAccounts (newRegisteredAccounts: AccountCredentials[]) {
    localStorage.setItem('accounts', JSON.stringify(newRegisteredAccounts));
    this._registeredAccounts = newRegisteredAccounts;
  }

  private getExistingAccount (username: string): AccountCredentials | null {
    const foundAccount = this.registeredAccounts.find(credentials => credentials.username === username) ?? null;
    return foundAccount;
  }

  loginIntoAccount (credentials: AccountCredentials): boolean {
    const account = this.getExistingAccount(credentials.username);
    if (account == null || account.password !== credentials.password) {
      return false;
    }

    this.currentUser = { username: credentials.username };

    return true;
  }

  registerNewAccount (credentials: AccountCredentials): boolean {
    if (this.getExistingAccount(credentials.username) !== null) {
      return false;
    }

    this.registeredAccounts = [...this.registeredAccounts, credentials];

    return true;
  }

  public get currentUser (): User | null {
    if (this._currentUser === null) {
      const currentUsername = localStorage.getItem('currentUsername');
      if (currentUsername === null) {
        this._currentUser = null;
      } else {
        this._currentUser = { username: currentUsername };
      }
    }

    return this._currentUser;
  }

  public set currentUser (user: User | null) {
    if (user !== null) {
      localStorage.setItem('currentUsername', user.username);
    } else {
      localStorage.removeItem('currentUsername');
    }

    this._currentUser = user;
  }

  logout (): void {
    this.currentUser = null;
  }
}
