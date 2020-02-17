import { ArgsType, Field, Int } from "type-graphql";
import { Min, IsInt, IsOptional } from "class-validator";

@ArgsType()
export class PagedDto {
  @Field(type => Int, {
    nullable: true
  })
  @IsOptional()
  @Min(1)
  readonly limit: number;

  @Field(type => Int, {
    nullable: true
  })
  @IsOptional()
  @Min(0)
  readonly offset: number;
}