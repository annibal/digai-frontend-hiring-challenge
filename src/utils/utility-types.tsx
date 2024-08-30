export type Constructor<T> = new (...args: any[]) => T;
export type Class<T> = InstanceType<Constructor<T>>;
export type Func<TReturn> = (...args: any[]) => TReturn;
export type OverrideReturn<TFunction extends Func<unknown>, TNewReturn> = (...a: Parameters<TFunction>) => TNewReturn;

