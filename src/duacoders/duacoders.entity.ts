import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Duacoder {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  nif: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({nullable: true})
  bio: string;

  @ApiProperty()
  @Column()
  department: string;

  @ApiProperty()
  @Column()
  position: string;

  @ApiProperty()
  @Column({type: 'json'})
  skills: string[];

  @ApiProperty()
  @Column({nullable: true})
  photo: string;

  @ApiProperty()
  @Column()
  likesOnionTortilla: boolean;

  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  birthDate: string;
}
