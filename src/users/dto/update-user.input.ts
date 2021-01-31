import { CreateUserInput } from './create-user.input';
import { InputType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends OmitType(CreateUserInput, [
  'firebaseUid',
] as const) {}
