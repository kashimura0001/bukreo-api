import { InputType, Int, Field } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class CreateTeamInput {
  @Field()
  @MaxLength(50)
  name: string;
}
