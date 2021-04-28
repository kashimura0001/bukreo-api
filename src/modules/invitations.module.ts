import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitation } from '../entities/invitation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invitation])],
})
export class InvitationsModule {}
