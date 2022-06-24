export function mergeObject(obj1: Record<string, any>, obj2: Record<string, any>) {
  for (const key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (typeof obj2[key] === 'object') {
        mergeObject(obj1[key], obj2[key]);
      } else {
        obj1[key] = obj2[key];
      }
    }
  }
  return obj1;
}

export function removeDuplicateObjects<T extends Record<string, any>>(objArr: T[], discriminator = 'id'): T[] {
  return objArr.filter(
    (value, index, self) => index === self.findIndex((t) => t[discriminator] === value[discriminator])
  );
}
