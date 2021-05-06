import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class DeleteTeamInput {
  @Field(() => ID)
  id: string;
}
