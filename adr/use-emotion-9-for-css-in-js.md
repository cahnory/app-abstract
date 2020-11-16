<!-- variables -->

[badge-stable]: https://img.shields.io/badge/status-stable-brightgreen
[badge-unstable]: https://img.shields.io/badge/status-unstable-orange
[badge-draft]: https://img.shields.io/badge/status-draft-lightgrey
[badge-revoked]: https://img.shields.io/badge/status-revoked-red

<!-- /variables -->

![Status: unstable][badge-unstable]  
<small>_Last modified: 2020-11-16_</small>

# Use Emotion 9 for CSS in JS<!-- omit in toc -->

## Table of Contents<!-- omit in toc -->

- [Subject](#subject)
  - [Requirements](#requirements)
- [Decision](#decision)
  - [Pros](#pros)
  - [Cons](#cons)
- [Considered Options](#considered-options)
  - [Aphrodite](#aphrodite)
  - [Astroturf](#astroturf)
  - [Emotion 10](#emotion-10)
  - [Linaria](#linaria)
- [Stability](#stability)
- [Related](#related)
- [Changelog](#changelog)

## Subject

Writing CSS in JavaScript scoped to component.

### Requirements

The proposed solution should allow to:

- [x] write css scoped by component
- [x] add minimal global css
- [ ] extract css in separate files for better performances
- [x] write css as json object
- [x] works server side

## Decision

Use emotion 9 CSS in JS library.

### Pros

- works without babel plugin (implicit parsing behavior)
- works without replacing react createElement functions (not extendable)

### Cons

- css not extracted in separate file but embedded

## Considered Options

### Aphrodite

Aphrodite shares a lot with Emotion 9 but **seems unmaintained** and making it work **server side is more tedious**.

### Astroturf

Astroturf is very promising. It **ticks all the boxes** but is **not yet compatible with Webpack 5**. When it does, it will probably be the library to use.

### Emotion 10

Emotion 10 requires to use a **custom createElement function**. It is preferred to avoid replacing React functions by custom ones.  
Moreover, createElement can only be replaced one library at a time which is another reason to consider this as a **bad pattern**.

Emotion 10 as Emotion 9 **does not support css extraction**.

### Linaria

Linaria, although having an interesting approach **does not bring significant advantage** compared to most of the libraries tested and is **incompatible with Webpack 5**.

## Stability

At the moment the solution (as the considered options) **does not allow css extraction** to separate files. The [**Astroturf**](#astroturf) library may do so in the near future and in doing so, **replace Emotion 9**.

## Related

This document is not related to any ADR.

## Changelog

This document has not been modified since its creation.
