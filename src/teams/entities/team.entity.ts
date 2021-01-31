import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from '../../members/entities/member.entity';

@ObjectType()
@Entity("teams")
export class Team extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => [Member])
  @OneToMany(() => Member, (member) => member.team)
  members: Member[];

  @Field()
  @Column({ length: 50 })
  name: string;
}
