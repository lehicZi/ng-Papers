import { Pipe, PipeTransform } from "@angular/core";
import { Video } from "../video/model/video.model";

@Pipe({
  name: "hourMin"
})
export class HourMinPipe  implements PipeTransform {

  transform(value: number): string {
    return `${Math.floor(value/60)} h et ${value%60} min`
 }
}
