import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

export enum InviteStatus {
  Sent,
  Rejected,
  Accepted,
}

registerEnumType(InviteStatus, { name: 'InviteStatus' });

@ObjectType()
@Entity("invites")
export class Invite extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Generated('uuid')
  @Column()
  code: string;

  @Field()
  @Column({ length: 255, unique: true })
  email: string;

  @Field(() => InviteStatus)
  @Column({ type: 'enum', enum: InviteStatus })
  status: InviteStatus;

  @Field(() => GraphQLISODateTime)
  @Column()
  inviteAt: Date;
}
