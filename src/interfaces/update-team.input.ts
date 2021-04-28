import { CreateTeamInput } from './create-team.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateTeamInput extends PartialType(CreateTeamInput) {
  @Field(() => ID)
  id: string;
}
