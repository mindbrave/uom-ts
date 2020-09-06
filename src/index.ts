type Exponent = -6 | -5 | -4 | -3 | -2 | -1 | 1 | 2 | 3 | 4 | 5 | 6 | undefined;

type NegativeExponent<T extends Exponent> = (
    T extends -6 ? 6 :
    T extends -5 ? 5 :
    T extends -4 ? 4 :
    T extends -3 ? 3 :
    T extends -2 ? 2 :
    T extends -1 ? 1 :
    T extends 1 ? -1 :
    T extends 2 ? -2 :
    T extends 3 ? -3 :
    T extends 4 ? -4 :
    T extends 5 ? -5 :
    T extends 6 ? -6 :
    undefined
);
type SumExponents<A extends Exponent, B extends Exponent> = (
    A extends -6 ? (
        B extends undefined ? -6 :
        B extends 1 ? -5 :
        B extends 2 ? -4 :
        B extends 3 ? -3 :
        B extends 4 ? -2 :
        B extends 5 ? -1 :
        B extends 6 ? undefined :
        never
    ) :
    A extends -5 ? (
        B extends -1 ? -6 :
        B extends undefined ? -5 :
        B extends 1 ? -4 :
        B extends 2 ? -3 :
        B extends 3 ? -2 :
        B extends 4 ? -1 :
        B extends 5 ? undefined :
        B extends 6 ? 1 :
        never
    ) :
    A extends -4 ? (
        B extends -2 ? -6 :
        B extends -1 ? -5 :
        B extends undefined ? -4 :
        B extends 1 ? -3 :
        B extends 2 ? -2 :
        B extends 3 ? -1 :
        B extends 4 ? undefined :
        B extends 5 ? 1 :
        B extends 6 ? 2 :
        never
    ) :
    A extends -3 ? (
        B extends -3 ? -6 :
        B extends -2 ? -5 :
        B extends -1 ? -4 :
        B extends undefined ? -3 :
        B extends 1 ? -2 :
        B extends 2 ? -1 :
        B extends 3 ? undefined :
        B extends 4 ? 1 :
        B extends 5 ? 2 :
        B extends 6 ? 3 :
        never
    ) :
    A extends -2 ? (
        B extends -4 ? -6 :
        B extends -3 ? -5 :
        B extends -2 ? -4 :
        B extends -1 ? -3 :
        B extends undefined ? -2 :
        B extends 1 ? -1 :
        B extends 2 ? undefined :
        B extends 3 ? 1 :
        B extends 4 ? 2 :
        B extends 5 ? 3 :
        B extends 6 ? 4 :
        never
    ) :
    A extends -1 ? (
        B extends -5 ? -6 :
        B extends -4 ? -5 :
        B extends -3 ? -4 :
        B extends -2 ? -3 :
        B extends -1 ? -2 :
        B extends undefined ? -1 :
        B extends 1 ? undefined :
        B extends 2 ? 1 :
        B extends 3 ? 2 :
        B extends 4 ? 3 :
        B extends 5 ? 4 :
        B extends 6 ? 5 :
        never
    ) :
    A extends undefined ? (
        B extends -6 ? -6 :
        B extends -5 ? -5 :
        B extends -4 ? -4 :
        B extends -3 ? -3 :
        B extends -2 ? -2 :
        B extends -1 ? -1 :
        B extends undefined ? undefined :
        B extends 1 ? 1 :
        B extends 2 ? 2 :
        B extends 3 ? 3 :
        B extends 4 ? 4 :
        B extends 5 ? 5 :
        B extends 6 ? 6 :
        never
    ) :
    A extends 1 ? (
        B extends -6 ? -5 :
        B extends -5 ? -4 :
        B extends -4 ? -3 :
        B extends -3 ? -2 :
        B extends -2 ? -1 :
        B extends -1 ? undefined :
        B extends undefined ? 1 :
        B extends 1 ? 2 :
        B extends 2 ? 3 :
        B extends 3 ? 4 :
        B extends 4 ? 5 :
        B extends 5 ? 6 :
        never
    ) :
    A extends 2 ? (
        B extends -6 ? -4 :
        B extends -5 ? -3 :
        B extends -4 ? -2 :
        B extends -3 ? -1 :
        B extends -2 ? undefined :
        B extends -1 ? 1 :
        B extends undefined ? 2 :
        B extends 1 ? 3 :
        B extends 2 ? 4 :
        B extends 3 ? 5 :
        B extends 4 ? 6 :
        undefined
    ) :
    A extends 3 ? (
        B extends -6 ? -3 :
        B extends -5 ? -2 :
        B extends -4 ? -1 :
        B extends -3 ? undefined :
        B extends -2 ? 1 :
        B extends -1 ? 2 :
        B extends undefined ? 3 :
        B extends 1 ? 4 :
        B extends 2 ? 5 :
        B extends 3 ? 6 :
        never
    ) :
    A extends 4 ? (
        B extends -6 ? -2 :
        B extends -5 ? -1 :
        B extends -4 ? undefined :
        B extends -3 ? 1 :
        B extends -2 ? 2 :
        B extends -1 ? 3 :
        B extends undefined ? 4 :
        B extends 1 ? 5:
        B extends 2 ? 6 :
        never
    ) :
    A extends 5 ? (
        B extends -6 ? -1 :
        B extends -5 ? undefined :
        B extends -4 ? 1 :
        B extends -3 ? 2 :
        B extends -2 ? 3 :
        B extends -1 ? 4 :
        B extends undefined ? 5 :
        B extends 1 ? 6 :
        never
    ) :
    A extends 6 ? (
        B extends -6 ? undefined :
        B extends -5 ? 1 :
        B extends -4 ? 2 :
        B extends -3 ? 3 :
        B extends -2 ? 4 :
        B extends -1 ? 5 :
        B extends undefined ? 6 :
        never
    ) :
    never
);

