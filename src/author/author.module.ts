import { Module, Global } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorResolver } from './author.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { AUTHOR_MODEL, AuthorSchema } from 'src/schemas/author.schema';
import { EntryModule } from 'src/entry/entry.module';

@Global()
@Module({
  providers: [AuthorService, AuthorResolver],
  imports: [
    MongooseModule.forFeature([
      {
        name: AUTHOR_MODEL,
        schema: AuthorSchema,
      },
    ]),
    EntryModule,
  ],
  exports: [AuthorService],
})
export class AuthorModule {}
