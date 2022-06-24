import { AnyEntity, FilterQuery } from '@mikro-orm/core';

// TODO Create FactoryBase class that will get injected on the constructor the entity manager, that will store all the retrieved data, and that will create the entities.
// TODO when used inside the seeder class will just get the entity manager from the init function or something
/** Checks if there are already entities with those unique properties in the database, and if there are some, they will not be repopulated */
export async function filterDefinedUniqueEntities<
  TCreate extends Record<string, any>,
  K extends keyof TCreate,
  R extends { find: (where: FilterQuery<any>) => Promise<any[]> },
  MapFn extends (entity: TCreate, idx: number) => any | Promise<any>
>(repository: R, entity: TCreate[], uniqueProperties: K[], mapFn: MapFn) {
  const findObj: FilterQuery<any> = {
    $or: [],
  };

  uniqueProperties.forEach((property) => {
    findObj.$or.push({ [property]: { $in: entity.map((x) => x[property]) } });
  });

  const dbTeams = await repository.find(findObj);
  const entities = entity.filter(
    (x) => !dbTeams.some((y) => uniqueProperties.some((property) => (y as any)[property] === x[property]))
  );

  const mappedEntities = entities.map(async (x, idx) => await mapFn(x, idx)) as ReturnType<MapFn>[];
  return [...(await Promise.all(mappedEntities)), ...dbTeams].sort(
    (a, b) => a[uniqueProperties[0] ?? 'id'] - b[uniqueProperties[0] ?? 'id']
  ) as Awaited<ReturnType<MapFn>>[];
}
