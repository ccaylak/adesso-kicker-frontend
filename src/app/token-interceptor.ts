import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginService} from './services/login.service';
import {environment} from '../environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.startsWith(`${environment.BASE_PATH}`) && this.loginService.token) {
      request = request.clone({
        headers: request.headers.append('Authorization', 'Bearer ' + this.loginService.token)
      });
    }
    return next.handle(request);
  }
}
