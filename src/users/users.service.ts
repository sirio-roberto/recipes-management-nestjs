import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(user: User) {
    try {
      user.password = this.hashPassword(user.password);
      await this.userRepo.save(user);
      return;
    } catch {
      throw new BadRequestException();
    }
  }

  findAll() {
    return this.userRepo.find();
  }

  private hashPassword(password: string): string {
    const saltOrRounds = 10;
    return hashSync(password, saltOrRounds);
  }
}
