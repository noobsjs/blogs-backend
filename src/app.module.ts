import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EntryModule } from './entry/entry.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017', {
      user: "root",
      pass: "123456",
      dbName: "noobsjs",
      useNewUrlParser: true,
      useUnifiedTopology: true
    }), 
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: true,
    }),
    EntryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
