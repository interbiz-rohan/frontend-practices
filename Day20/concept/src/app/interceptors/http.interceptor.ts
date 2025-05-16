import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

let totalRequests = 0;

export const HttpRequestInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  totalRequests++;
  
  // Clone the request and add headers
  const modifiedRequest = request.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      // Add any auth token here if needed
      // 'Authorization': `Bearer ${getToken()}`
    }
  });

  // Log the request
  console.log('Request:', modifiedRequest);

  return next(modifiedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle errors globally
      console.error('Error occurred:', error);
      return throwError(() => error);
    }),
    finalize(() => {
      totalRequests--;
      if (totalRequests === 0) {
        // All requests completed
        console.log('All requests completed');
      }
    })
  );
}; 