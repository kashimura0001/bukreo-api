import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from '../services/Users.service';
import { User } from '../entities/User.entity';
import { CreateUserInput } from '../interfaces/CreateUser.input';
import { UpdateUserInput } from '../interfaces/UpdateUser.input';
import { CurrentUser } from '../decorators/Auth.decorator';
import { DisableAuth } from '../decorators/DisableAuth.decorator';
import { TeamsService } from '../services/Teams.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly teamsService: TeamsService,
  ) {}

  @Mutation(() => User)
  @DisableAuth()
  async createUser(@Args('input') input: CreateUserInput) {
    return await this.usersService.create(input);
  }

  @Mutation(() => User)
  async updateUser(
    @CurrentUser() currentUser: User,
    @Args('input') input: UpdateUserInput,
  ) {
    return await this.usersService.update(currentUser, input);
  }

  @Query(() => User)
  async currentUser(@CurrentUser() currentUser: User) {
    return currentUser;
  }

  @ResolveField()
  async invitations(@Parent() user: User) {
    // TODO あとで招待情報を取得できるようにする
    return null;
  }

  @ResolveField()
  async teams(@CurrentUser() currentUser: User, @Parent() parentUser: User) {
    if (currentUser.id !== parentUser.id) {
      return null;
    }

    return this.teamsService.findByUserId({ userId: currentUser.id });
  }
}
