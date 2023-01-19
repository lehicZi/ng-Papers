import { Pipe, PipeTransform } from "@angular/core";
import { Video } from "../video/model/video.model";

@Pipe({
  name: "sort"
})
export class PipePipe  implements PipeTransform {

  transform(array: any, field: string) {
    
    if (!Array.isArray(array)) {
      return;
    }
    
    const sorted = array.slice()
    sorted.sort((a: any, b: any) => {
      if (a[field].toLowerCase() < b[field].toLowerCase()) {
        return -1;
      } else if (a[field].toLowerCase() > b[field].toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
    return sorted;
  }
}
