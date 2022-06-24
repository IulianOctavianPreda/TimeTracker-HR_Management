import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { convertMsToHM } from '@shared';

@Pipe({
  name: 'hcTimeDuration',
})
export class TimeDurationPipe implements PipeTransform {
  constructor() {}

  transform(input: number) {
    return convertMsToHM(input);
  }
}
