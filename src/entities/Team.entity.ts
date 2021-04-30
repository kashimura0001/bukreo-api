import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Member } from './Member.entity';
import { Invitation } from './Invitation.entity';

@ObjectType()
@Entity('teams')
export class Team {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => [Member])
  @OneToMany(() => Member, (member) => member.team)
  members: Member[];

  @Field(() => [Invitation], { nullable: 'items' })
  @OneToMany(() => Invitation, (invitation) => invitation.team)
  invitations?: Invitation[];

  @Field()
  @Column({ length: 50 })
  name: string;
}
