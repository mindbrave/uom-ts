# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2020-09-06

### Changed
- Added functions: mod, floor, ceil, round, abs, max, min, sum

### Fixed

- Fixed invalid imports in documentation examples.
- Some lesser tweaks in docs

## [2.0.0] - 2020-09-05

### Changed
- Removed need for Scalar unit, now you can just use plain numbers
- Removed "curried" versions of functions and added overloads for partial application for "ordinary" functions
- Increased exponents range to <-6, 6> from <-4, 4>
- Updated documentation, more examples.
- Now supported TS 4.0

### Fixed

- Library didn't work for TS versions over 3.0.4, now it supports TS versions up to at least 4.0.

## [1.1.0] - 2018-12-31

### Changed
- Compile ts files to es5 js files and declarations on build and distribute them to npm instead of source ts files.

## [1.0.0] - 2018-12-24

### Changed
- Added uncurried functions to library as they are more common to use.
- Renamed previous curried functions, in example: `add` renamed `addCurried` etc. Old names are taken by uncurried
version of these functions. Appendix `Curried` might not be pleasent to see, but you can just aliast them on import
like that: `import { mulCurried as mul } from "uom-ts";`
- Updated documentation "force" example, now it uses remeda pipe instead of ramda which is much easier to understand.

## [0.3.0] - 2018-09-16

### Changed
- Renamed internal name for key that was used for checking exact types.

### Fixed
- When units after some operation had exponent of 0 then they had value undefined. Such units were included to
    check for exact type and because of that it didn't always bring unit type safety.
- On operations, key that is used for checking exact types, was also included in units list, this caused bug with
operating on scalar type and lost type safety afterwards.
