import { Inject, Injectable, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { Member } from '../entities/Member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CONTEXT } from '@nestjs/graphql';

@Injectable({ scope: Scope.REQUEST })
export class MemberRoleLoader {
  constructor(
    @Inject(CONTEXT)
    private readonly context: { req: { user: { id: string } } },
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  public readonly batch = new DataLoader(async (teamIds: string[]) => {
    try {
      // TODO currentUserを取得する別の方法を調査する
      const { id: currentUserId } = this.context.req.user;

      const members = await this.memberRepository.find({
        where: { team: In(teamIds), user: currentUserId },
        relations: ['team'],
      });

      return teamIds.map((teamId) => {
        const member = members.find((m) => m.team.id === teamId);
        return member.role;
      });
    } catch (e) {
      throw e;
    }
  });
}
