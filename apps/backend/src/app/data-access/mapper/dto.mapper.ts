import { Collection } from '@mikro-orm/core';

export async function mapToDto<T extends Record<string, any>, V extends Record<string, any>>(
  data: V,
  constructor: new () => T
): Promise<T> {
  const dto = new constructor();
  // override values with the collection as array
  await Promise.allSettled(
    Object.entries(data).map(async ([key, value]) => {
      let valueDto = value;
      if (value instanceof Collection) {
        await value.init();
        valueDto = value.toArray();
      }

      (dto as any)[key] = valueDto;
    })
  );

  return dto;
}
