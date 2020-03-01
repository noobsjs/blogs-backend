import { FirebaseModuleOptions } from "src/firebase/iterfaces/FirebaseModuleOptions";

export interface FirebaseOptionsFactory {
  createFirebaseOptions():
    | Promise<FirebaseModuleOptions>
    | FirebaseModuleOptions;
}
