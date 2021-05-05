import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TeamsService } from '../services/Teams.service';
import { Team } from '../entities/Team.entity';
import { CreateTeamInput } from '../interfaces/CreateTeam.input';
import { UpdateTeamInput } from '../interfaces/UpdateTeam.input';
import { CurrentUser } from '../decorators/Auth.decorator';
import { User } from '../entities/User.entity';
import { MembersService } from '../services/Members.service';

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
  async team(@CurrentUser() currentUser: User, @Args('id') teamId: string) {
    return this.teamsService.findOne({
      userId: currentUser.id,
      teamId,
    });
  }

  @ResolveField()
  async members(@Parent() team: Team) {
    return this.membersService.findByTeamId({ teamId: team.id });
  }

  @ResolveField()
  async invitations(@Parent() team: Team) {
    // TODO あとで招待情報を取得できるようにする
    return null;
  }

  @ResolveField()
  async role(@CurrentUser() currentUser: User, @Parent() team: Team) {
    // TODO N+1を解消する
    const member = await this.membersService.findOne({
      userId: currentUser.id,
      teamId: team.id,
    });

    return member?.role;
  }
}
