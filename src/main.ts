import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { LogsService } from './logs/logs.service';
import { ErrorsFilter } from './errors/errors.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  
  // Registrar el filtro de excepciones global
  const logsService = app.get(LogsService);
  app.useGlobalFilters(new ErrorsFilter(logsService));

  const config = new DocumentBuilder()
    .setTitle('Duacoders API')
    .setDescription('API para la gestión de duacoders')
    .setVersion('1.0')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();