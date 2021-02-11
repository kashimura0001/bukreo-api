import admin from 'firebase-admin';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().request;
    const idToken = this.getIdToken(request);

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

  private getIdToken(request) {
    const authorization = request.get('Authorization');
    if (!authorization) {
      throw new UnauthorizedException();
    }

    const [bearer, idToken] = authorization.split(' ');

    if (!bearer || bearer.toLowerCase() !== 'bearer') {
      throw new UnauthorizedException();
    }

    if (!idToken) {
      throw new UnauthorizedException();
    }

    return idToken;
  }
}
