import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '../entities/Team.entity';
import { TeamsService } from '../services/Teams.service';
import { TeamsResolver } from '../resolvers/Teams.resolver';
import { Member } from '../entities/Member.entity';
import { MembersService } from '../services/Members.service';
import { MemberRoleLoader } from '../dataloaders/MemberRole.loader';

@Module({
  providers: [TeamsResolver, TeamsService, MembersService, MemberRoleLoader],
  imports: [TypeOrmModule.forFeature([Team, Member])],
})
export class TeamsModule {}
