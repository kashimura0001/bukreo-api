import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Team } from '../../teams/entities/team.entity';
import { User } from '../../users/entities/user.entity';
import { Invite } from '../../invites/entiities/invite.entity';

export enum UserRole {
  Admin,
  Member,
}

registerEnumType(UserRole, { name: 'UserRole' });

@ObjectType()
@Entity('members')
export class Member {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Team)
  @ManyToOne(() => Team, (team) => team.members, { nullable: false })
  team: Team;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.members)
  user?: User;

  @Field(() => UserRole, { nullable: true })
  @Column({ type: 'enum', enum: UserRole })
  role?: UserRole;

  @Field(() => Invite, { nullable: true })
  @OneToOne(() => Invite)
  @JoinColumn()
  invite?: Invite;
}
