import { FieldTypeConfig, FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';

export interface IFieldTypeConfig<T extends FormlyTemplateOptions> extends FieldTypeConfig {
  templateOptions: T;
}

export interface IFieldConfig<T extends FormlyTemplateOptions> extends FormlyFieldConfig {
  templateOptions: T;
}
