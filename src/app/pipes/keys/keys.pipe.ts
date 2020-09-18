import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value): any {
    const keys = [];
    for (const key in value) {
      keys.push(key);
    }
    return keys;
  }
}
