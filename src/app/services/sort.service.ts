import { Injectable } from '@angular/core';
import { Champion } from "app/classes/champion";
// inspiration for having a service
// http://stackoverflow.com/questions/35534959/access-key-and-value-of-object-using-ngfor

@Injectable()
export class SortService {

  constructor() { }

  // http://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
  ascending(a, b) {
    console.log(a);
    console.log(b);
    let nameA = a.toLowerCase(), nameB = b.toLowerCase();
    if (nameA < nameB) return -1; // sort string ascending
    if (nameA > nameB) return 1;
    return 0; // default return value (no sorting)
  };

  ascendingChampions(a: Champion, b: Champion) {
    let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
    console.warn(nameA + ',' + nameB);

    if (nameA < nameB) return -1; // sort string ascending
    if (nameA > nameB) return 1;
    return 0; // default return value (no sorting)
  };

  ascendingChampMap(a, b) {
    // console.log(a);
    let nameA = a[1].name.toLowerCase(), nameB = b[1].name.toLowerCase();
    if (nameA < nameB) return -1; // sort string ascending
    if (nameA > nameB) return 1;
    return 0; // default return value (no sorting)
  }
}
