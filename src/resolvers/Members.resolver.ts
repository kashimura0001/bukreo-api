import { Args, Query, Resolver } from '@nestjs/graphql';
import { Member } from '../entities/Member.entity';
import { MembersService } from '../services/Members.service';

@Resolver(() => Member)
export class MembersResolver {
  constructor(private readonly membersService: MembersService) {}
}
