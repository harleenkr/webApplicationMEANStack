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
        console.log("items in value", items);
        console.log("items.name.startsWith(args)", items.name.startsWith(args));
        console.log("items.email.startsWith(args)", items.email.startsWith(args));
        (items.name.startsWith(args) == true || items.email.startsWith(args) == true)
      });
    }
  }

}
