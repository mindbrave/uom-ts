
# uom-ts [![Build Status](https://travis-ci.org/mindbrave/uom-ts.svg?branch=master)](https://travis-ci.org/mindbrave/uom-ts)

Units of measure type safety, with no runtime overhead, supporting multiplication and division!

## Installation 
```sh
npm install uom-ts --save
```

## Supported operations:
* add
* sub
* mul
* div
* pow2
* sqrt2
* gt, gte, lt, lte

## Example of usage:

```typescript
import { Unit, add, mul, div } from "uom-ts";

// define your own units
type Seconds = Unit<{s: 1}>;
type Kg = Unit<{kg: 1}>;
type MetersPerSeconds = Unit<{m: 1, s: -1}>;
type Newtons = Unit<{m: 1, kg: 1, s: -2}>;

interface PhysicalBody = {
    velocity: MetersPerSeconds,
    mass: Kg
};

// no errors
const applyForce = (force: Newtons, duration: Seconds, body: PhysicalBody): PhysicalBody => ({
    ...body,
    velocity: pipe(div(force), mul(duration), add(body.velocity))(body.mass)
});

// error below because you cant add speed to acceleration
const applyForceError = (force: Newtons, duration: Seconds, body: PhysicalBody): PhysicalBody => ({
    ...body,
    velocity: pipe(div(force), add(body.velocity))(body.mass)
});

const force = 10 as Newtons;
const body = {
    velocity: 0.0 as MetersPerSeconds,
    mass: 1.0 as Kg,
};
applyForce(force, 2.0 as Seconds, body); // returns body with velocity 20.0 m/s
```


## Docs

* Units are created by specifing unit symbol and its exponent.
    ```typescript
        type Seconds = Unit<{s: 1}>; // second^1 (time).
        type MetersPerSquaredSeconds = Unit<{m: 1, s: -2}>; // meters^1/seconds^2 (acceleration)
        type Hertz = Unit<{s: -1}>; // 1/second^1 (frequency)
    ```

* When you initiliaze some const as an unit, you have to cast it against that unit so type system knows it's that unit. i.e. `const speed = 10.0 as MetersPerSeconds;`

* You cannot assign zero exponent when creating new unit, because it's redundant, it resolves to 1 anyway.

* For now only exponents in range <-4, 4> (integers without zero) are supported. That means that you can in example multiply cubic meters by meters, which will be m^4, but you cannot multiply cubic meters by squre meters, because it will be m^5 and over the range.

* Multiplication, divide, pow and sqrt operations that you do with units must be made with functions defined in this lib or you will lose type along a way. It means that unfortunately in example external vector library won't work, but I will create one specifically for use with this lib.

* When you create new units, try to use units from SI system whenever you can. So if you create units that are made of other units, define it that way. In example Newtons are (kg * m)/s^2, so don't create unit `{N: 1}`, instead create `{m: 1, kg: 1, s: -2}`. This way units are interchangable. If you don't do that, then you will have to create functions for explicit convertions. It's also important if you want to work with other libraries that use uom-ts, because if they will use 's' for seconds, and you will use something different, i.e. 'S', then your units won't match.

* Units that are just different scales of basic unit must be created separately for now. In example meters and inches, or seconds and milliseconds. You should create convertion functions for them.

* Functions defined in this lib are all curried manually, without any magic tricks. So in example `mul` function must be used like that: `mul(3)(2) === 6`. It's made that way specifically for functional programmers. Auto currying made by other libs often generates problems with infering generic types.

* If you want to make operation on some unit and scalar, you should cast that scalar as `Scalar` type, because operations are accepting only subtypes of AnyUnit type.

    ```typescript
    mul(1 as Meters)(2 as Scalar); // => 2 Meters
    ```

* If you create generic functions operating on units, in example:
`const scaleVector = <T extends AnyUnit, S extends AnyUnit>(scale: S, vec: Vec<T>) => [mul(vec[0])(scale), mul(vec[1])(scale)];` then to annotate return type you cannot foresight what unit type will be returned. For that case you can use operation types, in this case return type would be `Vec<MultipyUnits<S, T>>`. There is also `DivideUnits` type and `SqrtUnit` type. There are some cases where you have to use these types even that you might think you don't have to. Think about such function `const vecLength = <T extends AnyUnit>(v: Vec<T>): T => sqrt2( add( pow2(v[0]) )( pow2(v[1]) ) )` - simple pythagorean theorem. We know that length of vector of unit T will be of unit T. Unfortunately TS can't resolve that, so you have to annotate return type composed of operations made in that function, in this case it will be `SqrtUnit<MultiplyUnits<T, T>>` which mathematicaly is just a `T`.
