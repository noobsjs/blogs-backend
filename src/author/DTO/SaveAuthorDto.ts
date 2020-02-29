import { Field, InputType } from "type-graphql";
import { IsString, IsOptional, IsObject } from "class-validator";
import nullableConst from "src/common/utils/nullableConst";
import { AuthorSocialNetworksDto } from "src/author/DTO/AuthorSocialNetworksDto";
import { ArgsOptions } from "@nestjs/graphql";

@InputType()
export class SaveAuthorDto {

  @Field(type => String, nullableConst)
  @IsOptional()
  @IsString()
  name: string;

  @Field(type => String, nullableConst)
  @IsOptional()
  @IsString()
  description: string;

  @Field(type => String, nullableConst)
  @IsOptional()
  @IsString()
  avatar: string;

  @Field(type => AuthorSocialNetworksDto, nullableConst)
  @IsOptional()
  @IsObject()
  socialNetworks: AuthorSocialNetworksDto;
}

export const saveAuhorArgs = {
  name: 'saveAuthorArgs',
  type: () => SaveAuthorDto
} as ArgsOptions