import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Team } from './Team.entity';
import { User } from './User.entity';

export enum UserRole {
  Admin = 'admin',
  Member = 'member',
}

registerEnumType(UserRole, { name: 'UserRole' });

@ObjectType()
@Entity('members')
export class Member {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Team, (team) => team.members, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  team: Team;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.members, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: User;

  @Field(() => UserRole, { nullable: true })
  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;
}
