import { Injectable } from '@angular/core';

interface AccountCredentials {
  username: string
  password: string
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _registeredAccounts: AccountCredentials[] | null = null;

  isAuthenticated (): boolean {
    const currentUsername = localStorage.getItem('currentUsername');

    return currentUsername != null;
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

    localStorage.setItem('currentUsername', credentials.username);
    localStorage.setItem('currentPassword', credentials.password);

    return true;
  }

  registerNewAccount (credentials: AccountCredentials): boolean {
    if (this.getExistingAccount(credentials.username) !== null) {
      return false;
    }

    this.registeredAccounts = [...this.registeredAccounts, credentials];

    return true;
  }
}
