import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import * as path from 'path';

@Injectable()
export class LogsService {
  private readonly logger: winston.Logger;
  constructor() {
    // Configura Winston
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        // Registrar logs en un archivo
        new winston.transports.File({
          filename: path.join(__dirname, '..', '..', 'logs', 'errors.log'),
          level: 'error', // Solo registrar errores en este archivo
        }),

        // Registrar todos los logs en otro archivo
        new winston.transports.File({
          filename: path.join(__dirname, '..', '..', 'logs', 'combined.log')
        }),
      ],
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }
}