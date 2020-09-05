
# uom-ts [![Build Status](https://travis-ci.org/mindbrave/uom-ts.svg?branch=master)](https://travis-ci.org/mindbrave/uom-ts)

Units of measure type safety, with no runtime overhead, supporting multiplication and division!

## Why?

Because we want to be sure that we did correct operations or that we passed value with correct unit as a parameter.

In example you can by mistake put `Seconds` into function that takes `MilliSeconds`. In a standard scenario where you don't annotate numeric values with units, that bug would be not found until you will see that something takes 1000 times longer then it should. With annotated units TypeScript will tell you that you are puting wrong unit into function. There might be more subtle bugs, where you forget to divide by something that is a small value (in example `1.2`). Such bug will be really difficult to discover.

Big advantage of this library is that you can define your own units easly, you are not limited to units defined by author of the lib, like in many other libraries.
In example if you are creating a game you might want to define health and health rate of regeneration for your character, with this lib you can
define unit `type Health = Unit<{hp: 1}>` and `type HealthRegen = Rate<Health, Seconds>`, where rate is a simple alias for unit division `type Rate<UNIT, OVER> = DivideUnits<UNIT, OVER>`.

```typescript
type Health = Unit<{hp: 1}>;
type Rate<UNIT, OVER> = DivideUnits<UNIT, OVER>;
type HealthRegen = Rate<Health, Seconds>;

const regenHealth = (hp: Health, rate: HealthRegen, duration: Seconds): Health => add(hp, mul(rate, duration));

regenHealth(10 as Health, 2 as HealthRegen, 1 as Seconds); // ok

regenHealth(10 as HealthRegen, 2 as Health, 1 as Seconds); // type error
```

It's also worth notice that unit types are referentialy transparent, so you can use interchangably units `Unit<{hp: 1, s: -1}>`, `DivideUnits<{hp: 1}, {s: 1}>`, `DivideUnits<Health, Seconds>`, `Rate<Health, Seconds>`, `HealthRegen` and so on.

```typescript
regenHealth(10 as Health, 2 as Unit<{hp: 1, s: -1}>, 1 as Seconds); // ok

regenHealth(10 as Health, 2 as DivideUnits<Health, Seconds>, 1 as Seconds); // ok

regenHealth(10 as Health, 2 as Rate<Health, Seconds>, 1 as Seconds); // ok
```

## Installation 
```sh
npm install uom-ts
```

## TypeScript version

Tested for versions from 3.0 to 4.0, but should work for all 4.x versions unless there will be backward compatible changes.

## Examples of usage:

Creating unit and assigning it.

```typescript
import { Unit } from "uom-ts";

type Kg = Unit<{kg: 1}>;
type Pounds = Unit<{lb: 1}>;

const mass: Kg = 1.0 as Kg; // ok

const mass2: Kg = 1.0 as Pounds; // error
const mass3: Kg = 1.0; // error
```

Types are able to correctly multiply and divide units for you!

```typescript
import { Unit, mul, div } from "uom-ts";

type Meters = Unit<{m: 1}>;
type Seconds = Unit<{s: 1}>;
type MetersPerSecond = Unit<{m: 1, s: -1}>;

const speed: MetersPerSecond = div(4 as Meters, 2 as Seconds); // ok -> 2m/s
const speed2: MetersPerSecond = div(4, 2); // error
const speed3: MetersPerSecond = div(4 as Seconds, 2 as Meters); // error

const distance: Meters = mul(10 as MetersPerSecond, 5 as Seconds); // ok -> 50m
const distance2: Meters = mul(10 as MetersPerSecond, 5); // error

```

Type system can warn you about invalid math, in example if you forget to divide force by mass to get acceleration.

```typescript
import { pipe } from "remeda";

import { Unit, addCurried as add, mulCurried as mul, divCurried as div } from "uom-ts";

// define your own units
type Seconds = Unit<{s: 1}>;
type Kg = Unit<{kg: 1}>;
type MetersPerSecond = Unit<{m: 1, s: -1}>;
type Newtons = Unit<{m: 1, kg: 1, s: -2}>;

interface PhysicalBody = {
    velocity: MetersPerSecond,
    mass: Kg
};

// no errors
const applyForce = (force: Newtons, duration: Seconds, body: PhysicalBody): PhysicalBody => ({
    ...body,
    velocity: pipe(force, div(body.mass), mul(duration), add(body.velocity)),
});

// error below because you can't add impulse to velocity
const applyForceError = (force: Newtons, duration: Seconds, body: PhysicalBody): PhysicalBody => ({
    ...body,
    velocity: pipe(force, mul(duration), add(body.velocity)),
});

const force = 10 as Newtons;
const body = {
    velocity: 0.0 as MetersPerSecond,
    mass: 1.0 as Kg,
};
applyForce(force, 2.0 as Seconds, body); // returns body with velocity 20.0 m/s
```

