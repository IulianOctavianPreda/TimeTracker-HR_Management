import { ICalendarTemplateOptions } from './calendar/calendar-template-options.interface';
import { IFieldConfig } from './field-type-config.interface';

export function createCalendar(
  key: string,
  templateOptions?: ICalendarTemplateOptions
): IFieldConfig<ICalendarTemplateOptions> {
  const type = templateOptions?.inline ? 'inline-calendar' : 'calendar';
  return {
    key,
    type,
    templateOptions: {
      ...templateOptions,
    },
  };
}
