import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule, MongooseModuleOptions } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EntryModule } from "./entry/entry.module";
import { AuthorModule } from "./author/author.module";
import { FirebaseModule } from "./firebase/firebase.module";
import firebaseConfig from "src/config/firebase-config";
import firebaseCredential from "src/config/firebase-credential";
import * as firebase from "firebase-admin";
import {
  GetMongoConfig,
  GetGraphLQConfig,
  GetFirebaseConfig
} from "src/common/utils/configObjectBuildets";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return GetMongoConfig(configService);
      },
      inject: [ConfigService]
    }),
    GraphQLModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return GetGraphLQConfig(configService);
      },
      inject: [ConfigService]
    }),
    FirebaseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return GetFirebaseConfig(configService);
      },
      inject: [ConfigService]
    }),
    EntryModule,
    AuthorModule,
    FirebaseModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
