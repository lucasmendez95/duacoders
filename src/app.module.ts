import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DuacodersModule } from './duacoders/duacoders.module';
import { Duacoder } from './duacoders/duacoders.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { LogsService } from './logs/logs.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Duacoder, User],
      synchronize: true
    }),
    TypeOrmModule.forFeature([Duacoder, User]),
    AuthModule, 
    DuacodersModule, UsersModule
  ],
  controllers: [AppController],
  providers: [AppService, LogsService],
})
export class AppModule {}
