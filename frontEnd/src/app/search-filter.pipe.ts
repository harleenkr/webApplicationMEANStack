import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (!args) {
      return value;
    } else {
      args = args;
    }

    console.log("value", value);

    if (value !== undefined) {
      return value.filter(items => {
        (items.name.startsWith(args) == true || items.email.startsWith(args) == true)
      });
    }
  }

}
