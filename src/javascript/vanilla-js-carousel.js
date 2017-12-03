/**
* @fileOverview
* @author Zoltan Toth
* @version 3.1.2
*/

/**
* @description
* 1Kb (gzipped) pure JavaScript carousel with all the basic features.
*
* @class
* @param {object} options - User defined settings for the carousel.
* @param {string} options.elem [options.elem=carousel] - The HTML id of the carousel container.
* @param {(boolean)} [options.infinite=false] - Enables infinite mode for the carousel.
* @param {(boolean)} [options.autoplay=false] - Enables auto play for slides.
* @param {number} [options.interval=3000] - The interval between slide change.
* @param {number} [options.show=0] - Index of the slide to start on. Numeration begins at 0.
*
* @param {(boolean)} [options.dots=true] - Display navigation dots.
* @param {(boolean)} [options.arrows=true] - Display navigation arrows (PREV/NEXT).
* @param {(boolean)} [options.buttons=true] - Display navigation buttons (STOP/PLAY).
*
* @param {(string)} [options.btnPlayText=Play] - Text for _PLAY_ button.
* @param {(string)} [options.btnStopText=Stop] - Text for _STOP_ button.
* @param {(string)} [options.arrPrevText=&laquo;] - Text for _PREV_ arrow.
* @param {(string)} [options.arrNextText=&raquo;] - Text for _NEXT_ arrow.
*/
function Carousel(options) {
    var element  = document.getElementById(options.elem || 'carousel'),
        interval = options.interval || 3000,

        btnPlayText = options.btnPlayText || 'Play',
        btnStopText = options.btnStopText || 'Stop',

        arrNextText = options.arrNextText || '&rsaquo;',
        arrPrevText = options.arrPrevText || '&lsaquo;',

        crslClass           = 'js-Carousel',
        crslArrowPrevClass  = 'js-Carousel-arrowPrev',
        crslArrowNextClass  = 'js-Carousel-arrowNext',
        crslDotsClass       = 'js-Carousel-dots',
        crslButtonStopClass = 'js-Carousel-btnStop',
        crslButtonPlayClass = 'js-Carousel-btnPlay',

        count   = element.querySelectorAll('li').length,
        current = 0,
        cycle   = null;

    /**
    * Render the carousel if more than one slide. 
    * Otherwise just show the single item.
    */
    if (count > 1) {
        render();
    }

    /**
    * Render the carousel and all the navigation elements (arrows, dots, 
    * play/stop buttons) if needed. Start with a particular slide, if set.
    * If infinite - move the last item to the very beginning and off the display area.
    */
    function render() {
        var actions = {
            dots: function() {
                return showDots();
            },
            arrows: function() {
                return showArrows();
            },
            buttons: function() {
                return showButtons();
            },
            autoplay: function() {
                return play();
            },
            infinite: function() {
                return moveItem(count - 1, -element.offsetWidth + 'px', 'afterBegin');
            },
            initial: function() {
                var initial = 0 || (options.initial >= count) ? count : options.initial;
                return show(initial);
            }
        };

        for (var key in actions) {
            if (options.hasOwnProperty(key) && options[key]) {
                actions[key]();
            }
        }
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
        var itemToMove = element.querySelectorAll('.' + crslClass + ' > ul li')[i];
        itemToMove.style.marginLeft = marginLeft;

        element.querySelector('.' + crslClass + ' > ul')
          .removeChild(itemToMove);

        element.querySelector('.' + crslClass + ' > ul')
          .insertAdjacentHTML(position, itemToMove.outerHTML);
    }

    /**
    * Create the navigation dots and attach to carousel.
    */
    function showDots() {
        var dotContainer = document.createElement('ul');
        dotContainer.classList.add(crslDotsClass);
        dotContainer.addEventListener('click', scrollToImage.bind(this));

        for (var i = 0; i < count; i++) {
            var dotElement = document.createElement('li');
            dotElement.setAttribute('data-position', i);

            dotContainer.appendChild(dotElement);
        }

        element.appendChild(dotContainer);
        currentDot();
    }

    /**
    * Highlight the corresponding dot of the currently visible carousel item.
    */
    function currentDot() {
        [].forEach.call(element.querySelectorAll('.' + crslDotsClass + ' li'), function(item) {
            item.classList.remove('is-active');
        });

        element.querySelectorAll('.' + crslDotsClass + ' li')[current].classList.add('is-active');
    }

    /**
    * Moves the carousel to the desired slide on a navigation dot click.
    *
    * @param {object} e - The clicked dot element.
    */
    function scrollToImage(e) {
        if (e.target.tagName === 'LI') {
            show(e.target.getAttribute('data-position'));

            resetInterval();
        }
    }

    /**
    * Create the navigation arrows (prev/next) and attach to carousel.
    */
    function showArrows() {
        var buttonPrev = document.createElement('button');
        buttonPrev.innerHTML = arrPrevText;
        buttonPrev.classList.add(crslArrowPrevClass);

        var buttonNext = document.createElement('button');
        buttonNext.innerHTML = arrNextText;
        buttonNext.classList.add(crslArrowNextClass);

        buttonPrev.addEventListener('click', showPrev);
        buttonNext.addEventListener('click', showNext);

        element.appendChild(buttonPrev);
        element.appendChild(buttonNext);
    }

    /**
    * Create the navigation buttons (play/stop) and attach to carousel.
    */
    function showButtons() {
        var buttonPlay = document.createElement('button');
        buttonPlay.innerHTML = btnPlayText;
        buttonPlay.classList.add(crslButtonPlayClass);
        buttonPlay.addEventListener('click', play);

        var buttonStop = document.createElement('button');
        buttonStop.innerHTML = btnStopText;
        buttonStop.classList.add(crslButtonStopClass);
        buttonStop.addEventListener('click', stop);

        element.appendChild(buttonPlay);
        element.appendChild(buttonStop);
    }

    /**
    * Animate the carousel to go back 1 slide. Moves the very first (off-screen)
    * item to the visible area.
    *
    * @param {object} item - The element to move into view.
    */
    function animatePrev(item) {
        item.style.marginLeft = '';
    }

    /**
    * Animate the carousel to go forward 1 slide.
    *
    * @param {object} item - The element to move into view.
    */
    function animateNext(item) {
        item.style.marginLeft = -element.offsetWidth + 'px';
    }

    /**
    * Move the carousel to the desired slide.
    *
    * @param {number} slide - The index of the item.
    * @public
    */
    function show(slide) {
        var delta = current - slide;

        if (delta < 0) {
            moveByDelta(-delta, showNext);
        } else {
            moveByDelta(delta, showPrev);
        }
    }

    /**
    * Helper to move the slides by index.
    * 
    * @param {number} delta - how many slides to move.
    * @param {function} direction - function to move forward or back.
    */
    function moveByDelta(delta, direction) {
        for (var i = 0; i < delta; i++) {
            direction();
        }
    }

    /**
    * Move the carousel back.
    * 
    * @public
    */
    function showPrev() {
        if (options.infinite) {
            showPrevInfinite();
        } else {
            showPrevLinear();
        }

        resetInterval();
    }

    /**
    * Helper function to show the previous slide for INFINITE carousel.
    * Do the sliding, move the last item to the very beginning.
    */
    function showPrevInfinite() {
        animatePrev(element.querySelectorAll('.' + crslClass + ' > ul li')[0]);
        moveItem(count - 1, -element.offsetWidth + 'px', 'afterBegin');

        adjustCurrent(-1);
    }

    /**
    * Helper function to show the previous slide for LINEAR carousel.
    * Stop the autoplay if user goes back. If on the first slide - do nothing.
    */
    function showPrevLinear() {
        stop();
        if (current === 0) {
            return;
        }
        animatePrev(element.querySelectorAll('.' + crslClass + ' > ul li')[current - 1]);
        
        adjustCurrent(-1);
    }

    /**
    * Move the carousel forward.
    * 
    * @public
    */
    function showNext() {
        if (options.infinite) {
            showNextInfinite();
        } else {
            showNextLinear();
        }

        resetInterval();
    }

    /**
    * Helper function to show the next slide for INFINITE carousel.
    * Do the sliding, move the second item to the very end.
    */
    function showNextInfinite() {
        animateNext(element.querySelectorAll('.' + crslClass + ' > ul li')[1]);
        moveItem(0, '', 'beforeEnd');

        adjustCurrent(1);
    }

    /**
    * Helper function to show the next slide for LINEAR carousel.
    * If on the last slide - stop the play and do nothing else.
    */
    function showNextLinear() {
        if (current === count - 1) {
            stop();
            return;
        }
        animateNext(element.querySelectorAll('.' + crslClass + ' > ul li')[current]);

        adjustCurrent(1);
    }

    /**
    * Adjust _current_ and highlight the respective dot.
    *
    * @param {number} val - defines which way current should be corrected.
    */
    function adjustCurrent(val) {
        current += val;

        switch (current) {
            case -1:
                current = count - 1;
                break;
            case count:
                current = 0;
                break;
            default:
                current = current;
        }

        if (options.dots) {
            currentDot();
        }
    }

    /**
    * Reset the autoplay interval.
    */
    function resetInterval() {
        if (cycle) {
            stop();
            play();
        }
    }

    /**
    * Start the auto play.
    * If already playing do nothing.
    * 
    * @public
    */
    function play() {
        if (cycle) {
            return;
        }
        cycle = setInterval(showNext.bind(this), interval);
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

    /**
    * Returns the current slide index.
    * 
    * @public
    */
    function live() {
        return current;
    }

    return {
        'live': live,
        'show': show,
        'prev': showPrev,
        'next': showNext,
        'play': play,
        'stop': stop
    };
}