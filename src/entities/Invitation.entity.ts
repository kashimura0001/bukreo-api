import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Team } from './Team.entity';
import { User } from './User.entity';

export enum InvitationStatus {
  Sent,
  Rejected,
  Accepted,
}

registerEnumType(InvitationStatus, { name: 'InvitationStatus' });

@ObjectType()
@Entity('invitations')
export class Invitation {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Team)
  @ManyToOne(() => Team, (team) => team.invitations, {
    nullable: false,
    orphanedRowAction: 'delete',
  })
  team: Team;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.invitations, {
    nullable: false,
    orphanedRowAction: 'delete',
  })
  user: User;

  @Field()
  @Generated('uuid')
  @Column()
  code: string;

  @Field()
  @Column({ length: 255, unique: true })
  email: string;

  @Field(() => InvitationStatus)
  @Column({ type: 'enum', enum: InvitationStatus })
  status: InvitationStatus;

  @Field(() => GraphQLISODateTime)
  @Column()
  invitedAt: Date;
}
