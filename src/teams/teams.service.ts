import { Injectable } from '@nestjs/common';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  async create(payload: CreateTeamInput) {
    return this.teamRepository.save({ ...payload });
  }

  async findOne(id: string) {
    return this.teamRepository.findOne(id);
  }

  async update(payload: UpdateTeamInput) {
    return this.teamRepository.update(payload.id, { name: payload.name });
  }

  async remove(id: string) {
    await this.teamRepository.delete(id);
    return this.findOne(id);
  }
}
