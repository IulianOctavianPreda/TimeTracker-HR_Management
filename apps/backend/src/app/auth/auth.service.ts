import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { JwtAuth } from '../api/dtos/auth.dto';
import { User, UserCreate } from '../api/dtos/user.dto';
import { UserService } from '../api/user/user.service';
import { UserRepository } from '../data-access/entities/user/user.repository';
import { mapToDto } from '../data-access/mapper/dto.mapper';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userRepository.findOne({ username }, { populate: ['password'] });
    if (user) {
      if (await bcrypt.compare(pass, user.password)) {
        return mapToDto(user, User);
      }
    }
    return null;
  }

  async login(user: User): Promise<JwtAuth> {
    console.log(user);
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      userId: user.id,
    };
  }

  async register(data: UserCreate) {
    return await this.login(await this.userService.create(data));
  }
}
