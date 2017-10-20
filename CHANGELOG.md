# Change Log
---

## [3.1.1] - 2017-10-20

### Bugfix
1. *_live()_* was returning the wrong index on carousels with no dots



## [3.1.0] - 2017-09-27

### Enhancements
1. Reset the autoplay interval on:
    - navigation dot click
    - navigation arrow click



## [3.0.0] - 2017-04-24

### Changed
1. [ BREAKING ] <_circular_> to <_infinite_> in carousel options
2. [ BREAKING ] CSS classes re-named to follow the [SUIT naming convention](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md)

### Removed
1. [ BREAKING ] - Ability to change CSS classes through options



## [2.2.0] - 2017-04-11

### Added
1. Ability to specify the carousel behavior:
    - circular or linear



## [2.1.0] - 2017-03-03

### Added
1. Ability to modify:
    - CSS class names of all the elements
    - <*_play_*> and <*_stop_*> buttons text
    - <*_prev_*> and <*_next_*> arrows text
2. *`.live()`* - returns the currently displayed slide's index

### Changed
- [ BREAKING ] - *`.initSlide()`* changed to *`.show()`*