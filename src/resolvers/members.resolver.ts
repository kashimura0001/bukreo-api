import { Args, Query, Resolver } from '@nestjs/graphql';
import { Member } from '../entities/member.entity';
import { MembersService } from '../services/members.service';

@Resolver(() => Member)
export class MembersResolver {
  constructor(private readonly membersService: MembersService) {}
}
