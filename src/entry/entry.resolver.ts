import {
  Resolver,
  Query,
  Args,
  Mutation,
  ArgsOptions,
  Parent,
  ResolveProperty,
} from '@nestjs/graphql';
import { EntryInterface } from 'src/schemas/entry.schema';
import { EntryService } from 'src/entry/entry.service';
import { PagedDto } from 'src/common/DTO/PagedDto';
import { SaveEntryDto, SaveEntryArgs } from 'src/entry/DTO/SaveEntryDto';
import { GenericIdDto } from 'src/common/DTO/GenericIdDto';
import { Root } from 'type-graphql';
import { UseGuards, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/Auth.guard';
import { RolesGuard } from 'src/common/guards/Roles.guard';
import { CurrentUser } from 'src/common/decorators/CurrentUser';
import { User } from 'src/common/types/FirebaseUser';

@Resolver((of) => EntryInterface)
export class EntryResolver {
  constructor(private readonly entryService: EntryService) {}

  @Query((returns) => [EntryInterface])
  async allEntries(@Args() pagedDto: PagedDto) {
    return this.entryService.getPaged(pagedDto.limit, pagedDto.offset);
  }

  @Query((returns) => EntryInterface)
  async getEntryWithId(@Args() genericId: GenericIdDto) {
    return this.entryService.findById(genericId.id);
  }

  @Query((returns) => [EntryInterface])
  async getEntriesWithTag(
    @Args({
      type: () => [String],
      name: 'tags',
    })
    tags: string[],
    @Args() pagedDto: PagedDto,
  ) {
    return this.entryService.findByTags(tags, pagedDto.limit, pagedDto.offset);
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => EntryInterface)
  async createEntry(@CurrentUser() user: User) {
    if (!user.author) {
      throw new ForbiddenException(
        'You have to be an author to publish entries',
      );
    }
    return this.entryService.createNew(user.author.id);
  }

  @Mutation((returns) => EntryInterface)
  async saveEntry(
    @Args() genericId: GenericIdDto,
    @Args(SaveEntryArgs) input: SaveEntryDto,
  ) {
    return this.entryService.saveEntry(genericId.id, input);
  }

  // @Mutation(returns => EntryInterface)
  // async deleteEntry(@Args() genericIdDto: GenericIdDto) {

  // }

  @ResolveProperty()
  async author(@Root() entry: EntryInterface) {
    const author = (await entry.populate('author').execPopulate()).author;
    return author;
  }
}
