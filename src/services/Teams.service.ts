import { Injectable } from '@nestjs/common';
import { CreateTeamInput } from '../interfaces/CreateTeam.input';
import { UpdateTeamInput } from '../interfaces/UpdateTeam.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from '../entities/Team.entity';
import { Connection, Repository } from 'typeorm';
import { Member, UserRole } from '../entities/Member.entity';
import { User } from '../entities/User.entity';
import { UnauthorizedException } from '@nestjs/common';

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

  // TODO トランザクションをはる
  async update(currentUser: User, payload: UpdateTeamInput) {
    const team = await this.findOne({
      userId: currentUser.id,
      teamId: payload.id,
    });

    if (!team) {
      throw new UnauthorizedException('Not found team.');
    }

    team.name = payload.name;
    return await this.teamRepository.save(team);
  }

  async delete({ userId, teamId }: { userId: string; teamId: string }) {
    return await this.connection.transaction(async () => {
      const team = await this.findOne({ userId, teamId });

      if (!team) {
        throw new UnauthorizedException('Not found team.');
      }

      await this.teamRepository.delete(team.id);
      return team;
    });
  }

  async findOne({ userId, teamId }: { userId: string; teamId: string }) {
    return this.teamRepository
      .createQueryBuilder('teams')
      .leftJoinAndSelect('teams.members', 'members')
      .where('teams.id = :teamId', { teamId })
      .andWhere('members.userId = :userId', { userId })
      .getOne();
  }

  async findByUserId({ userId }: { userId: string }) {
    return this.teamRepository
      .createQueryBuilder('teams')
      .leftJoinAndSelect('teams.members', 'members')
      .where('members.userId = :userId', { userId })
      .getMany();
  }
}
