import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Crear un nuevo usuario
  async create(user: Partial<User>): Promise<User> {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    const newUser = this.userRepository.create({
      ...user,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }
}