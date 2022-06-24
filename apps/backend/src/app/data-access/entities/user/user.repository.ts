import { EntityRepository } from '@mikro-orm/postgresql';
import * as bcrypt from 'bcrypt';

import { UserEntity } from './user.entity';

export class UserRepository extends EntityRepository<UserEntity> {
  async createUser(username: string, password: string) {
    password = await bcrypt.hash(password, 10);
    return this.create({ username, password });
  }
}
