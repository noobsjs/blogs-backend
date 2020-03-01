import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { GqlModuleOptions } from '@nestjs/graphql';
import { FirebaseModuleOptions } from '../../firebase/iterfaces/FirebaseModuleOptions';

import * as firebase from 'firebase-admin';

export const getMongoConfig = (
  configService: ConfigService,
): MongooseModuleOptions => {
  return {
    uri: configService.get<string>('MONGODB_URI'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
};

export const getGraphLQConfig = (
  configService: ConfigService,
): GqlModuleOptions => ({
  playground: configService.get<boolean>('GRAPHQL_PLAYGROUND'),
  debug: configService.get<boolean>('GRAPHQL_PLAYGROUND'),
  autoSchemaFile: true,
  context: ({ req }) => ({ req }),
});

export const getFirebaseConfig = (
  configService: ConfigService,
): FirebaseModuleOptions => {
  const credential = {
    type: configService.get<string>('FIREBASE_CREDENTIAL_TYPE'),
    project_id: configService.get<string>('FIREBASE_CREDENTIAL_PROJECT_ID'),
    private_key_id: configService.get<string>(
      'FIREBASE_CREDENTIAL_PRIVATE_KEY_ID',
    ),
    private_key: configService.get<string>('FIREBASE_CREDENTIAL_PRIVATE_KEY'),
    client_email: configService.get<string>('FIREBASE_CREDENTIAL_CLIENT_EMAIL'),
    client_id: configService.get<string>('FIREBASE_CREDENTIAL_CLIENT_ID'),
    auth_uri: configService.get<string>('FIREBASE_CREDENTIAL_AUTH_URL'),
    token_uri: configService.get<string>('FIREBASE_CREDENTIAL_TOKEN_URL'),
    auth_provider_x509_cert_url: configService.get<string>(
      'FIREBASE_CREDENTIAL_AUTH_PROVIDER',
    ),
    client_x509_cert_url: configService.get<string>(
      'FIREBASE_CREDENTIAL_CLIENT_CERT_URL',
    ),
  } as firebase.ServiceAccount;

  const options = {
    apiKey: configService.get<string>('FIREBASE_API_KEY'),
    authDomain: configService.get<string>('FIREBASE_AUTH_DOMAIN'),
    databaseURL: configService.get<string>('FIREBASE_DATABASE_URL'),
    projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
    storageBucket: configService.get<string>('FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: configService.get<string>('FIREBASE_MESSAGE_SENDER_ID'),
    appId: configService.get<string>('FIREBASE_APP_ID'),
    measurementId: configService.get<string>('FIREBASE_MEASUREMENT_ID'),
    credential: firebase.credential.cert(credential),
  };

  return { options };
};
