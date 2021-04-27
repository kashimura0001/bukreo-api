import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { MembersService } from './members.service';
import { MembersResolver } from './members.resolver';

@Module({
  providers: [MembersResolver, MembersService],
  imports: [TypeOrmModule.forFeature([Member])],
})
export class MembersModule {}
