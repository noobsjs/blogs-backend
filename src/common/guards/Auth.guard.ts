import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FirebaseProvider } from 'src/firebase/firebase.provider';
import { AuthorService } from 'src/author/author.service';
import { User } from 'src/common/types/FirebaseUser';
import { AuthorInterface } from 'src/schemas/author.schema';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly firebaseProvider: FirebaseProvider,
    private readonly authorService: AuthorService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const firebase = this.firebaseProvider.getInstance();
    const logger = new Logger('AuthGuard');

    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    let jwt = req.headers.authorization;
    if (Array.isArray(jwt)) jwt = jwt[0];
    if (jwt) {
      try {
        const decodedToken = await firebase.auth().verifyIdToken(jwt, true);
        const firebaseUser = await firebase.auth().getUser(decodedToken.uid);
        const author = await this.authorService.findByUid(firebaseUser.uid);
        req.user = {
          author,
          firebase: firebaseUser,
        } as User;
      } catch (ex) {
        logger.error(ex);
        return false;
      }
    } else {
      return false;
    }

    return true;
  }
}
