import { Resolver, Query, Mutation, ResolveProperty, Args } from '@nestjs/graphql';
import { AuthorInterface } from 'src/schemas/author.schema';
import { AuthorService } from 'src/author/author.service';
import { Root } from 'type-graphql';
import { EntryService } from 'src/entry/entry.service';
import { createAuthorArgs, CreateAuthorDto } from 'src/author/DTO/CreateAuthorDto';

@Resolver(of => AuthorInterface)
export class AuthorResolver {

  constructor(
    private readonly authorService: AuthorService,
    private readonly entryService: EntryService
  ) {}

  @Query(returns => [AuthorInterface])
  async Authors() {
    return this.authorService.findAll()
  }

  @Mutation(returns => AuthorInterface)
  async createAuthor(@Args(createAuthorArgs) createAuthorArgs: CreateAuthorDto) {
    return this.authorService.createAuthor(createAuthorArgs)
  }

  @ResolveProperty()
  async entries(@Root() author: AuthorInterface) {
    const entries = this.entryService.getByAuthor(author.id)
    return entries
  }
}
