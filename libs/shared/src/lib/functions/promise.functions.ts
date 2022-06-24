export async function asyncMap<T, U>(array: T[], callback: (item: T, index: number, array: T[]) => Promise<U>) {
  return Promise.all(array.map(async (item) => await callback(item, array.indexOf(item), array)));
}
