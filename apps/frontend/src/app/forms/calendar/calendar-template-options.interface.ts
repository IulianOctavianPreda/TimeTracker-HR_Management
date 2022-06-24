import { FormlyTemplateOptions } from '@ngx-formly/core';
import { Observable } from 'rxjs';

export interface ICalendarTemplateOptions extends FormlyTemplateOptions {
  values?: Date[];
  values$?: Observable<Date[]>;
  inline?: boolean;
  showTime?: boolean;
  timeOnly?: boolean;
}
