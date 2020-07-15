import {Injectable} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private oAuthService: OAuthService, private userService: UserService) {
  }

  public login() {
    this.oAuthService.initImplicitFlow();
    // initLoginFlow?
  }

  public logout() {
    this.oAuthService.logOut();
  }

  get token(): string {
    return this.oAuthService.getAccessToken();
  }

  get fullName(): string {
    const claims: any = this.oAuthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims.name;
  }

  get userId(): string {
    const claims: any = this.oAuthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims.preferred_username;
  }
}
