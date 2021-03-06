import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsResolver } from './teams.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';

@Module({
  providers: [TeamsResolver, TeamsService],
  imports: [TypeOrmModule.forFeature([Team])],
})
export class TeamsModule {}
