import * as mongoose from "mongoose";
import { ObjectType, Field } from "type-graphql";
import { GraphQLDateTime } from "graphql-iso-date";
import nullableConst from "src/common/utils/nullableConst";
import { EntryInterface } from "src/schemas/entry.schema";

export const AuthorSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    salt: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    name: String,
    description: String,
    avatar: String,
    joinDate: Date,
    socialNetworks: {
      type: {
        facebook: String,
        twitter: String,
        linkedin: String
      },
      default: {}
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    }
  }
);

@ObjectType()
export class AuthorSocialNetworks {
  @Field(type => String, nullableConst)
  facebook?: string
  
  @Field(type => String, nullableConst)
  twitter?: string

  @Field(type => String, nullableConst)
  linkedin?: string
}

@ObjectType()
export class AuthorInterface extends mongoose.Document {
  @Field(type => String)
  id: string;

  @Field(type => String)
  username: string;

  @Field(type => String)
  name: string

  @Field(type => String)
  description: string

  @Field(type => String)
  avatar: string

  @Field(type => GraphQLDateTime)
  joinDate: string

  @Field(type => AuthorSocialNetworks, {defaultValue: {}})
  socialNetworks: AuthorSocialNetworks

  @Field(type => [EntryInterface], { defaultValue: [] })
  entries: EntryInterface[]
}

export const AUTHOR_MODEL = "AUTHOR_MODEL";
