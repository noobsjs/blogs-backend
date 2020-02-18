import { Resolver, Query, Args, Mutation, ArgsOptions, Parent, ResolveProperty } from '@nestjs/graphql';
import { EntryInterface } from 'src/schemas/entry.schema';
import { EntryService } from 'src/entry/entry.service';
import { PagedDto } from 'src/common/DTO/PagedDto';
import { SaveEntryDto, SaveEntryArgs } from 'src/entry/DTO/SaveEntryDto';
import { GenericIdDto } from 'src/common/DTO/GenericIdDto';
import { FieldResolver, Root } from 'type-graphql';
import { AuthorInterface, AUTHOR_MODEL } from 'src/schemas/author.schema';

@Resolver(of => EntryInterface)
export class EntryResolver {

  constructor(
    private readonly entryService: EntryService
  ) {}

  @Query(returns => [EntryInterface])
  async Entries(@Args() pagedDto: PagedDto) {
    return this.entryService.getPaged(pagedDto.limit, pagedDto.offset)
  }

  @Query(returns => EntryInterface)
  async Entry(@Args() genericId: GenericIdDto) {
    return this.entryService.findById(genericId.id)
  }

  @Mutation(returns => EntryInterface)
  async createEntry() {
    return this.entryService.createNew()
  }

  @Mutation(returns => EntryInterface)
  async saveEntry(@Args() genericId: GenericIdDto, @Args(SaveEntryArgs) input: SaveEntryDto) {
    return this.entryService.saveEntry(genericId.id, input)
  }

  @Mutation(returns => EntryInterface)
  async deleteEntry(@Args() genericIdDto: GenericIdDto) {
    
  }

  @ResolveProperty()
  async author(@Root() entry: EntryInterface) {
    const author = (await entry.populate('author').execPopulate()).author
    return author
  }

}
