import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hcDefaultValue',
})
export class DefaultValuePipe implements PipeTransform {
  constructor(private cdr: ChangeDetectorRef) {}

  transform(input: any, defaultValue: any) {
    setTimeout(() => {
      this.cdr.markForCheck();
    });
    return input ?? defaultValue;
  }
}
