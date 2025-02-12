import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsArray, Matches, ArrayNotEmpty, ArrayMinSize } from 'class-validator';

export class CreateDuacoderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{8}[A-Z]$/, { message: 'NIF no válido' })
  nif: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  department: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsString({ each: true })
  skills: string[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  photo?: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  likesOnionTortilla: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  birthDate?: string;
}