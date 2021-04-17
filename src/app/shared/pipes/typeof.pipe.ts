import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'typeof'})
export class TypeOfPipe implements PipeTransform {
  transform(value): string {
    return typeof value;
  }
}