import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { Member } from '../../members/entities/member.entity';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => [Member], { nullable: 'items' })
  @OneToMany(() => Member, (member) => member.user)
  members?: Member[];

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
}
