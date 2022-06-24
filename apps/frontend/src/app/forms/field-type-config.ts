import { FieldType, FormlyTemplateOptions } from '@ngx-formly/core';

import { IFieldTypeConfig } from './field-type-config.interface';

export class FieldTypeConfig<T extends FormlyTemplateOptions> extends FieldType<IFieldTypeConfig<T>> {
  // @ts-ignore
  get to() {
    return this.field.templateOptions;
  }
}
