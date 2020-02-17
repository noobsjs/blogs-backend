import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import deepMap from 'deep-map'

@Injectable()
export class ParseIntPipe implements PipeTransform<any> {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (['query', 'param'].includes(metadata.type)) {
      const parsed = deepMap(value, val => {
        if (!isNaN(val)) {
          return parseInt(val, 10)
        } else {
          return val
        }
      })
     return parsed

    }
    return value
  }
}