type DivideExponentsBy2<A extends Exponent> = (
    A extends -6 ? -3 :
    A extends -4 ? -2 :
    A extends -2 ? -1 :
    A extends 2 ? 1 :
    A extends 4 ? 2 :
    A extends 6 ? 3 :
    A extends undefined ? undefined :
    never
);

type SubtractExponents<A extends Exponent, B extends Exponent> = SumExponents<A, NegativeExponent<B>>;

type Exact<A extends object> = A & {__exactKeys: keyof A};

type ObjectWithExponents = {[key:string]: Exponent};
export type AnyUnit = number;

export type Unit<T extends ObjectWithExponents> = number & Exact<T>;

type KeysThatHaveNoGivenValue<T, V> = { [K in keyof T]: T[K] extends V ? never : K }[keyof T];
type RemovePropertiesWithGivenValue<T, V> = {[P in KeysThatHaveNoGivenValue<T, V>]: T[P]};

type AssertExponent<T> = T extends Exponent ? T : never;
type AssertObjectWithExponents<T extends object> = {[K in keyof T]: AssertExponent<T[K]>};

type SumExponentsOfTwoObjects<A, B> = {
    [P in (keyof A | keyof B)]: P extends keyof A ? (P extends keyof B ? SumExponents<AssertExponent<A[P]>, AssertExponent<B[P]>> : AssertExponent<A[P]>) : (P extends keyof B ? AssertExponent<B[P]> : undefined)
}
export type MultiplyUnits<A, B> = number & Exact<RemovePropertiesWithGivenValue<SumExponentsOfTwoObjects<A, B>, undefined>>;

type SubtractExponentsOfTwoObjects<A, B> = {
    [P in (keyof A | keyof B)]: P extends keyof A ? (P extends keyof B ? SubtractExponents<AssertExponent<A[P]>, AssertExponent<B[P]>> : AssertExponent<A[P]>) : (P extends keyof B ? NegativeExponent<AssertExponent<B[P]>> : undefined)
};
export type DivideUnits<A, B> = number & Exact<RemovePropertiesWithGivenValue<SubtractExponentsOfTwoObjects<A, B>, undefined>>;

export type SqrtUnit<A extends AnyUnit> = number & Exact<{
    [P in keyof A]: DivideExponentsBy2<AssertExponent<A[P]>>
}>;

export function add<T extends AnyUnit>(a: T, b: T): T;
export function add<T extends AnyUnit>(a: T): (b: T) => T;
export function add<T extends AnyUnit>(...args: T[]) {
    if (args.length === 2) {
        return (args[0] + args[1]) as T;
    };
    return (v: T): T => (args[0] + v) as T;
};

