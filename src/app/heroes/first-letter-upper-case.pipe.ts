import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'firstLetterUpperCase'
})
export class FirstLetterUpperCasePipe implements PipeTransform {

    transform(value: string): string {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

}