## Operations

 Math operations that you do with units must be made with functions defined in this lib or you will lose type along a way. It means that unfortunately external vector libraries won't work, but you can easly create your own (there are some examples in tests for that).

### Supported operations:
* add
* sub
* mul
* div
* pow2
* sqrt2
* negate
* eq
* gt
* gte
* lt
* lte

All operation functions can be partially applied if you preffer more functional style. Have in mind that for operations where arguments order does matter, when you partially applies them then order of arguments is reversed. In example:

```typescript
sub(5 as Meters, 2 as Meters) === 3 as Meters

sub(5 as Meters)(2 as Meters) === -3 as Meters

pipe(5 as Meters, sub(2 as Meters)) === 3 as Meters
```

## Regulations

* Units are created by specifing unit symbol and its exponent.
    ```typescript
        type Seconds = Unit<{s: 1}>; // second^1 (time).
        type MetersPerSquaredSecond = Unit<{m: 1, s: -2}>; // meters^1/seconds^2 (acceleration)
        type Hertz = Unit<{s: -1}>; // 1/second^1 (frequency)
    ```

* When you initiliaze some const as an unit, you have to assert it against that unit so type system knows it's that unit. i.e. `const speed = 10.0 as MetersPerSecond;`. Some people don't want to use assertions "freely" in their codebase, but we can hide that in some factory functions, i.e.: `const metersPerSecond = (val: number): MetersPerSecond => val as MetersPerSecond;`.

* You cannot assign zero exponent when creating new unit, because it's redundant, the same effect is when you just don't define such exponent at all.

* For now only exponents in range <-6, 6> (integers without zero) are supported. That means that you can in example multiply cubic meters by cubic meters, which will be m^6, but you cannot multiply cubic meters by square meters by square meters, because it will be m^7 and over the range.

* When you create new physcial units, try to use units from SI system whenever you can. In example Newtons are (kg * m)/s^2, so don't create unit `{N: 1}`, instead create `{m: 1, kg: 1, s: -2}`. This way units are interchangable. If you don't do that, then you will have to create functions for explicit convertions. It's also important if you want to work with other libraries that use uom-ts, because if they will use 's' for seconds, and you will use something different, i.e. 'S', then your units won't match.

* Units that are just different scales of basic unit must be created separately for now. In example meters and inches, or seconds and milliseconds. You should create convertion functions for them.

    ```typescript
    type Seconds = {s: 1};
    type Milliseconds = {ms: 1};
    type MsToSecondsRate = DivideUnits<Milliseconds, Seconds>;

    const msToSecondsRate = 1000.0 as MsToSecondsRate;
    const msToSeconds = (ms: Milliseconds): Seconds => div(ms, msToSecondsRate);

    const time: Seconds = msToSeconds(2000 as Milliseconds); // ok
    ```

* If you create generic functions operating on units, in example:
`const scaleVector = <T extends AnyUnit, S extends AnyUnit>(scale: S, vec: Vec<T>) => [mul(vec[0], scale), mul(vec[1], scale)];` then to annotate return type you cannot foresight what unit type will be returned. For that case you can use operation types, here return type would be `Vec<MultipyUnits<S, T>>`. There is also `DivideUnits` type and `SqrtUnit` type. There are some cases where you have to use these types even that you might think you don't have to. Think about such function `const vecLength = <T extends AnyUnit>(v: Vec<T>): T => sqrt2(add(pow2(v[0]), pow2(v[1])))` - simple pythagorean theorem. We know that length of vector of unit T will be of unit T. Unfortunately TS can't resolve that, so you have to annotate return type composed of operations made in that function, in this case it will be `SqrtUnit<MultiplyUnits<T, T>>` which mathematicaly is just a `T`.
