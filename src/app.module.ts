import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { TeamsModule } from './teams/teams.module';
import { UsersModule } from './users/users.module';
import { InvitesModule } from './invites/invites.module';
import { MembersModule } from './members/members.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: 'schema.graphql',
    }),
    TeamsModule,
    UsersModule,
    InvitesModule,
    MembersModule,
  ],
})
export class AppModule {}
