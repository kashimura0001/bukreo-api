import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '../entities/Team.entity';
import { TeamsService } from '../services/Teams.service';
import { TeamsResolver } from '../resolvers/Teams.resolver';
import { Member } from '../entities/Member.entity';
import { MembersService } from '../services/Members.service';

@Module({
  providers: [TeamsResolver, TeamsService, MembersService],
  imports: [TypeOrmModule.forFeature([Team, Member])],
})
export class TeamsModule {}
