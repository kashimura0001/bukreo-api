import { Injectable } from '@nestjs/common';
import { CreateTeamInput } from '../interfaces/CreateTeam.input';
import { UpdateTeamInput } from '../interfaces/UpdateTeam.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from '../entities/Team.entity';
import { Connection, Repository } from 'typeorm';
import { Member, UserRole } from '../entities/Member.entity';
import { User } from '../entities/User.entity';

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

  async update(payload: UpdateTeamInput) {
    return this.teamRepository.update(payload.id, { name: payload.name });
  }

  async remove(id: string) {
    return await this.teamRepository.delete(id);
  }

  async findOne(id: string) {
    return this.teamRepository.findOne(id);
  }

  async findAll({ userId }: { userId: string }) {
    return this.teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.members', 'members')
      .where('members.userId = :userId', { userId })
      .getMany();
  }
}
