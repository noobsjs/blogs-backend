import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { FirebaseOptionsFactory } from 'src/firebase/iterfaces/FirebaseOptionsFactory';
import { FirebaseModuleOptions } from 'src/firebase/iterfaces/FirebaseModuleOptions';

export interface FirebaseModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<FirebaseOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<FirebaseModuleOptions> | FirebaseModuleOptions;
}
