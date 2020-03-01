import * as firebase from 'firebase-admin';
import { AuthorInterface } from 'src/schemas/author.schema';

export interface User {
  firebase: firebase.auth.UserRecord;
  author?: AuthorInterface;
}
