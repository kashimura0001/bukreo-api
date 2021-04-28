import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../entities/Member.entity';
import { MembersService } from '../services/Members.service';
import { MembersResolver } from '../resolvers/Members.resolver';

@Module({
  providers: [MembersResolver, MembersService],
  imports: [TypeOrmModule.forFeature([Member])],
})
export class MembersModule {}
