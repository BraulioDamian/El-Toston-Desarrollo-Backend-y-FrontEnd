//src/common/interceptors/file-cleanup.interceptor.ts

import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    BadRequestException,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  import * as fs from 'fs';
  import { Request } from 'express';
  
  @Injectable()
  export class FileCleanupInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const req = context.switchToHttp().getRequest<Request>();
      return next.handle().pipe(
        catchError((error) => {
          if (req.file) {
            // Eliminar archivo si ocurre un error
            fs.unlink(req.file.path, (err) => {
              if (err) console.error('Error al eliminar el archivo:', err.message);
            });
          }
          throw new BadRequestException(error.message || 'Error al procesar la solicitud.');
        }),
      );
    }
  }
  