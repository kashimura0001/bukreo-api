import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TeamsService } from './teams.service';
import { Team } from './entities/team.entity';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
import { CurrentUser } from '../common/decorators/auth.decorator';
import { User } from '../users/entities/user.entity';

@Resolver(() => Team)
export class TeamsResolver {
  constructor(private readonly teamsService: TeamsService) {}

  @Mutation(() => Team)
  createTeam(
    @Args('input') input: CreateTeamInput,
    @CurrentUser() currentUser: User,
  ) {
    return this.teamsService.create(input, currentUser);
  }

  @Query(() => Team)
  team(@Args('id') id: string) {
    return this.teamsService.findOne(id);
  }

  @Mutation(() => Team)
  updateTeam(@Args('input') input: UpdateTeamInput) {
    return this.teamsService.update(input);
  }

  @Mutation(() => Team)
  removeTeam(@Args('id') id: string) {
    return this.teamsService.remove(id);
  }
}
