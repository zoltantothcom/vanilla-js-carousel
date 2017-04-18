/**
* @fileOverview
* @author Zoltan Toth
* @version 2.2.0
*/

/**
* @description
* 1Kb (gzipped) pure JavaScript carousel with all the basic features.
*
* @class
* @param {object} options - User defined settings for the carousel.
* @param {string} options.elem - The HTML id of the carousel container.
* @param {(boolean)} [options.circular=false] - Enables circular mode for the slider.
* @param {(boolean)} [options.autoplay=false] - Enables auto play of slides.
* @param {number} [options.interval=3000] - The interval between slide change.
* @param {number} [options.show=0] - Index of the slide to start on. Numeration begins at 0.
* @param {(boolean)} [options.dots=true] - Display navigation dots.
* @param {(boolean)} [options.arrows=true] - Display navigation arrows (PREV/NEXT).
* @param {(boolean)} [options.buttons=true] - Display navigation buttons (STOP/PLAY).
*
* @param {(string)} [options.crslClass=.js-carousel] -  CSS class of the carousel container.
* @param {(string)} [options.crslArrowPrevClass=.arrow_prev] -  CSS class of the _PREV_ arrow.
* @param {(string)} [options.crslArrowNextClass=.arrow_next] -  CSS class of the _NEXT_ arrow.
* @param {(string)} [options.crslDotsClass=.dots] -  CSS class of the nav dots container.
* @param {(string)} [options.crslButtonStopClass=.btn_play] -  CSS class of the _PLAY_ button.
* @param {(string)} [options.crslButtonPlayClass=.btn_stop] -  CSS class of the _STOP_ button.
*
* @param {(string)} [options.btnPlayText=Play] - Text for _PLAY_ button.
* @param {(string)} [options.btnStopText=Stop] - Text for _STOP_ button.
* @param {(string)} [options.arrPrevText=&laquo;] - Text for _PREV_ arrow.
* @param {(string)} [options.arrNextText=&raquo;] - Text for _NEXT_ arrow.
*/
function Carousel(options) {

    var el = document.getElementById(options.elem || 'carousel'),
        autoplay       = options.autoplay,
        circular       = options.circular,
        interval       = options.interval || 3000,
        controlDots    = options.dots,
        controlArrows  = options.arrows,
        controlButtons = options.buttons,

        crslClass           = options.crslClass           || 'js-carousel',
        crslArrowPrevClass  = options.crslArrowPrevClass  || 'arrow_prev',
        crslArrowNextClass  = options.crslArrowNextClass  || 'arrow_next',
        crslDotsClass       = options.crslDotsClass       || 'dots',
        crslButtonStopClass = options.crslButtonStopClass || 'btn_stop',
        crslButtonPlayClass = options.crslButtonPlayClass || 'btn_play',

        btnPlayText = options.btnPlayText || 'Play',
        btnStopText = options.btnStopText || 'Stop',

        arrNextText = options.arrNextText || '&rsaquo;',
        arrPrevText = options.arrPrevText || '&lsaquo;',

        count   = el.querySelectorAll('li').length,
        initial = 0 || (options.initial >= count) ? count : options.initial,
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
    * If circular - move the last item to the very beginning and off the display area.
    */
    function render() {
        if (controlDots) {
            showDots();
        }

        if (controlArrows) {
            showArrows();
        }

        if (controlButtons) {
            showButtons();
        }

        if (autoplay) {
            play();
        }

        if (circular) {
            moveItem(count - 1, -el.offsetWidth + 'px', 'afterBegin');
        }

        if (initial) {
            show(initial);
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
        var itemToMove = el.querySelectorAll('.' + crslClass + ' > ul li')[i];
        itemToMove.style.marginLeft = marginLeft;

        el.querySelector('.' + crslClass + ' > ul')
          .removeChild(itemToMove);

        el.querySelector('.' + crslClass + ' > ul')
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

        el.appendChild(dotContainer);
        currentDot();
    }

    /**
    * Highlight the corresponding dot of the currently visible carousel item.
    */
    function currentDot() {
        [].forEach.call(el.querySelectorAll('.' + crslDotsClass + ' li'), function(item) {
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
                current = current;
        }

        el.querySelectorAll('.' + crslDotsClass + ' li')[current].classList.add('active');
    }

    /**
    * Moves the carousel to the desired slide on a navigation dot click.
    *
    * @param {object} e - The clicked dot element.
    */
    function scrollToImage(e) {
        if (e.target.tagName === 'LI') {
            show(e.target.getAttribute('data-position'));
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

        el.appendChild(buttonPrev);
        el.appendChild(buttonNext);
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

        el.appendChild(buttonPlay);
        el.appendChild(buttonStop);
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
        item.style.marginLeft = -el.offsetWidth + 'px';
    }

    /**
    * Move the carousel to the desired slide.
    *
    * @param {number} slide - The index of the item.
    * @public
    */
    function show(slide) {
        var delta = current - slide;

        if (delta === 0) {
            return;
        }

        if (delta < 0) {
            for (var i = 0; i < -delta; i++) {
                showNext();
            }
        } else {
            for (var j = 0; j < delta; j++) {
                showPrev();
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
    function showPrev() {
        if (circular) {
            animatePrev(el.querySelectorAll('.' + crslClass + ' > ul li')[0]);
            moveItem(count - 1, -el.offsetWidth + 'px', 'afterBegin');
        } else {
            stop();
            if (current === 0) {
                return;
            }
            animatePrev(el.querySelectorAll('.' + crslClass + ' > ul li')[current - 1]);
        }

        current--;

        if (controlDots) {
            currentDot();
        }
    }

    /**
    * Move the carousel forward.
    * Do the sliding, move the second item to the very end, highlight the 
    * corresponding navigation dot.
    * 
    * @public
    */
    function showNext() {
        if (circular) {
            animateNext(el.querySelectorAll('.' + crslClass + ' > ul li')[1]);
            moveItem(0, '', 'beforeEnd');
        } else {
            if (current === count - 1) {
                stop();
                return;
            }
            animateNext(el.querySelectorAll('.' + crslClass + ' > ul li')[current]);
        }

        current++;

        if (controlDots) {
            currentDot();
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