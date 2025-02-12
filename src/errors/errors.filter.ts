import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { LogsService } from '../logs/logs.service';

@Catch()
export class ErrorsFilter implements ExceptionFilter {
  constructor(private readonly logsService: LogsService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Error interno del servidor';

    // Manejar excepciones de tipo HttpException
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse() as string;
    }

    // Registrar el error en el archivo de logs
    if (exception instanceof Error) {
      this.logsService.error(exception.message, exception.name, 'ErrorsFilter');
    }

    // Enviar la respuesta al cliente
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }
}