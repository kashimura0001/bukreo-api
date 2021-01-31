import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invite } from './entiities/invite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invite])],
})
export class InvitesModule {}
