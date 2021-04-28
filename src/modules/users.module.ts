import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { UsersResolver } from '../resolvers/users.resolver';
import { Member } from '../entities/member.entity';
import { MembersService } from '../services/members.service';

@Module({
  providers: [UsersResolver, UsersService, MembersService],
  imports: [TypeOrmModule.forFeature([User, Member])],
  exports: [UsersService],
})
export class UsersModule {}
