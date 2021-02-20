import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, MaxLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  firebaseIdToken: string;

  @Field()
  @MaxLength(100)
  name: string;

  @Field()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @Field({ nullable: true })
  avatarUrl?: string;
}
