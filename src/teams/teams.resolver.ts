import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TeamsService } from './teams.service';
import { Team } from './entities/team.entity';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
import { CurrentUser } from '../common/decorators/auth.decorator';
import { User } from '../users/entities/user.entity';
import { MembersService } from '../members/members.service';

@Resolver(() => Team)
export class TeamsResolver {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly membersService: MembersService,
  ) {}

  @Mutation(() => Team)
  async createTeam(
    @Args('input') input: CreateTeamInput,
    @CurrentUser() currentUser: User,
  ) {
    return this.teamsService.create(input, currentUser);
  }

  @Mutation(() => Team)
  async updateTeam(@Args('input') input: UpdateTeamInput) {
    return this.teamsService.update(input);
  }

  @Mutation(() => Team)
  async removeTeam(@Args('id') id: string) {
    return this.teamsService.remove(id);
  }

  @Query(() => Team)
  async team(@Args('id') id: string) {
    return this.teamsService.findOne(id);
  }

  @ResolveField()
  async members(@Parent() team: Team) {
    return this.membersService.findAll({ teamId: team.id });
  }

  @ResolveField()
  async invitations(@Parent() team: Team) {
    // TODO あとで招待情報を取得できるようにする
    return null;
  }
}
