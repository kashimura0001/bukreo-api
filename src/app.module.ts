import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { TeamsModule } from './modules/teams.module';
import { UsersModule } from './modules/users.module';
import { InvitationsModule } from './modules/invitations.module';
import { MembersModule } from './modules/members.module';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      playground: true,
      autoSchemaFile: 'schema.graphql',
      context: ({ req }) => ({ req }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TeamsModule,
    UsersModule,
    InvitationsModule,
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
