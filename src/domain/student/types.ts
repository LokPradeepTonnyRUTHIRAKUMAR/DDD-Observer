export type Brand<K, T> = K & { __brand: T }

export type Rank = Brand<number, "rank">
