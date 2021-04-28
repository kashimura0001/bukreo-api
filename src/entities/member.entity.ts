import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Team } from './team.entity';
import { User } from './user.entity';

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
  @ManyToOne(() => Team, (team) => team.members, {
    nullable: false,
    orphanedRowAction: 'delete',
  })
  team: Team;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.members, {
    nullable: false,
    orphanedRowAction: 'delete',
  })
  user: User;

  @Field(() => UserRole, { nullable: true })
  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;
}
