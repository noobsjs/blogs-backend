import { Module } from '@nestjs/common';
import { EntryService } from './entry.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ENTRY_MODEL, EntrySchema } from 'src/schemas/entry.schema';
import { EntryResolver } from './entry.resolver';

@Module({
  providers: [EntryService, EntryResolver],
  imports: [MongooseModule.forFeatureAsync([
    {
      name: ENTRY_MODEL,
      useFactory: () => {
        const schema = EntrySchema;
        return schema;
      },
    }
  ])]
})
export class EntryModule {}
