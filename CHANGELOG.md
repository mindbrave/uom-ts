# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.0] - 2018-09-16

### Changed
- Renamed internal name for key that was used for checking exact types.

### Fixed
- When units after some operation had exponent of 0 then they had value undefined. Such units were included to
    check for exact type and because of that it didn't always bring unit type safety.
- On operations, key that is used for checking exact types, was also included in units list, this caused bug with
operating on scalar type and lost type safety afterwards.
