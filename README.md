Vanilla Javascript Carousel
-------

Vanilla Javascript carousel with all the basic features most of us will ever need.

*— Inspired by the blazing fast, lightweight, cross-platform and crazy popular [Vanilla JS](http://vanilla-js.com/)  framework.*

### Demo

[http://zoltantothcom.github.io/vanilla-js-carousel](http://zoltantothcom.github.io/vanilla-js-carousel)

### Usage

1. Include the CSS:

  ```html
  <link rel="stylesheet" href="path/to/vanilla-js-carousel.css" />
  ```

2. Include the script:

  ```html
  <script src="path/to/vanilla-js-carousel.min.js"></script>
  ```

3. Write some markup:

  ```html
  <div class="b-carousel" id="carousel">
      <div class="b-carousel__frame">
          <ul class="b-carousel__items">
              <li><img src="images/nature-1.jpg" alt=""></li>
              <li><img src="images/nature-2.jpg" alt=""></li>
              <li><img src="images/nature-3.jpg" alt=""></li>
              <li><img src="images/nature-4.jpg" alt=""></li>
              <li><img src="images/nature-5.jpg" alt=""></li>
          </ul>
      </div>
  </div>
  ```

4. Initialize the carousel:

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

5. Enjoy!

### Settings

List of options you can apply:

Option | Type | Default | Description
------ | ---- | ------- | -----------
elem | string | carousel | The _id_ of the carousel container in the HTML markup.
interval | int  | 3000 | Auto play interval.
initial | int | 0 | Index of the slide to start on.
autoplay | boolean | false | Enables auto play of slides.
dots | boolean | true | Display navigation dots.
arrows | boolean | true | Display navigation arrows (prev/next).
buttons | boolean | true | Display navigation buttons (stop/play).

### Methods

Methods you can call on the carousel:

Method | Argument | Description
------ | -------- | -----------
initSlide | index: int | Moves the carousel to slide by index
prev | | Triggers previous slide
next | | Triggers next slide
play | | Starts the autoplay
stop | | Stops the autoplay

##### example:

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
