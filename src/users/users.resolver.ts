import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CurrentUser } from '../common/decorators/auth.decorator';
import { DisableAuth } from '../common/decorators/disable-auth.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { nullable: true })
  async currentUser(@CurrentUser() currentUser: User) {
    return currentUser;
  }

  @Mutation(() => User)
  @DisableAuth()
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.usersService.create(createUserInput);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser() currentUser: User,
  ) {
    return await this.usersService.update(currentUser.id, updateUserInput);
  }

  @Mutation(() => User, { nullable: true })
  async removeUser(@CurrentUser() currentUser: User) {
    return await this.usersService.remove(currentUser.id);
  }
}
