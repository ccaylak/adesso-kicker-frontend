import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TokenInterceptor} from './token-interceptor';
import {AppRoutingModule, routingComponents} from './app-routing.module';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {ChartsModule} from 'ng2-charts';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {OAuthModule} from 'angular-oauth2-oidc';
import {NotificationComponent} from './notification/notification.component';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    BsDropdownModule.forRoot(),
    HttpClientModule,
    TooltipModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ChartsModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost/*'],
        sendAccessToken: true
      }
    }),
    TranslateModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})

export class AppModule {
}


