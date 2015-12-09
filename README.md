Vanilla Javascript Carousel
-------

Vanilla Javascript carousel with all the basic features most of us will ever need.

#### Demo

[http://zoltantothcom.github.io/vanilla-js-carousel](http://zoltantothcom.github.io/vanilla-js-carousel)

#### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
elem | string | carousel | The _id_ of the carousel container in the HTML markup.
interval | int  | 3000 | Auto play interval.
initial | int | 0 | Index of the slide to start on.
autoplay | boolean | false | Enables auto play of slides.
dots | boolean | true | Display navigation dots.
arrows | boolean | true | Display navigation arrows (prev/next).
buttons | boolean | true | Display navigation buttons (stop/play).

#### Methods

Methods are called on the carousel:

```javascript
// Initialize the carousel
var carousel = new Carousel({
  interval: 5000
});

// Show slide number 3 (Numeration of slides starts at 0)
carousel.initSlide(2);

// Move to the next slide
carousel.next();
```

Method | Argument | Description
------ | -------- | -----------
initSlide | index: int | Moves the carousel to slide by index
prev | | Triggers previous slide
next | | Triggers next slide
play | | Starts the autoplay
stop | | Stops the autoplay

#### Example

Initialize:

```javascript
var carousel = new Carousel({
    elem: 'carousel',
    autoplay: false,
    interval: 1500,
    initial: 0,
    dots: false,
    arrows: true,
    buttons: false
});
```

#### Browser support and dependencies

Browser | Support | Dependencies
------ | -------- | -----------
Chrome | yes | -
Firefox | yes | -
Safari | yes | -
Opera | yes | -
IE | yes* | [Polyfill](//cdn.jsdelivr.net/classlist/2014.01.31/classList.min.js) for `.classList` in IE9

\* _IE9 and up_

#### License

Free. [Unlicense](http://unlicense.org).
