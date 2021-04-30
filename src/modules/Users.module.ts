import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User.entity';
import { UsersService } from '../services/Users.service';
import { UsersResolver } from '../resolvers/Users.resolver';
import { Team } from '../entities/Team.entity';
import { TeamsService } from '../services/Teams.service';

@Module({
  providers: [UsersResolver, UsersService, TeamsService],
  imports: [TypeOrmModule.forFeature([User, Team])],
  exports: [UsersService],
})
export class UsersModule {}
