import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FirebaseProvider } from 'src/firebase/firebase.provider';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly firebaseProvider: FirebaseProvider,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const firebase = this.firebaseProvider.getInstance();
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const user = req.user;
    return true;
  }
}
