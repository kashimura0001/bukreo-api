import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MembersService } from '../members/members.service';
import { Member } from '../members/entities/member.entity';

@Module({
  providers: [UsersResolver, UsersService, MembersService],
  imports: [TypeOrmModule.forFeature([User, Member])],
  exports: [UsersService],
})
export class UsersModule {}
