import { Injectable } from '@nestjs/common';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Connection, Repository } from 'typeorm';
import { Member, UserRole } from '../members/entities/member.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TeamsService {
  constructor(
    private connection: Connection,
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  async create(payload: CreateTeamInput, currentUser: User) {
    return await this.connection.transaction(async (manager) => {
      const team = await manager.save(Team, { name: payload.name });
      await manager.save(Member, {
        user: currentUser,
        team: team,
        role: UserRole.Admin,
      });

      return team;
    });
  }

  async findOne(id: string) {
    return this.teamRepository.findOne(id);
  }

  async update(payload: UpdateTeamInput) {
    return this.teamRepository.update(payload.id, { name: payload.name });
  }

  async remove(id: string) {
    return await this.teamRepository.delete(id);
  }
}
