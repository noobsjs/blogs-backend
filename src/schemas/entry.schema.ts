import * as mongoose from "mongoose";
import { ObjectType, Field } from "type-graphql";
import nullableConst from "src/common/utils/nullableConst";
import { GraphQLDateTime } from "graphql-iso-date";

export const EntrySchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    headPic: String,
    isPublicated: {
      type: Boolean,
      default: false
    },
    publicationDate: Date,
    fullBody: String,
    tags: [String]
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  }
);

@ObjectType()
export class EntryInterface extends mongoose.Document {
  @Field(type => String)
  id: string;

  @Field(type => String, nullableConst)
  title: string;

  @Field(type => String, nullableConst)
  description: string;

  @Field(type => String, nullableConst)
  headPic: string;

  @Field(type => Boolean)
  isPublicated: boolean;

  @Field(type => GraphQLDateTime, nullableConst)
  publicationDate: string;

  @Field(type => String, nullableConst)
  fullBody: string;

  @Field(type => [String], {
    defaultValue: []
  })
  tags: string[]

  @Field(type => GraphQLDateTime)
  createdAt: string;

  @Field(type => GraphQLDateTime)
  updatedAt: string;
}

export const ENTRY_MODEL = "ENTRY_MODEL";
