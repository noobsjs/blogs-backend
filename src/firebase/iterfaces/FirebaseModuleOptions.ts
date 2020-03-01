import * as firebase from "firebase-admin";

export interface FirebaseModuleOptions {
  options?: firebase.AppOptions;
  name?: string;
}
