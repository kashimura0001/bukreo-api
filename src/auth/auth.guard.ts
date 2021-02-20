import admin from 'firebase-admin';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FirebaseClient } from '../utils/firebase-client';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const enableAuth = this.reflector.get<boolean>(
      'disableAuth',
      context.getHandler(),
    );

    if (enableAuth) return true;

    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().request;
    const idToken = await this.getIdToken(request);

    const decodedToken = await admin
      .auth()
      .verifyIdToken(idToken)
      .catch((e) => {
        console.log(e);
        throw new UnauthorizedException();
      });

    const user = await this.usersService.findByFirebaseUid(decodedToken.uid);

    if (!user) {
      throw new UnauthorizedException();
    }

    request.user = user;
    return true;
  }

  private async getIdToken(request) {
    const devUserUid = this.configService.get('FIREBASE_DEV_USER_UID');
    if (devUserUid && process.env.NODE_ENV === 'development') {
      return await FirebaseClient.fetchIdTokenOfDevUser();
    }

    const authorization = request.get('Authorization');
    if (!authorization) {
      throw new UnauthorizedException();
    }

    const [bearer, idToken] = authorization.split(' ');
    if (!bearer || bearer.toLowerCase() !== 'bearer' || !idToken) {
      throw new UnauthorizedException();
    }

    return idToken;
  }
}
