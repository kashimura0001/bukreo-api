import admin from 'firebase-admin';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FirebaseClient } from '../utils/FirebaseClient';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../services/Users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const disableAuth = this.reflector.get<boolean>(
      'disableAuth',
      context.getHandler(),
    );

    if (disableAuth) return true;

    const req = GqlExecutionContext.create(context).getContext().req;
    const idToken = await this.getIdToken(req);

    const decodedToken = await admin
      .auth()
      .verifyIdToken(idToken)
      .catch((e) => {
        console.log(e);
        throw new UnauthorizedException();
      });

    const user = await this.usersService.findByFirebaseUid(decodedToken.uid);

    if (!user) {
      throw new UnauthorizedException('The user dose not exist.');
    }

    req.user = user;
    return true;
  }

  private async getIdToken(request) {
    const devUserUid = this.configService.get('FIREBASE_DEV_USER_UID');
    if (devUserUid && process.env.NODE_ENV === 'development') {
      return await FirebaseClient.fetchIdTokenOfDevUser();
    }

    const authorization = request.get('Authorization');
    if (!authorization) {
      throw new UnauthorizedException('Invalid Authorization.');
    }

    const [bearer, idToken] = authorization.split(' ');
    if (!bearer || bearer.toLowerCase() !== 'bearer' || !idToken) {
      throw new UnauthorizedException('Invalid id token.');
    }

    return idToken;
  }
}
