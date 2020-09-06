
import {
    Unit, AnyUnit, DivideUnits,
    add, 
    sub,
    mul,
    div,
    pow2,
    sqrt2,
    eq,
    gt,
    gte,
    lt,
    lte,
    negate, mod, floor, ceil, round, max, NonEmptyArray, isArrayNonEmpty, sum, min
} from "./index";

type Seconds = Unit<{s: 1}>;
type Milliseconds = Unit<{ms: 1}>;
type Kg = Unit<{kg: 1}>;
type Meters = Unit<{m: 1}>;
type SquaredMeters = Unit<{m: 2}>;
type CubicMeters = Unit<{m: 3}>;
type MetersTo6 = Unit<{m: 6}>;
type Newtons = Unit<{m: 1, s: -2, kg: 1}>;
type MetersPerSecond = Unit<{m: 1, s: -1}>;
type SecondsPerMeter = Unit<{s: 1, m: -1}>;

// @dts-jest:fail
type MetersTo7 = Unit<{m: 7}>;

const takeSeconds = (seconds: Seconds): Seconds => seconds;
const takeMeters = (meters: Meters): Meters => meters;
const takeMetersPerSecond = (mps: MetersPerSecond): MetersPerSecond => mps;
const takeSquaredMeters = (meters: SquaredMeters): SquaredMeters => meters;
const takeCubicMeters = (meters: CubicMeters): CubicMeters => meters;
const forceToSpeed = (force: Newtons, duration: Seconds, mass: Kg) => mul(div(force, mass), duration);

// @dts-jest:pass
takeSeconds(1 as Seconds);

// @dts-jest:fail
takeSeconds(1 as Kg);

// @dts-jest:pass
mul(1 as Meters, 2 as Meters);

// @dts-jest:pass
takeMeters(mul(2 as MetersPerSecond, 1 as Seconds));

// @dts-jest:pass
takeMeters(mul(2 as MetersPerSecond)(1 as Seconds));

// @dts-jest:pass
takeMeters(mul(1, 3 as Meters));

// @dts-jest:fail
type Invalid =  Unit<{m: 'string'}>;

// @dts-jest:fail
takeMeters(mul('string', 3 as Meters));

// @dts-jest:pass
const speed: MetersPerSecond = forceToSpeed(4 as Newtons, 2 as Seconds, 8 as Kg);

// @dts-jest:fail
const speed2: MetersPerSecond = div(1, 2);

// @dts-jest:fail
const distance: Meters = forceToSpeed(4 as Newtons, 2 as Seconds, 8 as Kg);

// @dts-jest:fail
forceToSpeed(4 as MetersPerSecond, 2 as Seconds, 8 as Kg);

// @dts-jest:pass
takeMeters(div(mul(1 as Meters, 1 as Kg), 1 as Kg));

// @dts-jest:pass
takeMetersPerSecond(div(1, 1 as SecondsPerMeter));

// @dts-jest:pass
takeMetersPerSecond(div(1)(1 as SecondsPerMeter));

// @dts-jest:fail
takeMeters(div(1, 1 as SecondsPerMeter));

// @dts-jest:fail
takeMeters(speed);

// @dts-jest:pass
takeCubicMeters(div(pow2(mul(1 as Meters, 1 as Meters)), 1 as Meters));

// @dts-jest:fail
takeCubicMeters(pow2(mul(1 as Meters, 1 as Meters)));

// @dts-jest:pass
takeSquaredMeters(pow2(1 as Meters));

// @dts-jest:pass
takeMeters(sqrt2(1 as SquaredMeters));

// @dts-jest:pass
takeSquaredMeters(sqrt2(pow2(1 as SquaredMeters)));

// @dts-jest:fail
takeSquaredMeters(pow2(1 as SquaredMeters));

// @dts-jest:pass
const meters: Meters = 1 as Meters;

// @dts-jest:fail
const meters2: Meters = 1 as MetersPerSecond;

// @dts-jest:pass
takeMeters(mul(1.0 as Meters, 2.0));

/* add tests */

// @dts-jest:pass
add(1 as Meters, 2 as Meters);

// @dts-jest:pass
add(1 as Meters)(2 as Meters);

// @dts-jest:fail
add(1 as Meters, 2 as Seconds);

/* sub tests */

// @dts-jest:pass
sub(1 as Meters, 2 as Meters);

// @dts-jest:pass
sub(1 as Meters)(2 as Meters);

// @dts-jest:fail
sub(1 as Meters, 2 as Seconds);

/* eq tests */

// @dts-jest:pass
eq(1 as Meters, 2 as Meters);

// @dts-jest:pass
eq(1 as Meters)(2 as Meters);

// @dts-jest:fail
eq(1 as Meters, 2 as Seconds);

/* abs tests */

// @dts-jest:pass
const absMeters = round(-1.2 as Meters);

// @dts-jest:pass
takeMeters(absMeters);

// @dts-jest:fail
takeSeconds(absMeters);

/* negate tests */

// @dts-jest:pass
takeMeters(negate(1 as Meters));

// @dts-jest:fail
takeMeters(negate(1 as Seconds));

/* gt tests */

// @dts-jest:pass
gt(1 as Meters, 2 as Meters);

// @dts-jest:pass
gt(1 as Meters)(2 as Meters);

// @dts-jest:fail
gt(1 as Meters, 2 as Seconds);

/* gte tests */

// @dts-jest:pass
gte(1 as Meters, 2 as Meters);

// @dts-jest:pass
gte(1 as Meters)(2 as Meters);

// @dts-jest:fail
gte(1 as Meters, 2 as Seconds);

/* lt tests */

