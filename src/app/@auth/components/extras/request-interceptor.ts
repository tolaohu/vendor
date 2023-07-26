import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { AuthService } from './auth-service';
import { Router } from '@angular/router';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        // const user = this.authenticationService.userValue;
        // const isLoggedIn = user && user.jwtToken;
        const isLoggedIn = this.authService.getToken();
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if(this.authService.isTokenExpired(this.authService.getTokenExpirationDate())){
            this.router.navigate(['auth/login']);
        }
        else if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${this.authService.getToken()}` }
            });
        }

        return next.handle(request);
    }
}