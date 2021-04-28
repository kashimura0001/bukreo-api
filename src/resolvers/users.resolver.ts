import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { CreateUserInput } from '../interfaces/create-user.input';
import { UpdateUserInput } from '../interfaces/update-user.input';
import { CurrentUser } from '../decorators/auth.decorator';
import { DisableAuth } from '../decorators/disable-auth.decorator';
import { MembersService } from '../services/members.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly membersService: MembersService,
  ) {}

  @Mutation(() => User)
  @DisableAuth()
  async createUser(@Args('input') input: CreateUserInput) {
    return await this.usersService.create(input);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('input') input: UpdateUserInput,
    @CurrentUser() currentUser: User,
  ) {
    return await this.usersService.update(currentUser.id, input);
  }

  @Mutation(() => User, { nullable: true })
  async removeUser(@CurrentUser() currentUser: User) {
    return await this.usersService.remove(currentUser.id);
  }

  @Query(() => User)
  async currentUser(@CurrentUser() currentUser: User) {
    return currentUser;
  }

  @ResolveField()
  async members(@Parent() user: User) {
    return this.membersService.findAll({ userId: user.id });
  }

  @ResolveField()
  async invitations(@Parent() user: User) {
    // TODO あとで招待情報を取得できるようにする
    return null;
  }
}