// @dts-jest:pass
lt(1 as Meters, 2 as Meters);

// @dts-jest:pass
lt(1 as Meters)(2 as Meters);

// @dts-jest:fail
lt(1 as Meters, 2 as Seconds);

/* lte tests */

// @dts-jest:pass
lte(1 as Meters, 2 as Meters);

// @dts-jest:pass
lte(1 as Meters)(2 as Meters);

// @dts-jest:fail
lte(1 as Meters, 2 as Seconds);

/* mod tests */

// @dts-jest:pass
const restSeconds = mod(5 as Seconds, 2 as Seconds);

// @dts-jest:pass
takeSeconds(restSeconds);

// @dts-jest:fail
mod(5 as Seconds, 2 as Meters);

// @dts-jest:pass
mod(5 as Seconds)(2 as Seconds);

/* floor tests */

// @dts-jest:pass
const floorMeters = floor(1.2 as Meters);

// @dts-jest:pass
takeMeters(floorMeters);

// @dts-jest:fail
takeSeconds(floorMeters);

/* ceil tests */

// @dts-jest:pass
const ceilMeters = ceil(1.2 as Meters);

// @dts-jest:pass
takeMeters(ceilMeters);

// @dts-jest:fail
takeSeconds(ceilMeters);

/* round tests */

// @dts-jest:pass
const roundMeters = round(1.2 as Meters);

// @dts-jest:pass
takeMeters(roundMeters);

// @dts-jest:fail
takeSeconds(roundMeters);

const lengthList = [1 as Meters, 5 as Meters, 3.5 as Meters];

/* max tests */

// @dts-jest:pass
const maxMeters = max([1 as Meters, 5 as Meters, 3.5 as Meters]);

// @dts-jest:pass
takeMeters(maxMeters);

// @dts-jest:fail
takeSeconds(maxMeters);

if (isArrayNonEmpty(lengthList)) {
    // @dts-jest:pass
    max(lengthList);
}

// @dts-jest:fail
max([1 as Meters, 5 as Seconds, 3.5 as MetersPerSecond]);

// @dts-jest:fail
max([]);

/* min tests */

// @dts-jest:pass
const minMeters = min([1 as Meters, 5 as Meters, 3.5 as Meters]);

// @dts-jest:pass
takeMeters(minMeters);

// @dts-jest:fail
takeSeconds(minMeters);

if (isArrayNonEmpty(lengthList)) {
    // @dts-jest:pass
    min(lengthList);
}

// @dts-jest:fail
min([1 as Meters, 5 as Seconds, 3.5 as MetersPerSecond]);

// @dts-jest:fail
min([]);

/* sum tests */

// @dts-jest:pass
const metersSum = sum([1 as Meters, 5 as Meters, 3.5 as Meters]);

// @dts-jest:pass
takeMeters(metersSum);

// @dts-jest:fail
takeSeconds(metersSum);

if (isArrayNonEmpty(lengthList)) {
    // @dts-jest:pass
    sum(lengthList);
}

// @dts-jest:fail
sum([1 as Meters, 5 as Seconds, 3.5 as MetersPerSecond]);

// @dts-jest:fail
sum([]);

/* generic unit operation tests */

type Vec2<T extends AnyUnit> = [T, T];
const addVec2 = <T extends AnyUnit>(v1: Vec2<T>) => (v2: Vec2<T>): Vec2<T> => [add(v1[0], v2[0]), add(v1[1], v2[1])];

// @dts-jest:pass
addVec2<AnyUnit>([0, 0])([1, 1])

// @dts-jest:pass
addVec2([0, 1])([1, 1]);

// @dts-jest:pass
addVec2([0 as Newtons, 0 as Newtons])([1 as Newtons, 1 as Newtons]);

addVec2([2 as Newtons, 2 as Newtons])([
    // @dts-jest:fail
    1 as MetersPerSecond,
    // @dts-jest:fail
    1 as MetersPerSecond
]);

/* exponent range tests */

// @dts-jest:pass
pow2(1 as CubicMeters);

// @dts-jest:pass
const m6: MetersTo6 = pow2(1 as CubicMeters);
const m6_ = pow2(1 as CubicMeters);

// @dts-jest:fail To big exponent (max 6)
const m6_2: MetersTo6 = sqrt2(pow2(m6_));

/* examples from doc tests */

type Health = Unit<{hp: 1}>;
type Rate<UNIT, OVER> = DivideUnits<UNIT, OVER>;
type HealthRegen = Rate<Health, Seconds>;

const regenHealth = (hp: Health, rate: HealthRegen, duration: Seconds): Health => add(hp, mul(rate, duration));

// @dts-jest:pass
regenHealth(10 as Health, 2 as HealthRegen, 1 as Seconds);

// @dts-jest:fail
regenHealth(10 as HealthRegen, 2 as Health, 1 as Seconds);

type MsToSecondsRate = DivideUnits<Milliseconds, Seconds>;
    
const msToSecondsRate = 1000.0 as MsToSecondsRate;
const msToSeconds = (ms: Milliseconds): Seconds => div(ms, msToSecondsRate);

// @dts-jest:pass
const time: Seconds = msToSeconds(2000 as Milliseconds);

/* referential transparency of units tests */

// @dts-jest:pass
regenHealth(10 as Health, 2 as Unit<{hp: 1, s: -1}>, 1 as Seconds);

// @dts-jest:pass
regenHealth(10 as Health, 2 as DivideUnits<Health, Seconds>, 1 as Seconds);

// @dts-jest:pass
regenHealth(10 as Health, 2 as Rate<Health, Seconds>, 1 as Seconds);
