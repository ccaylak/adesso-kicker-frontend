import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginService} from './services/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.startsWith('http://localhost') && this.loginService.token) {
      request = request.clone({
        headers: request.headers.append('Authorization', 'Bearer ' + this.loginService.token)
      });
    }
    return next.handle(request);
  }
}
