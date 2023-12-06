import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepo.findOneByOrFail({ email });
    const samePassword = await compare(password, user.password);
    if (samePassword) {
      return user;
    }
    throw new UnauthorizedException('Incorrect email or password');
  }
}
