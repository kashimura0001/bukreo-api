import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User.entity';
import { UsersService } from '../services/Users.service';
import { UsersResolver } from '../resolvers/Users.resolver';
import { Member } from '../entities/Member.entity';
import { MembersService } from '../services/Members.service';

@Module({
  providers: [UsersResolver, UsersService, MembersService],
  imports: [TypeOrmModule.forFeature([User, Member])],
  exports: [UsersService],
})
export class UsersModule {}
