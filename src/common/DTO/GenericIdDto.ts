import { IsMongoId } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class GenericIdDto {
  @Field((type) => String)
  @IsMongoId()
  readonly id: string;
}
