import { PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { UserCreate } from './user.dto';

export class LocalAuth extends PickType(UserCreate, ['username', 'password']) {}

export class LocalAuthReq {
  user: LocalAuth;
}

export class JwtAuth {
  @IsString()
  accessToken: string;

  @IsString()
  userId: string;
}