export function sub<T extends AnyUnit>(a: T, b: T): T;
export function sub<T extends AnyUnit>(a: T): (b: T) => T;
export function sub<T extends AnyUnit>(...args: T[]) {
    if (args.length === 2) {
        return (args[0] - args[1]) as T;
    };
    return (v: T): T => (v - args[0]) as T;
};

export function mul<A extends AnyUnit, B extends AnyUnit>(a: A, b: B): MultiplyUnits<A, B>;
export function mul<A extends AnyUnit>(a: A): <B extends AnyUnit>(b: B) => MultiplyUnits<A, B>;
export function mul<T extends AnyUnit>(...args: T[]) {
    if (args.length === 2) {
        return (args[0] * args[1]) as T;
    };
    return (v: T): T => (args[0] * v) as T;
};

export function div<A extends AnyUnit, B extends AnyUnit>(a: A, b: B): DivideUnits<A, B>;
export function div<A extends AnyUnit>(a: A): <B extends AnyUnit>(b: B) => DivideUnits<A, B>;
export function div<T extends AnyUnit>(...args: T[]) {
    if (args.length === 2) {
        return (args[0] / args[1]) as T;
    };
    return (v: T): T => (v / args[0]) as T;
};

export function mod<A extends AnyUnit>(a: A, b: A): A;
export function mod<A extends AnyUnit>(a: A): (b: A) => A;
export function mod<A extends AnyUnit>(...args: A[]) {
    if (args.length === 2) {
        return (args[0] % args[1]) as A;
    };
    return (v: A): A => (v % args[0]) as A;
};

export const pow2 = <A extends AnyUnit>(a: A): MultiplyUnits<A, A> => mul(a, a);
export const sqrt2 = <A extends AnyUnit>(a: A): SqrtUnit<A> => Math.sqrt(a) as SqrtUnit<A>;
export const negate = <A extends AnyUnit>(a: A): A => -a as A;
export const abs = <A extends AnyUnit>(a: A): A => Math.abs(a) as A;

export const floor = <A extends AnyUnit>(a: A): A => Math.floor(a) as A;
export const ceil = <A extends AnyUnit>(a: A): A => Math.ceil(a) as A;
export const round = <A extends AnyUnit>(a: A): A => Math.round(a) as A;

export function eq<A extends AnyUnit>(a: A, b: A): boolean;
export function eq<A extends AnyUnit>(a: A): (b: A) => boolean;
export function eq<T extends AnyUnit>(...args: T[]) {
    if (args.length === 2) {
        return args[0] === args[1]
    };
    return (v: T): boolean => args[0] === v;
};

export function gt<A extends AnyUnit>(a: A, b: A): boolean;
export function gt<A extends AnyUnit>(a: A): (b: A) => boolean;
export function gt<T extends AnyUnit>(...args: T[]) {
    if (args.length === 2) {
        return args[0] > args[1]
    };
    return (v: T): boolean => v > args[0];
};

export function gte<A extends AnyUnit>(a: A, b: A): boolean;
export function gte<A extends AnyUnit>(a: A): (b: A) => boolean;
export function gte<T extends AnyUnit>(...args: T[]) {
    if (args.length === 2) {
        return args[0] >= args[1]
    };
    return (v: T): boolean => v >= args[0];
};

export function lt<A extends AnyUnit>(a: A, b: A): boolean;
export function lt<A extends AnyUnit>(a: A): (b: A) => boolean;
export function lt<T extends AnyUnit>(...args: T[]) {
    if (args.length === 2) {
        return args[0] < args[1];
    };
    return (v: T): boolean => v < args[0];
};

export function lte<A extends AnyUnit>(a: A, b: A): boolean;
export function lte<A extends AnyUnit>(a: A): (b: A) => boolean;
export function lte<T extends AnyUnit>(...args: T[]) {
    if (args.length === 2) {
        return args[0] <= args[1];
    };
    return (v: T): boolean => v <= args[0];
};

export type NonEmptyArray<T> = [T, ...T[]];

export const isArrayNonEmpty = <T>(a: T[]): a is NonEmptyArray<T> => a.length > 0;

export const max = <T extends AnyUnit>(a: NonEmptyArray<T>): T => Math.max(...a) as T;
export const min = <T extends AnyUnit>(a: NonEmptyArray<T>): T => Math.min(...a) as T;
export const sum = <T extends AnyUnit>(a: NonEmptyArray<T>): T => a.reduce(add);
