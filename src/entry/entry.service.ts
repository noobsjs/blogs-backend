import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntryInterface, ENTRY_MODEL } from '../schemas/entry.schema'
import { SaveEntryDto } from 'src/entry/DTO/SaveEntryDto';
import * as sanitizeHtml from 'sanitize-html'
import mergeIfNotNull from 'src/common/utils/mergeIfNotNull';

@Injectable()
export class EntryService {
  constructor(
    @InjectModel(ENTRY_MODEL) private readonly entrySchema: Model<EntryInterface>
  ) { }

  async getPaged(limit = 10, offset = 0): Promise<EntryInterface[]> {
    const data = await this.entrySchema.find({
      isPublicated: true
    }).skip(offset).limit(limit).exec()

    return data
  }

  async getByAuthor(authorId: string, limit = 10, offset = 0): Promise<EntryInterface[]> {
    const data = await this.entrySchema.find({
      author: authorId
    }).skip(offset).limit(limit).exec()

    return data
  }

  async findById(postId: string) {
    return this.entrySchema.findById(postId).exec()
  }

  async findByTags(tags: string[], limit = 10, offset = 0): Promise<EntryInterface[]> {
    return this.entrySchema.find({
      tags: {
        $in: tags
      }
    }).skip(offset).limit(limit).exec()
  }

  async createNew(authorId: string): Promise<EntryInterface> {
    const entry = new this.entrySchema({
      isPublicated: false,
      author: authorId
    })
    
    return entry.save();
  }

  async saveEntry(id: string, entry: SaveEntryDto) {
    const oldEntry = await this.entrySchema.findById(id).exec();
    mergeIfNotNull(oldEntry, entry)

    if (!oldEntry.publicationDate && entry.isPublicated) oldEntry.publicationDate = new Date().toISOString()
    if (entry.fullBody) oldEntry.fullBody = sanitizeHtml(entry.fullBody, { disallowedTagsMode: "recursiveEscape" })
    return oldEntry.save();
  }
}
