/**
* @fileOverview
* @author Zoltan Toth
* @version 0.1
*/

/**
* @description
* Vanilla Javascript carousel with all the basic features most of us will ever need.
*
* @class
* @param {object} options - User defined settings for the carousel.
* @param {string} options.el - The HTML id of the carousel container.
* @param {(boolean|number)} [options.autoplay=false] - Enables auto play of slides.
* @param {number} [options.interval=3000] - The interval between slide change.
* @param {number} [options.initial=0] - Index of the slide to start on. Numeration begins at 0.
* @param {(boolean|number)} [options.dots=true] - Display navigation dots.
* @param {(boolean|number)} [options.arrows=true] - Display navigation arrows (prev/next).
* @param {(boolean|number)} [options.buttons=true] - Display navigation buttons (stop/play).
*/
function Carousel(options) {
    var el = document.getElementById(options.elem),
        autoplay       = options.autoplay || false,
        interval       = options.interval || 3000,
        controlDots    = options.dots && true,
        controlArrows  = options.arrows && true,
        controlButtons = options.buttons && true,

        count   = el.querySelectorAll('li').length,
        initial = 0 || (options.initial >= count) ? count : options.initial,
        current = 0,
        cycle   = null;

    /**
    * Render the carousel if more than one slide. 
    * Otherwise just show the single item.
    */
    if (count > 1) render();

    /**
    * Render the carousel and all the navigation elements (arrows, dots, 
    * play/stop buttons) if needed. Start with a particular slide, if set.
    * Move the last item to the very beginning and off the display area.
    */
    function render() {
        if (controlDots) showDots();
        if (controlArrows) showArrows();
        if (controlButtons) showButtons();
        if (autoplay) play();

        moveItem(count - 1, -el.offsetWidth + 'px', 'afterBegin');

        if (initial) initSlide(initial);
    }

    /**
    * Helper for moving items - last to be first or first to be the last. Needed 
    * for infinite rotation of the carousel.
    *
    * @param {number} i - Position of the list item to move (either first or last).
    * @param {number} marginLeft - Left margin to position the item off-screen
    *        at the beginning or no margin at the end.
    * @param {string} position - Where to insert the item. One of the following -
    *        'afterBegin' or 'beforeEnd'.
    */
    function moveItem(i, marginLeft, position) {
        var itemToMove = el.querySelectorAll(".b-carousel__items li")[i];
        itemToMove.style.marginLeft = marginLeft;

        el.querySelector(".b-carousel__items").removeChild(itemToMove);
        el.querySelector(".b-carousel__items").insertAdjacentHTML(position, itemToMove.outerHTML);
    }

    /**
    * Create the navigation dots and attach to carousel.
    */
    function showDots() {
        var dotContainer = document.createElement("ul");
        dotContainer.classList.add('b-carousel__nav-dots');
        dotContainer.addEventListener("click", scrollToImage.bind(this));

        for (var i = 0; i < count; i++) {
            var dotElement = document.createElement("li");
            dotElement.setAttribute('data-position', i);

            dotContainer.appendChild(dotElement);
        }

        el.appendChild(dotContainer);
        currentDot();
    }

    /**
    * Highlight the corresponding dot of the currently visible carousel item.
    */
    function currentDot() {
        [].forEach.call(el.querySelectorAll(".b-carousel__nav-dots li"), function(item) {
            item.classList.remove('active');
        });

        switch (current) {
            case -1:
                current = count - 1;
                break;
            case count:
                current = 0;
                break;
            default:
                current;
        }

        el.querySelectorAll(".b-carousel__nav-dots li")[current].classList.add("active");
    }

    /**
    * Moves the carousel to the desired slide on a navigation dot click.
    *
    * @param {object} e - The clicked dot element.
    */
    function scrollToImage(e) {
        if (e.target.tagName !== "LI") return;
        initSlide(e.target.getAttribute('data-position'));
    }

    /**
    * Create the navigation arrows (prev/next) and attach to carousel.
    */
    function showArrows() {
        var buttonPrev = document.createElement("button");
        buttonPrev.innerHTML = "&lsaquo;"
        buttonPrev.classList.add('b-carousel__nav-arrow_prev');

        var buttonNext = document.createElement("button");
        buttonNext.innerHTML = "&rsaquo;"
        buttonNext.classList.add('b-carousel__nav-arrow_next');

        buttonPrev.addEventListener('click', prev);
        buttonNext.addEventListener('click', next);

        el.appendChild(buttonPrev);
        el.appendChild(buttonNext);
    }

    /**
    * Create the navigation buttons (play/stop) and attach to carousel.
    */
    function showButtons() {
        var buttonPlay = document.createElement("button");
        buttonPlay.innerHTML = "Play";
        buttonPlay.classList.add('b-carousel__button_play');
        buttonPlay.addEventListener("click", play);

        var buttonStop = document.createElement("button");
        buttonStop.innerHTML = "Stop";
        buttonStop.classList.add('b-carousel__button_stop');
        buttonStop.addEventListener("click", stop);

        el.appendChild(buttonPlay);
        el.appendChild(buttonStop);
    }

    /**
    * Animate the carousel to go back 1 slide. Moves the very first (off-screen)
    * item to the visible area.
    *
    * @param {object} item - The element to move into view.
    * @param {number} marginLeft - Left margin being changed from -(item width)
    *                 to zero in order to move the item.
    *                 If more than 0, stop and set to initial - the item is in place.
    */
    function animatePrev(item, marginLeft) {
        if (marginLeft >= 0) {
            item.style.marginLeft = "";
            return;
        }

        item.style.marginLeft = marginLeft + "px";

        setTimeout(function() {
            animatePrev(item, marginLeft + 100);
        }, 20);
    }

    /**
    * Animate the carousel to go forward 1 slide.
    *
    * @param {object} item - The element to move into view.
    * @param {number} marginLeft - Left margin being changed from zero
    *                 to -(item width) in order to move the item off-screen.
    *                 If less than -(item width), stop and set to -(item width) - 
    *                 the item is out of sight.
    */
    function animateNext(item, marginLeft) {
        if (marginLeft <= -el.offsetWidth) {
            item.style.marginLeft = -el.offsetWidth + "px";
            return;
        }

        item.style.marginLeft = marginLeft + "px";

        setTimeout(function() {
            animateNext(item, marginLeft - 100);
        }, 20);
    }

    /**
    * Move the carousel to the desired slide.
    *
    * @param {number} slide - The index of the item.
    * @public
    */
    function initSlide(slide) {
        var delta = current - slide;

        if (delta === 0) return;

        if (delta < 0) {
            for (var i = 0; i < -delta; i++) {
                next();
            }
        } else {
            for (var i = 0; i < delta; i++) {
                prev();
            }
        }
    }

    /**
    * Move the carousel back.
    * Do the sliding, move the last item to the very beginning, highlight the 
    * corresponding navigation dot.
    * 
    * @public
    */
    function prev() {
        animatePrev(el.querySelectorAll(".b-carousel__items li")[0], 0);
        moveItem(count - 1, -el.offsetWidth + 'px', 'afterBegin');
        current--;
        currentDot();
    }

    /**
    * Move the carousel forward.
    * Do the sliding, move the second item to the very end, highlight the 
    * corresponding navigation dot.
    * 
    * @public
    */
    function next() {
        animateNext(el.querySelectorAll(".b-carousel__items li")[1], -el.offsetWidth);
        moveItem(0, '', 'beforeEnd');
        current++;
        currentDot();
    }

    /**
    * Start the auto play.
    * If already playing do nothing.
    * 
    * @public
    */
    function play() {
        if (cycle) return;
        cycle = setInterval(next.bind(this), interval);
    }

    /**
    * Stop the auto play.
    * 
    * @public
    */
    function stop() {
        clearInterval(cycle);
        cycle = null;
    }

    this.initSlide = initSlide;
    this.prev = prev;
    this.next = next;
    this.play = play;
    this.stop = stop;
}
