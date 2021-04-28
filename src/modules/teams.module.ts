import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '../entities/team.entity';
import { TeamsService } from '../services/teams.service';
import { TeamsResolver } from '../resolvers/teams.resolver';
import { Member } from '../entities/member.entity';
import { MembersService } from '../services/members.service';

@Module({
  providers: [TeamsResolver, TeamsService, MembersService],
  imports: [TypeOrmModule.forFeature([Team, Member])],
})
export class TeamsModule {}
