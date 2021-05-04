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
import { MembersService } from '../services/Members.service';

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

  @ResolveField()
  async teams(@Parent() user: User) {
    const members = await this.membersService.findByUserId({ userId: user.id });

    return members.map((member) => {
      return { ...member.team, role: member.role };
    });
  }
}
