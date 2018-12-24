type Exponent = -4 | -3 | -2 | -1 | 1 | 2 | 3 | 4 | undefined;

type NegativeExponent<T extends Exponent> = (
    T extends -4 ? 4 :
    T extends -3 ? 3 :
    T extends -2 ? 2 :
    T extends -1 ? 1 :
    T extends 1 ? -1 :
    T extends 2 ? -2 :
    T extends 3 ? -3 :
    T extends 4 ? -4 :
    undefined
);
type SumExponents<A extends Exponent, B extends Exponent> = (
    A extends -4 ? (
        B extends undefined ? -4 :
        B extends 1 ? -3 :
        B extends 2 ? -2 :
        B extends 3 ? -1 :
        undefined
    ) :
    A extends -3 ? (
        B extends undefined ? -3 :
        B extends -1 ? -4 :
        B extends 1 ? -2 :
        B extends 2 ? -1 :
        B extends 4 ? 1 :
        undefined
    ) :
    A extends -2 ? (
        B extends undefined ? -2 :
        B extends -2 ? -4 :
        B extends -1 ? -3 :
        B extends 1 ? -1 :
        B extends 3 ? 1 :
        B extends 4 ? 2 :
        undefined
    ) :
    A extends -1 ? (
        B extends undefined ? -1 :
        B extends -3 ? -4 :
        B extends -2 ? -3 :
        B extends -1 ? -2 :
        B extends 2 ? 1 :
        B extends 3 ? 2 :
        B extends 4 ? 3 :
        undefined
    ) :
    A extends 1 ? (
        B extends undefined ? 1 :
        B extends -4 ? -3 :
        B extends -3 ? -2 :
        B extends -2 ? -1 :
        B extends 1 ? 2 :
        B extends 2 ? 3 :
        B extends 3 ? 4 :
        undefined
    ) :
    A extends 2 ? (
        B extends undefined ? 2 :
        B extends -4 ? -2 :
        B extends -3 ? -1 :
        B extends -1 ? 1 :
        B extends 1 ? 3 :
        B extends 2 ? 4 :
        undefined
    ) :
    A extends 3 ? (
        B extends undefined ? 3 :
        B extends -4 ? -1 :
        B extends -2 ? 1 :
        B extends -1 ? 2 :
        B extends 1 ? 4 :
        undefined
    ) :
    A extends 4 ? (
        B extends undefined ? 4 :
        B extends -3 ? 1 :
        B extends -2 ? 2 :
        B extends -1 ? 3 :
        undefined
    ) :
    A extends undefined ? (
        B extends -4 ? -4 :
        B extends -3 ? -3 :
        B extends -2 ? -2 :
        B extends -1 ? -1 :
        B extends 1 ? 1 :
        B extends 2 ? 2 :
        B extends 3 ? 3 :
        B extends 4 ? 4 :
        undefined
    ) :
    undefined
);

type DivideExponentsBy2<A extends Exponent> = (
    A extends -4 ? -2 :
    A extends -2 ? -1 :
    A extends 2 ? 1 :
    A extends 4 ? 2 :
    undefined
);

type SubtractExponents<A extends Exponent, B extends Exponent> = SumExponents<A, NegativeExponent<B>>;

type Exact<A extends object> = A & {__exactKeys: keyof A};

export type AnyUnit = number & {
    [key:string]: Exponent,
};

type FilterPropsByValue<T, V> = { [K in keyof T]: T[K] extends V ? never : K }[keyof T];
type FilterObjectByValue<T, V> = {[P in FilterPropsByValue<T, V>]: T[P]};

export type Unit<A extends {[key:string]: Exponent}> = number & Exact<A>;

type _MultiplyUnits<A extends AnyUnit, B extends AnyUnit> = {
    [P in Exclude<keyof A | keyof B, keyof number | "__exactKeys">]: P extends keyof A ? (P extends keyof B ? SumExponents<A[P], B[P]> : A[P]) : (P extends keyof B ? B[P] : never)
}
export type MultiplyUnits<A extends AnyUnit, B extends AnyUnit> = number & Exact<FilterObjectByValue<_MultiplyUnits<A, B>, undefined>>;

type _DivideUnits<A extends AnyUnit, B extends AnyUnit> = {
    [P in Exclude<keyof A | keyof B, keyof number | "__exactKeys">]: P extends keyof A ? (P extends keyof B ? SubtractExponents<A[P], B[P]> : A[P]) : (P extends keyof B ? NegativeExponent<B[P]> : never)
};
export type DivideUnits<A extends AnyUnit, B extends AnyUnit> = number & Exact<FilterObjectByValue<_DivideUnits<A, B>, undefined>>;

export type SqrtUnit<A extends AnyUnit> = number & Exact<{
    [P in Exclude<keyof A, keyof number | "__exactKeys">]: DivideExponentsBy2<A[P]>
}>;

export type Scalar = Unit<{}>;

export const addCurried = <T extends AnyUnit>(a: T) => (b: T): T => (a + b) as T;
export const add = <T extends AnyUnit>(a: T, b: T): T => (a + b) as T;
export const subCurried = <T extends AnyUnit>(a: T) => (b: T): T => (a - b) as T;
export const sub = <T extends AnyUnit>(a: T, b: T): T => (a - b) as T;
export const mulCurried = <A extends AnyUnit>(a: A) => <B extends AnyUnit>(b: B): MultiplyUnits<A, B> => (a * b) as MultiplyUnits<A, B>;
export const mul = <A extends AnyUnit, B extends AnyUnit>(a: A, b: B): MultiplyUnits<A, B> => (a * b) as MultiplyUnits<A, B>;
export const divCurried = <A extends AnyUnit>(a: A) => <B extends AnyUnit>(b: B) => (a / b) as DivideUnits<A, B>;
export const div = <A extends AnyUnit, B extends AnyUnit>(a: A, b: B) => (a / b) as DivideUnits<A, B>;
export const pow2 = <A extends AnyUnit>(a: A): MultiplyUnits<A, A> => mul(a, a) as MultiplyUnits<A, A>;
export const sqrt2 = <A extends AnyUnit>(a: A): SqrtUnit<A> => Math.sqrt(a) as SqrtUnit<A>;
export const negate = <A extends AnyUnit>(a: A): A => -a as A;

export const eq = <A extends AnyUnit>(a: A, b: A): boolean => a === b;
export const gt = <A extends AnyUnit>(a: A, b: A): boolean => a > b;
export const gte = <A extends AnyUnit>(a: A, b: A): boolean => a >= b;
export const lt = <A extends AnyUnit>(a: A, b: A): boolean => a < b;
export const lte = <A extends AnyUnit>(a: A, b: A): boolean => a <= b;

export const eqCurried = <A extends AnyUnit>(a: A) => (b: A): boolean => a === b;
export const gtCurried = <A extends AnyUnit>(a: A) => (b: A): boolean => a > b;
export const gteCurried = <A extends AnyUnit>(a: A) => (b: A): boolean => a >= b;
export const ltCurried = <A extends AnyUnit>(a: A) => (b: A): boolean => a < b;
export const lteCurried = <A extends AnyUnit>(a: A) => (b: A): boolean => a <= b;
