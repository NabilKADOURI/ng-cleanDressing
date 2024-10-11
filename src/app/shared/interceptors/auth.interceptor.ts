import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";


// export function authInterceptor (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
//   const authService = inject(AuthService);
//     const token = authService.getToken();

//   if (token) {
//     req = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//   }

//   return next(req).pipe(
//     catchError(error => {
//       if (error.status === 401) {
//         authService.logout();
//       }
//       return throwError(error);
//     })
//   );
// }

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    
  }
  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        authService.logout();
      }
      throw new Error(err);
      
    })
    
  );

};