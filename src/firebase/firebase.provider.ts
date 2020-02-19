import { Injectable, Inject } from "@nestjs/common";
import * as firebase from 'firebase-admin'
import admin = require("firebase-admin");

@Injectable()
export class FirebaseProvider {
  private readonly firebaseAdmin: firebase.app.App

  constructor(
    @Inject("FIREBASE_CONFIG") private readonly firebaseConfig: { options?: firebase.AppOptions, name?: string }
  ) {
    const { options, name } = firebaseConfig
    firebase.initializeApp(options, name)
    this.firebaseAdmin = firebase.app()
  }
  
  getInstance() {
    return this.firebaseAdmin
  }
}