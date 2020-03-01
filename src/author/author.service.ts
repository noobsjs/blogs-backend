import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthorInterface, AUTHOR_MODEL } from 'src/schemas/author.schema';
import { CreateAuthorDto } from 'src/author/DTO/CreateAuthorDto';

import mergeIfNotNull from 'src/common/utils/mergeIfNotNull';
import { SaveAuthorDto } from 'src/author/DTO/SaveAuthorDto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(AUTHOR_MODEL)
    private readonly authorSchema: Model<AuthorInterface>,
  ) {}

  async findAll() {
    return this.authorSchema
      .find()
      .populate('socialNetwork')
      .exec();
  }

  async findByUid(uid: string) {
    return this.authorSchema
      .findOne({
        uid,
      })
      .populate('socialNetwork')
      .exec();
  }

  async createAuthor(userId: string, newAuthorDto: CreateAuthorDto) {
    const newAuthor = { ...newAuthorDto, uid: userId };

    const createdAuthor = new this.authorSchema();
    mergeIfNotNull(createdAuthor, newAuthor);

    await createdAuthor.save();
    return createdAuthor;
  }

  async saveAuthor(id: string, newAuthorDto: SaveAuthorDto) {
    const createdAuthor = new this.authorSchema();
    mergeIfNotNull(createdAuthor, newAuthorDto);

    await createdAuthor.save();
    return createdAuthor;
  }
}
