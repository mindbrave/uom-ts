
import { Unit, AnyUnit, Scalar, add, sub, mul, div, pow2, sqrt2, eq, gt, gte, lt, lte, negate } from "./index";

type Seconds = Unit<{s: 1}>;
type Kg = Unit<{kg: 1}>;
type Meters = Unit<{m: 1}>;
type SquaredMeters = Unit<{m: 2}>;
type CubicMeters = Unit<{m: 3}>;
type Newtons = Unit<{m: 1, s: -2, kg: 1}>;
type MetersPerSecond = Unit<{m: 1, s: -1}>;
type SecondsPerMeter = Unit<{s: 1, m: -1}>;

const takeSeconds = (seconds: Seconds): Seconds => seconds;
const takeMeters = (meters: Meters): Meters => meters;
const takeMetersPerSecond = (mps: MetersPerSecond): MetersPerSecond => mps;
const takeSquaredMeters = (meters: SquaredMeters): SquaredMeters => meters;
const takeCubicMeters = (meters: CubicMeters): CubicMeters => meters;
const forceToSpeed = (force: Newtons, duration: Seconds, mass: Kg) => mul(div(force)(mass))(duration);

// @dts-jest:pass
takeSeconds(1 as Seconds);

// @dts-jest:fail
takeSeconds(1 as Kg);

// @dts-jest:pass
const speed: MetersPerSecond = forceToSpeed(4 as Newtons, 2 as Seconds, 8 as Kg);

// @dts-jest:fail
const distance: Meters = forceToSpeed(4 as Newtons, 2 as Seconds, 8 as Kg);

// @dts-jest:fail
forceToSpeed(4 as MetersPerSecond, 2 as Seconds, 8 as Kg);

// @dts-jest:pass
takeMeters(mul(speed)(1 as Seconds));

// @dts-jest:pass
takeMeters(div(mul(1 as Meters)(1 as Kg))(1 as Kg));

// @dts-jest:pass
takeMetersPerSecond(div(1 as Scalar)(1 as SecondsPerMeter));

// @dts-jest:fail
takeMeters(div(1 as Scalar)(1 as SecondsPerMeter));

// @dts-jest:fail
takeMeters(speed);

// @dts-jest:pass
takeCubicMeters(div(pow2(mul(1 as Meters)(1 as Meters)))(1 as Meters));

// @dts-jest:fail
takeCubicMeters(pow2(mul(1 as Meters)(1 as Meters)));

// @dts-jest:pass
takeSquaredMeters(sqrt2(pow2(1 as SquaredMeters)));

// @dts-jest:fail
takeSquaredMeters(pow2(1 as SquaredMeters));

// @dts-jest:pass
const meters: Meters = 1 as Meters;

// @dts-jest:fail
const meters2: Meters = 1 as MetersPerSecond;

// @dts-jest:pass
add(1 as Meters)(2 as Meters);

// @dts-jest:fail
add(1 as Meters)(2 as Seconds);

// @dts-jest:pass
sub(1 as Meters)(2 as Meters);

// @dts-jest:fail
sub(1 as Meters)(2 as Seconds);

// @dts-jest:pass
eq(1 as Meters)(2 as Meters);

// @dts-jest:fail
eq(1 as Meters)(2 as Seconds);

// @dts-jest:pass
takeMeters(negate(1 as Meters));

// @dts-jest:fail
takeMeters(negate(1 as Seconds));

// @dts-jest:pass
gt(1 as Meters)(2 as Meters);

// @dts-jest:fail
gt(1 as Meters)(2 as Seconds);

// @dts-jest:pass
gte(1 as Meters)(2 as Meters);

// @dts-jest:fail
gte(1 as Meters)(2 as Seconds);

// @dts-jest:pass
lt(1 as Meters)(2 as Meters);

// @dts-jest:fail
lt(1 as Meters)(2 as Seconds);

// @dts-jest:pass
lte(1 as Meters)(2 as Meters);

// @dts-jest:fail
lte(1 as Meters)(2 as Seconds);

// @dts-jest:pass
takeMeters(mul(1.0 as Meters)(2.0 as Scalar));

type Vec2<T extends number> = [T, T];
const addVec2 = <T extends AnyUnit>(v1: Vec2<T>) => (v2: Vec2<T>): Vec2<T> => [add(v1[0])(v2[0]), add(v1[1])(v2[1])];

// @dts-jest:fail
addVec2([0, 0])([1, 1])

// @dts-jest:fail
addVec2([0 as Scalar, 0 as Scalar])([1, 1]);

// @dts-jest:pass
addVec2([0 as Scalar, 0 as Scalar])([1 as Scalar, 1 as Scalar]);

// @dts-jest:pass
addVec2([0 as Newtons, 0 as Newtons])([1 as Newtons, 1 as Newtons]);

// @dts-jest:fail
addVec2([0 as Newtons, 0 as Newtons])([1 as MetersPerSecond, 1 as MetersPerSecond]);

// @dts-jest:fail Cannot do operation on exponents over 4
takeCubicMeters(sqrt2(pow2(1 as CubicMeters)));