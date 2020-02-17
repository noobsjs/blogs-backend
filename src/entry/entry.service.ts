import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntryInterface, ENTRY_MODEL } from '../schemas/entry.schema'
import { SaveEntryDto } from 'src/entry/DTO/SaveEntryDto';
import * as sanitizeHtml from 'sanitize-html'

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

  async findById(postId: string) {
    return this.entrySchema.findById(postId).exec()
  }

  async createNew(): Promise<EntryInterface> {
    const entry = new this.entrySchema({
      isPublicated: false
    })
    
    return entry.save();
  }

  async saveEntry(id: string, entry: SaveEntryDto) {
    const oldEntry = await this.entrySchema.findById(id).exec();
    for (const key in entry) {
      if (entry[key] !== undefined && entry[key] !== null) {
        oldEntry[key] = entry[key]
      }
    }

    if (!oldEntry.publicationDate && entry.isPublicated) oldEntry.publicationDate = new Date().toISOString()
    if (entry.fullBody) oldEntry.fullBody = sanitizeHtml(entry.fullBody, { disallowedTagsMode: "recursiveEscape" })
    return oldEntry.save();
  }
}
