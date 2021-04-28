import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitation } from '../entities/Invitation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invitation])],
})
export class InvitationsModule {}
