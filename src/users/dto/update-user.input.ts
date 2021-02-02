import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @MaxLength(100)
  name?: string;

  @Field({ nullable: true })
  @MaxLength(255)
  email?: string;

  @Field({ nullable: true })
  avatarUrl?: string;
}
