import { Resolver, Query, Mutation, ResolveProperty, Args } from '@nestjs/graphql';
import { AuthorInterface } from 'src/schemas/author.schema';
import { AuthorService } from 'src/author/author.service';
import { Root } from 'type-graphql';
import { EntryService } from 'src/entry/entry.service';
import { createAuthorArgs, CreateAuthorDto } from 'src/author/DTO/CreateAuthorDto';
import { AuthGuard } from 'src/common/guards/Auth.guard';
import { UseGuards, Req, ConflictException, NotFoundException } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/CurrentUser';
import { FirebaseProvider } from 'src/firebase/firebase.provider';
import { User } from 'src/common/types/FirebaseUser';
import { saveAuhorArgs, SaveAuthorDto } from 'src/author/DTO/SaveAuthorDto';

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

  @UseGuards(AuthGuard)
  @Mutation(returns => AuthorInterface)
  async createAuthor(@CurrentUser() user: User, @Args(createAuthorArgs) createAuthorArgs: CreateAuthorDto) {
    if (user.author) {
      throw new ConflictException("There is already an author associated with the user")
    }
    return this.authorService.createAuthor(user.firebase.uid, createAuthorArgs)
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => AuthorInterface)
  async editSelf(@CurrentUser() user: User, @Args(saveAuhorArgs) saveAuhorArgs: SaveAuthorDto) {
    if (!user.author) {
      throw new NotFoundException("There is no author associated with the user")
    }
    return this.authorService.saveAuthor(user.author.id, saveAuhorArgs)
  }

  @ResolveProperty()
  async entries(@Root() author: AuthorInterface) {
    const entries = this.entryService.getByAuthor(author.id)
    return entries
  }
}
