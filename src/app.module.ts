import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { TeamsModule } from './teams/teams.module';
import { UsersModule } from './users/users.module';
import { InvitesModule } from './invites/invites.module';
import { MembersModule } from './members/members.module';
import { AuthGuard } from './common/guards/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: 'schema.graphql',
      context: ({ req }) => {
        return {
          request: req,
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TeamsModule,
    UsersModule,
    InvitesModule,
    MembersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
