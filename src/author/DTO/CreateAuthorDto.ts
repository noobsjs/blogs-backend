import { Field, InputType } from "type-graphql";
import { IsString, IsOptional, IsObject, MinLength, Length, IsEmail, Matches } from "class-validator";
import nullableConst from "src/common/utils/nullableConst";
import { ArgsOptions } from "@nestjs/graphql";

@InputType()
class AuthorSocialNetworksDto {
  @Field(type => String, nullableConst)
  @IsOptional()
  @IsString()
  facebook?: string
  
  @Field(type => String, nullableConst)
  @IsOptional()
  @IsString()
  twitter?: string

  @Field(type => String, nullableConst)
  @IsOptional()
  @IsString()
  linkedin?: string
}

@InputType()
export class CreateAuthorDto {

  @Field(type => String, nullableConst)
  @IsOptional()
  @IsString()
  name: string

  @Field(type => String, nullableConst)
  @IsOptional()
  @IsString()
  description: string

  @Field(type => String, nullableConst)
  @IsOptional()
  @IsString()
  avatar: string

  @Field(type => AuthorSocialNetworksDto, nullableConst)
  @IsOptional()
  @IsObject()
  socialNetworks: AuthorSocialNetworksDto
}

export const createAuthorArgs: ArgsOptions = {
  type: () => CreateAuthorDto,
  name: "input"
}