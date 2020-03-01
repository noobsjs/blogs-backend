import { InputType, Field } from 'type-graphql';
import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ArgsOptions } from '@nestjs/graphql';
import nullableConst from 'src/common/utils/nullableConst';

@InputType()
export class SaveEntryDto {
  @Field((type) => String)
  @IsString()
  readonly title: string;

  @Field((type) => String, nullableConst)
  @IsOptional()
  @IsString()
  readonly description: string;

  @Field((type) => String, nullableConst)
  @IsOptional()
  @IsString()
  readonly headPic: string;

  @Field((type) => Boolean, nullableConst)
  @IsOptional()
  @IsBoolean()
  readonly isPublicated: boolean;

  @Field((type) => String, nullableConst)
  @IsOptional()
  @IsString()
  readonly fullBody: string;

  @Field((type) => [String], nullableConst)
  @IsOptional()
  @IsString({
    each: true,
  })
  readonly tags: string[];
}

/* tslint:disable-next-line variable-name */
export const SaveEntryArgs = {
  type: () => SaveEntryDto,
  name: 'input',
} as ArgsOptions;
