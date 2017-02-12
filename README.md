Vanilla Javascript Carousel
-------

Pure Javascript carousel with all the basic features and a tiny ~900 bytes footprint (minified and gzipped).

*— Inspired by the blazing fast, lightweight, cross-platform and crazy popular [Vanilla JS](http://vanilla-js.com/)  framework.*

### Demo
---
[Carousel](http://zoltantothcom.github.io/vanilla-js-carousel "Carousel Demo")

### Install
---
1. Via NPM:
    ```js
    npm install --save vanilla-js-carousel
    ```
    
2. Old school: 
    ```html
    <script src="path/to/vanilla-js-carousel.min.js"></script>
    ```

### Usage
---
1. Include the CSS and feel free to edit it or write your own:
    ```html
    <link rel="stylesheet" href="path/to/vanilla-js-carousel.css" />
    ```
    > **`Please keep the CSS class names unchanged`**` - at this moment they're baked into the script.`
    > `This is grossly unacceptable and fixing that is a top priority which is underway.`

2. Write some markup:
    ```html
    <div class="b-carousel" id="carousel">
        <div class="b-carousel__frame">
            <ul class="b-carousel__items">
                <li><img src="image-1.jpg" alt=""></li>
                <li><img src="image-2.jpg" alt=""></li>
                <li><img src="image-3.jpg" alt=""></li>
            </ul>
        </div>
    </div>
    ```

3. If you installed via NPM:
    ```js
    const Carousel = require("vanilla-js-carousel");
    ```

4. Initialize the carousel:
    ```js
    var carousel = new Carousel({
        elem: 'carousel',  // id of the carousel container
        autoplay: false,   // starts the rotation automatically
        interval: 1500,    // interval between slide changes
        initial: 0,        // slide to start with
        dots: true,        // show navigation dots
        arrows: true,      // show navigation arrows
        buttons: true      // show play/stop buttons
    });

    // Show slide number 3 (Numeration of slides starts at 0)
    carousel.initSlide(2);

    // Move to the next slide
    carousel.next();
    ```

### Options
---
Option | Type | Default | Description
------ | ---- | ------- | -----------
elem | string | carousel | The _id_ of the carousel container in the HTML markup.
interval | int  | 3000 | Auto play interval in milliseconds.
initial | int | 0 | Index of the slide to start on.
autoplay | boolean | false | Enables auto play of slides.
dots | boolean | true | Display navigation dots.
arrows | boolean | true | Display navigation arrows (prev/next).
buttons | boolean | true | Display navigation buttons (stop/play).

### Methods
---
Method | Argument | Description
------ | -------- | -----------
initSlide | index: int | Moves the carousel to slide by index
prev | | Triggers previous slide
next | | Triggers next slide
play | | Starts the autoplay
stop | | Stops the autoplay

### Browser support and dependencies
---
Browser | Support | Dependencies
------ | -------- | -----------
Chrome | yes | -
Firefox | yes | -
Safari | yes | -
Opera | yes | -
IE | yes* | [Polyfill](//cdn.jsdelivr.net/classlist/2014.01.31/classList.min.js) for `.classList` in IE9

\* _IE9 and up_

### License
---
Free. [Unlicense](http://unlicense.org).
