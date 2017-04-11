describe('CAROUSEL - MULTI IMAGE', function() {

    describe('general', function() {
        beforeEach(function() {
            jasmine.getFixtures().fixturesPath = fixturePath;
            loadFixtures(regularFixture);

            this.carousel = new Carousel({});
        });

        it('should be defined', function() {
            expect(this.carousel).toBeDefined();
        });

        it('markup should be present', function() {
            expect( $('#carousel') ).toBeDefined();
        });

        it('should have at least one image', function() {
            expect( $('img').length ).toBeGreaterThan(0);
        });
    });


    describe('methods', function() {
        beforeEach(function() {
            jasmine.getFixtures().fixturesPath = fixturePath;
            loadFixtures(regularFixture);

            this.carousel = new Carousel({
                elem: 'carousel'
            });
        });

        it('should have a play() method', function() {
            expect(typeof this.carousel.play).toBe('function');
        });

        it('should have a stop() method', function() {
            expect(typeof this.carousel.stop).toBe('function');
        });

        it('should have a prev() method', function() {
            expect(typeof this.carousel.prev).toBe('function');
        });

        it('should have a next() method', function() {
            expect(typeof this.carousel.next).toBe('function');
        });

        it('should have a show() method', function() {
            expect(typeof this.carousel.show).toBe('function');
        });

        it('should have a live() method', function() {
            expect(typeof this.carousel.live).toBe('function');
        });
    });


    describe('controls off', function() {
        beforeEach(function() {
            jasmine.getFixtures().fixturesPath = fixturePath;
            loadFixtures(regularFixture);

            this.carousel = new Carousel({
                elem: 'carousel',
                dots: false,
                arrows: false,
                buttons: false
            });
        });

        // dots
        it('should NOT create the dots container', function() {
            expect( $('.dots').length ).toBeFalsy();
        });

        it('should NOT create the navigation dots', function() {
            expect( $('.dots li').length ).toBeFalsy();
        });

        // buttons
        it('should NOT create the <play> button', function() {
            expect( $('.btn_play').length ).toBeFalsy();
        });

        it('should NOT create the <stop> button', function() {
            expect( $('.btn_stop').length ).toBeFalsy();
        });

        //arrows
        it('should NOT create the <prev> arrow', function() {
            expect( $('.arrow_prev').length ).toBeFalsy();
        });

        it('should NOT create the <next> arrow', function() {
            expect( $('.arrow_next').length ).toBeFalsy();
        });

        // initial 
        it('should have the initial slide at 0', function() {
            expect( this.carousel.live() ).toEqual(0);
        });
    });


    describe('controls on', function() {
        beforeEach(function() {
            jasmine.getFixtures().fixturesPath = fixturePath;
            loadFixtures(regularFixture);

            this.carousel = new Carousel({
                elem: 'carousel',
                dots: true,
                arrows: true,
                buttons: true,
                initial: 2,
                autoplay: true
            });
        });

        // dots
        it('should create the dots container', function() {
            expect( $('.dots').length ).toBe(1);
        });

        it('should create the navigation dots', function() {
            expect( $('.dots li').length ).toBeGreaterThan(1);
        });

        // buttons
        it('should create the <play> button', function() {
            expect( $('.btn_play').length ).toBe(1);
        });

        it('should create the <stop> button', function() {
            expect( $('.btn_stop').length ).toBe(1);
        });

        //arrows
        it('should create the <prev> arrow', function() {
            expect( $('.arrow_prev').length ).toBe(1);
        });

        it('should create the <next> arrow', function() {
            expect( $('.arrow_next').length ).toBe(1);
        });

        // initial 
        it('should set the initial slide according to defined option ', function() {
            expect( this.carousel.live() ).toEqual(2);
        });
    });


    describe('user defined titles and classes', function() {
        beforeEach(function() {
            jasmine.getFixtures().fixturesPath = fixturePath;
            loadFixtures(regularFixture);

            this.carousel = new Carousel({
                arrows: true,
                buttons: true,
                
                btnPlayText: 'Start',
                crslButtonPlayClass: 'start',

                btnStopText: 'Pause',
                crslButtonStopClass: 'pause',

                arrNextText: 'NEXT',
                crslArrowNextClass: 'forward',

                arrPrevText: 'PREV',
                crslArrowPrevClass: 'backward'
            });
        });

        it('should be exactly one <play> button accepting text and CSS class', function() {
            expect( $('button') ).toHaveClass('start');
            expect( $('.start').length ).toEqual(1);
            expect( $('.start') ).toContainText('Start');
        });

        it('should be exactly one <stop> button accepting text and CSS class', function() {
            expect( $('button') ).toHaveClass('pause');
            expect( $('.pause').length ).toEqual(1);
            expect( $('.pause') ).toContainText('Pause');
        });

        it('should be exactly one <prev> arrow accepting text and CSS class', function() {
            expect( $('button') ).toHaveClass('backward');
            expect( $('.backward').length ).toEqual(1);
            expect( $('.backward') ).toContainText('PREV');
        });

        it('should be exactly one <next> arrow accepting text and CSS class', function() {
            expect( $('button') ).toHaveClass('forward');
            expect( $('.forward').length ).toEqual(1);
            expect( $('.forward') ).toContainText('NEXT');
        });
    });


    describe('live()', function() {
        beforeEach(function() {
            jasmine.getFixtures().fixturesPath = fixturePath;
            loadFixtures(regularFixture);

            this.carousel = new Carousel({
                dots: true
            });
        });

        it('should equal 0 upon default start', function() {
            expect( this.carousel.live() ).toEqual(0);
        });

        it('should equal 3 on show(3)', function() {
            this.carousel.show(3);
            expect( this.carousel.live() ).toEqual(3);
        });
    });


    describe('play()', function() {
        beforeEach(function() {
            jasmine.getFixtures().fixturesPath = fixturePath;
            loadFixtures(regularFixture);

            this.carousel = new Carousel({});
        });

        it('should start', function() {
            spyOn(this.carousel, 'play');

            var cycle = this.carousel.play();

            expect(this.carousel.play).toHaveBeenCalled();
            expect(cycle).not.toBeNull();
        });
    });


    describe('stop()', function() {
        beforeEach(function() {
            jasmine.getFixtures().fixturesPath = fixturePath;
            loadFixtures(regularFixture);

            this.carousel = new Carousel({});
        });

        it('should stop', function() {
            spyOn(this.carousel, 'stop');

            this.carousel.play();
            this.carousel.play();

            this.carousel.stop();

            expect(this.carousel.stop).toHaveBeenCalled();
            expect(this.carousel.cycle).toBeNull;
        });
    });


    describe("navigation dots", function() {
        var spyEvent;
       
        beforeEach(function() {
            jasmine.getFixtures().fixturesPath = fixturePath;
            loadFixtures(regularFixture);

            this.carousel = new Carousel({
                dots: true
            });
        });

        it ("should ignore clicks on dot container", function() {
            spyEvent = spyOnEvent('.dots', 'click');

            $('.dots').click();

            expect(spyEvent).toHaveBeenTriggered();
            expect( this.carousel.live() ).toEqual(0);
        });
          
        it ("should set the current slide according to clicked dot", function() {
            spyEvent = spyOnEvent('.dots li:eq(2)', 'click');

            $('.dots li:eq(2)').click();

            expect(spyEvent).toHaveBeenTriggered();
            expect( this.carousel.live() ).toEqual(2);
        });
    });


    describe("STOP button click", function() {
        var spyEvent;
       
        beforeEach(function() {
            jasmine.getFixtures().fixturesPath = fixturePath;
            loadFixtures(regularFixture);

            this.carousel = new Carousel({
                buttons: true
            });
        });
          
        it ("should invoke the stop() method", function() {
            spyOn(this.carousel, 'play');
            this.carousel.play();
            expect(this.carousel.play).toHaveBeenCalled();

            this.carousel.stop();

            spyEvent = spyOnEvent('.btn_stop', 'click');

            $('.btn_stop').click();

            expect('click').toHaveBeenTriggeredOn('.btn_stop');
            expect(spyEvent).toHaveBeenTriggered();
        });
    });

});