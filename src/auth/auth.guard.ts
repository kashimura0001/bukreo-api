import admin from 'firebase-admin';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FirebaseClient } from '../utils/firebase-client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
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

    request.user = {
      isLogin: true,
      uid: decodedToken.uid,
    };

    return true;
  }

  private async getIdToken(request) {
    const devUserUid = new ConfigService().get('FIREBASE_DEV_USER_UID');
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
