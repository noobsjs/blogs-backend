import { Module, Global, DynamicModule } from '@nestjs/common';
import * as firebase from 'firebase-admin'
import { FirebaseProvider } from 'src/firebase/firebase.provider';

@Global()
@Module({})
export class FirebaseModule {
  static forRoot(options?: firebase.AppOptions, name?: string): DynamicModule {
    return {
      module: FirebaseModule,
      providers: [
        {
          provide: "FIREBASE_CONFIG",
          useValue: {
            options, name
          }
        },
        FirebaseProvider
      ],
      exports: [FirebaseProvider]
    } as DynamicModule
  }
}
