import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EntryModule } from './entry/entry.module';
import { AuthorModule } from './author/author.module';
import { FirebaseModule } from './firebase/firebase.module';
import firebaseConfig from 'src/config/firebase-config';
import firebaseCredential from 'src/config/firebase-credential';
import * as firebase from 'firebase-admin'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: "noobsjs",
      useNewUrlParser: true,
      useUnifiedTopology: true
    }), 
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: true,
      context: ({ req }) => ({ req })
    }),
    FirebaseModule.forRoot({...firebaseConfig, credential: firebase.credential.cert(firebaseCredential)}),
    EntryModule,
    AuthorModule,
    FirebaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
