import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Member } from '../entities/Member.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async findByTeamId({ teamId }: { teamId: string }) {
    return this.memberRepository.find({ where: { team: teamId } });
  }

  async findOne({ userId, teamId }: { userId: string; teamId: string }) {
    return this.memberRepository.findOne({
      where: { user: userId, team: teamId },
    });
  }
}
