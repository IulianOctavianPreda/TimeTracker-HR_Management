import { ClassConstructor, ClassTransformOptions, plainToInstance } from 'class-transformer';

type OrArray<T> = T extends Array<T> ? T[] : T;
type IfArray<A, B> = A extends Array<any> ? B[] : B;

export function objToInstance<T, V extends OrArray<any>>(
  cls: ClassConstructor<T>,
  plain: V,
  options?: ClassTransformOptions
): IfArray<V, T> {
  return plainToInstance<T, V>(cls, plain, { ...options, enableCircularCheck: true }) as IfArray<V, T>;
}
