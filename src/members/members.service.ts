import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async findAll({ teamId, userId }: { teamId?: string; userId?: string }) {
    let where = {};
    if (teamId) {
      where = { ...where, team: teamId };
    }
    if (userId) {
      where = { ...where, user: userId };
    }

    return this.memberRepository.find({
      where: where,
      relations: ['user', 'team'],
    });
  }
}
