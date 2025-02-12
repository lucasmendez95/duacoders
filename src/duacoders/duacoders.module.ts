import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Duacoder } from './duacoders.entity';
import { DuacodersService } from './duacoders.service';
import { DuacodersController } from './duacoders.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Duacoder])],
  providers: [DuacodersService],
  controllers: [DuacodersController],
  exports: [DuacodersService]
})
export class DuacodersModule {}
