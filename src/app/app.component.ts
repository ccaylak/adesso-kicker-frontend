import {Component} from '@angular/core';
import {AuthConfig, JwksValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  constructor(private oAuthService: OAuthService, private translate: TranslateService) {
    this.authConfig();
    translate.setDefaultLang('en');
  }

  private authConfig() {
    this.oAuthService.configure(authConfig);
    this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }
}

export const authConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'http://localhost:8081/auth/realms/adesso',

  // URL of the SPA to redirect the user to after login
  redirectUri: 'http://localhost:4200',

  // The SPA's id. The SPA is registered with this id at the auth-server
  clientId: 'angular-login',
};
