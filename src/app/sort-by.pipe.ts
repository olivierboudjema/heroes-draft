import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
  transform(array: any[], field: string, reverse: boolean): any[] {
    if (!array || !field) {
      return array;
    }
    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return reverse ? 1 : -1;
      } else if (a[field] > b[field]) {
        return reverse ? -1 : 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
