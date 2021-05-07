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
import { DeleteTeamInput } from '../interfaces/DeleteTeam.input';

@Resolver(() => Team)
export class TeamsResolver {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly membersService: MembersService,
  ) {}

  @Mutation(() => Team)
  async createTeam(
    @CurrentUser() currentUser: User,
    @Args('input') input: CreateTeamInput,
  ) {
    return this.teamsService.create(currentUser, input);
  }

  @Mutation(() => Team)
  async updateTeam(
    @CurrentUser() currentUser: User,
    @Args('input') input: UpdateTeamInput,
  ) {
    return this.teamsService.update(currentUser, input);
  }

  @Mutation(() => Team)
  async deleteTeam(
    @CurrentUser() currentUser: User,
    @Args('input') input: DeleteTeamInput,
  ) {
    return this.teamsService.delete(currentUser, input);
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
