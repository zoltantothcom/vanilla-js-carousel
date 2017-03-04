Vanilla Javascript Carousel
-------

[![Build Status](https://travis-ci.org/zoltantothcom/vanilla-js-carousel.svg?branch=master)](https://travis-ci.org/zoltantothcom/vanilla-js-carousel) [![Coverage Status](https://coveralls.io/repos/github/zoltantothcom/vanilla-js-carousel/badge.svg?branch=master)](https://coveralls.io/github/zoltantothcom/vanilla-js-carousel?branch=master) [![Code Climate](https://codeclimate.com/github/zoltantothcom/vanilla-js-carousel/badges/gpa.svg)](https://codeclimate.com/github/zoltantothcom/vanilla-js-carousel)

Pure Javascript carousel with all the basic features in 1024 bytes (minified and gzipped).

*— Inspired by the blazing fast, lightweight, cross-platform and crazy popular [Vanilla JS](http://vanilla-js.com/)  framework.*


## Demo
---
[Carousel](http://zoltantothcom.github.io/vanilla-js-carousel "Carousel Demo")


## Installation
---
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
---
1. Include the CSS and feel free to edit it or write your own:
    ```html
    <link rel="stylesheet" href="dist/vanilla-js-carousel.css" />
    ```

2. Write some markup:
    ```html
    <div class="js-carousel" id="carousel">
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
---

#### Settings
Option | Type | Default | Description
------ | ---- | ------- | -----------
elem | string | carousel | The _id_ of the carousel container in the HTML markup
interval | int  | 3000 | Auto play interval in milliseconds
initial | int | 0 | Index of the slide to start on
autoplay | boolean | false | Enables auto play of slides
dots | boolean | true | Display navigation dots
arrows | boolean | true | Display navigation arrows (<*prev*>/<*next*>)
buttons | boolean | true | Display navigation buttons (<*stop*>/<*play*>)

#### CSS classes
Option | Type | Default | Description
------ | ---- | ------- | -----------
crslClass | string | .js-carousel | CSS class of the carousel container
crslArrowPrevClass | string | .arrow_prev | CSS class of the <*prev*> arrow
crslArrowNextClass | string | .arrow_next | CSS class of the <*next*> arrow
crslDotsClass | string | .dots | CSS class of the nav dots container
crslButtonPlayClass | string | .btn_play | CSS class of the <*play*> button
crslButtonStopClass | string | .btn_stop | CSS class of the <*stop*> button

#### Button titles
Option | Type | Default | Description
------ | ---- | ------- | -----------
btnPlayText | string | Play | Text for <*play*> button
btnStopText | string | Stop | Text for <*stop*> button
arrPrevText | string | `&lsaquo;` | Text for <*prev*> arrow
arrNextText | string | `&rsaquo;` | Text for <*next*> arrow


## Methods
---
Method | Argument | Description
------ | -------- | -----------
.show(index) | index: int | Moves the carousel to slide by index
.live() | | Returns the current slide's index
.prev() | | Triggers previous slide
.next() | | Triggers next slide
.play() | | Starts the autoplay
.stop() | | Stops the autoplay


## Run the tests
---
```
npm test
```


## Browser support and dependencies
---
Browser | Support | Dependencies
------ | -------- | -----------
Chrome | yes | -
Firefox | yes | -
Safari | yes | -
Opera | yes | -
IE | yes* | [Polyfill](//cdn.jsdelivr.net/classlist/2014.01.31/classList.min.js) for `.classList` in IE9

\* _IE9 and up_


## License
---
Free. [Unlicense](http://unlicense.org).
