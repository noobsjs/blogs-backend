import { Injectable, Inject } from "@nestjs/common";
import * as firebase from "firebase-admin";
import admin = require("firebase-admin");
import { FirebaseModuleOptions } from "src/firebase/iterfaces/FirebaseModuleOptions";

@Injectable()
export class FirebaseProvider {
  private readonly firebaseAdmin: firebase.app.App;

  constructor(
    @Inject("FIREBASE_CONFIG")
    private readonly firebaseConfig: FirebaseModuleOptions
  ) {
    const { options, name } = firebaseConfig;
    firebase.initializeApp(options, name);
    this.firebaseAdmin = firebase.app();
  }

  getInstance() {
    return this.firebaseAdmin;
  }
}
