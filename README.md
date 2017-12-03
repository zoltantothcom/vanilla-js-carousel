# Vanilla JavaScript Carousel

[![Build Status](https://travis-ci.org/zoltantothcom/vanilla-js-carousel.svg?branch=master)](https://travis-ci.org/zoltantothcom/vanilla-js-carousel) [![Coverage Status](https://coveralls.io/repos/github/zoltantothcom/vanilla-js-carousel/badge.svg?branch=master)](https://coveralls.io/github/zoltantothcom/vanilla-js-carousel?branch=master) ![Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)

Tiny (_**1Kb gzipped**_) JavaScript carousel with all the features most of us will ever need.

[![Vanilla JavaScript Carousel](https://raw.githubusercontent.com/zoltantothcom/vanilla-js-carousel/master/docs/images/carousel.jpg)](http://zoltantothcom.github.io/vanilla-js-carousel/)

*— Inspired by the blazing fast, lightweight, cross-platform and crazy popular [Vanilla JS](http://vanilla-js.com/)  framework.*


## Demo
 [**CAROUSEL**](http://zoltantothcom.github.io/vanilla-js-carousel "Carousel Demo")


## Installation
1. Via NPM:
    ```js
    npm install --save vanilla-js-carousel
    ```
    or in case you love shortcuts:
    ```js
    npm i --S vanilla-js-carousel
    ```
    
2. Old school: 
    ```html
    <script src="dist/vanilla-js-carousel.min.js"></script>
    ```


## Usage
1. Include the CSS and feel free to edit it or write your own:
    ```html
    <link rel="stylesheet" href="dist/vanilla-js-carousel.css" />
    ```

2. Write some markup:
    ```html
    <div class="js-Carousel" id="carousel">
        <ul>
            <li><img src="image-1.jpg" alt=""></li>
            <li><img src="image-2.jpg" alt=""></li>
            <li><img src="image-3.jpg" alt=""></li>
        </ul>
    </div>
    ```

3. If you installed via NPM:
    ```js
    const Carousel = require("vanilla-js-carousel");
    ```

4. Initialize the carousel:
    ```js
    var carousel = new Carousel({
        elem: 'carousel',    // id of the carousel container
        autoplay: false,     // starts the rotation automatically
        infinite: true,      // enables the infinite mode
        interval: 1500,      // interval between slide changes
        initial: 0,          // slide to start with
        dots: true,          // show navigation dots
        arrows: true,        // show navigation arrows
        buttons: false,      // hide play/stop buttons,
        btnStopText: 'Pause' // STOP button text
    });

    // Show slide number 3 (Numeration of slides starts at 0)
    carousel.show(2);

    // Move to the next slide
    carousel.next();
    ```


## Options

#### Settings
Option | Type | Default | Description
------ | ---- | ------- | -----------
elem | string | carousel | The _id_ of the carousel container in the HTML markup
interval | int  | 3000 | Auto play interval in milliseconds
initial | int | 0 | Index of the slide to start on
autoplay | boolean | false | Enables auto play of slides
infinite | boolean | false | Enables infinite mode
dots | boolean | true | Display navigation dots
arrows | boolean | true | Display navigation arrows (<*prev*>/<*next*>)
buttons | boolean | true | Display navigation buttons (<*stop*>/<*play*>)

#### Button titles
Option | Type | Default | Description
------ | ---- | ------- | -----------
btnPlayText | string | Play | Text for <*play*> button
btnStopText | string | Stop | Text for <*stop*> button
arrPrevText | string | `&lsaquo;` | Text for <*prev*> arrow
arrNextText | string | `&rsaquo;` | Text for <*next*> arrow


## Methods
Method | Argument | Description
------ | -------- | -----------
.show(index) | index: int | Moves the carousel to slide by index
.live() | | Returns the current slide's index
.prev() | | Triggers previous slide
.next() | | Triggers next slide
.play() | | Starts the autoplay
.stop() | | Stops the autoplay


## Running the tests
```
npm test
```


## Browser support and dependencies
Browser | Support | Dependencies
------ | -------- | -----------
Chrome | yes | -
Firefox | yes | -
Safari | yes | -
Opera | yes | -
IE | yes* | [Polyfill](//cdn.jsdelivr.net/classlist/2014.01.31/classList.min.js) for `.classList` in IE9

\* _IE9 and up_


## Versioning

This project uses [SemVer](http://semver.org/) for versioning. For the versions available, see [the tags on this repository](https://github.com/zoltantothcom/vanilla-js-carousel/tags).


## License

Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.

See [Unlicense](http://unlicense.org) for full details.


## Related

* [Vanilla JavaScript **Dropdown**](https://github.com/zoltantothcom/vanilla-js-dropdown)
* [Vanilla JavaScript **Tabs**](https://github.com/zoltantothcom/vanilla-js-tabs)
* [Vanilla JavaScript **Tooltip**](https://github.com/zoltantothcom/vanilla-js-tooltip)
* [Vanilla JavaScript **Accordion**](https://github.com/zoltantothcom/vanilla-js-accordion)
