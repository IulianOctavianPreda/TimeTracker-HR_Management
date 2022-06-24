import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { UserEntity } from './user.entity';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  controllers: [],
  providers: [],
  exports: [MikroOrmModule],
})
export class UserEntityModule {}
