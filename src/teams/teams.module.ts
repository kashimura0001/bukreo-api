import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsResolver } from './teams.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { MembersService } from '../members/members.service';
import { Member } from '../members/entities/member.entity';

@Module({
  providers: [TeamsResolver, TeamsService, MembersService],
  imports: [TypeOrmModule.forFeature([Team, Member])],
})
export class TeamsModule {}
