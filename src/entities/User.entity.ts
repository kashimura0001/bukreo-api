import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { Member } from './Member.entity';
import { Invitation } from './Invitation.entity';
import { Team } from './Team.entity';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Member, (member) => member.user)
  members?: Member[];

  @Field(() => [Invitation], { nullable: 'itemsAndList' })
  @OneToMany(() => Invitation, (invitation) => invitation.user)
  invitations?: Invitation[];

  @HideField()
  @Column({ length: 255, unique: true })
  firebaseUid: string;

  @Field()
  @Column({ length: 100 })
  name: string;

  @Field()
  @Column({ length: 255, unique: true })
  email: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  avatarUrl?: string;

  @Field(() => [Team], { nullable: 'itemsAndList' })
  teams?: Team[];
}
