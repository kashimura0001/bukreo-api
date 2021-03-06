import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitation } from './entiities/invitation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invitation])],
})
export class InvitationsModule {}
