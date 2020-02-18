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
  @Field(type => String)
  @IsString()
  @Length(4, 30)
  username: string

  @Field(type => String)
  @IsString()
  @MinLength(8)
  @Matches(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/) // Secure password
  password: string

  @Field(type => String)
  @IsEmail()
  @Length(10, 60)
  email: string

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