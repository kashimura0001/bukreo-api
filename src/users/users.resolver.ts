import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { nullable: true })
  @UseGuards(AuthGuard)
  async user(@Args('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.usersService.create(createUserInput);
  }

  @Mutation(() => User)
  @UseGuards(AuthGuard)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    // TODO: ヘッダーのfirebase uidからcurrentUserを取得する処理いれる
    return await this.usersService.update('', updateUserInput);
  }

  @Mutation(() => User, { nullable: true })
  @UseGuards(AuthGuard)
  async removeUser(@Args('id') id: string) {
    return await this.usersService.remove(id);
  }
}
