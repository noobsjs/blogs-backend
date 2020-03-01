import { InputType, Field } from 'type-graphql';
import nullableConst from 'src/common/utils/nullableConst';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class AuthorSocialNetworksDto {
  @Field((type) => String, nullableConst)
  @IsOptional()
  @IsString()
  facebook?: string;

  @Field((type) => String, nullableConst)
  @IsOptional()
  @IsString()
  twitter?: string;

  @Field((type) => String, nullableConst)
  @IsOptional()
  @IsString()
  linkedin?: string;
}
