import { Module, Global, DynamicModule, Provider } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { FirebaseProvider } from 'src/firebase/firebase.provider';
import { FirebaseModuleAsyncOptions } from './iterfaces/FirebaseModuleAsyncOptions';
import { FirebaseModuleOptions } from 'src/firebase/iterfaces/FirebaseModuleOptions';
import { FirebaseOptionsFactory } from 'src/firebase/iterfaces/FirebaseOptionsFactory';

@Global()
@Module({})
export class FirebaseModule {
  static forRoot(options: FirebaseModuleOptions): DynamicModule {
    return {
      module: FirebaseModule,
      providers: [
        {
          provide: 'FIREBASE_CONFIG',
          useValue: options,
        },
        FirebaseProvider,
      ],
      exports: [FirebaseProvider],
    } as DynamicModule;
  }

  static forRootAsync(options: FirebaseModuleAsyncOptions): DynamicModule {
    let asyncProvider: Provider = null;

    if (options.useClass) {
      asyncProvider = {
        inject: [options.useClass],
        provide: 'FIREBASE_CONFIG',
        useFactory: (optionsFactory: FirebaseOptionsFactory) =>
          optionsFactory.createFirebaseOptions(),
      };
    } else {
      asyncProvider = {
        inject: options.inject || [],
        provide: 'FIREBASE_CONFIG',
        useFactory: options.useFactory,
      };
    }

    return {
      module: FirebaseModule,
      providers: [asyncProvider, FirebaseProvider],
      exports: [FirebaseProvider],
    } as DynamicModule;
  }
}
