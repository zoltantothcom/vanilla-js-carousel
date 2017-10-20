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
            expect( $('.js-Carousel-dots').length ).toBeFalsy();
        });

        it('should NOT create the navigation dots', function() {
            expect( $('.js-Carousel-dots li').length ).toBeFalsy();
        });

        // buttons
        it('should NOT create the <play> button', function() {
            expect( $('.js-Carousel-btnPlay').length ).toBeFalsy();
        });

        it('should NOT create the <stop> button', function() {
            expect( $('.js-Carousel-btnStop').length ).toBeFalsy();
        });

        //arrows
        it('should NOT create the <prev> arrow', function() {
            expect( $('.js-Carousel-arrowPrev').length ).toBeFalsy();
        });

        it('should NOT create the <next> arrow', function() {
            expect( $('.js-Carousel-arrowNext').length ).toBeFalsy();
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
            expect( $('.js-Carousel-dots').length ).toBe(1);
        });

        it('should create the navigation dots', function() {
            expect( $('.js-Carousel-dots li').length ).toBeGreaterThan(1);
        });

        // buttons
        it('should create the <play> button', function() {
            expect( $('.js-Carousel-btnPlay').length ).toBe(1);
        });

        it('should create the <stop> button', function() {
            expect( $('.js-Carousel-btnStop').length ).toBe(1);
        });

        //arrows
        it('should create the <prev> arrow', function() {
            expect( $('.js-Carousel-arrowPrev').length ).toBe(1);
        });

        it('should create the <next> arrow', function() {
            expect( $('.js-Carousel-arrowNext').length ).toBe(1);
        });

        // initial 
        it('should set the initial slide according to defined option ', function() {
            expect( this.carousel.live() ).toEqual(2);
        });
    });


    describe('user defined titles', function() {
        beforeEach(function() {
            jasmine.getFixtures().fixturesPath = fixturePath;
            loadFixtures(regularFixture);

            this.carousel = new Carousel({
                arrows: true,
                buttons: true,
                
                btnPlayText: 'Start',
                btnStopText: 'Pause',
                arrNextText: 'NEXT',
                arrPrevText: 'PREV',
            });
        });

        it('should be exactly one <play> button accepting text', function() {
            expect( $('.js-Carousel-btnPlay').length ).toEqual(1);
            expect( $('.js-Carousel-btnPlay') ).toContainText('Start');
        });

        it('should be exactly one <stop> button accepting text', function() {
            expect( $('.js-Carousel-btnStop').length ).toEqual(1);
            expect( $('.js-Carousel-btnStop') ).toContainText('Pause');
        });

        it('should be exactly one <prev> arrow accepting text', function() {
            expect( $('.js-Carousel-arrowPrev').length ).toEqual(1);
            expect( $('.js-Carousel-arrowPrev') ).toContainText('PREV');
        });

        it('should be exactly one <next> arrow accepting text', function() {
            expect( $('.js-Carousel-arrowNext').length ).toEqual(1);
            expect( $('.js-Carousel-arrowNext') ).toContainText('NEXT');
        });
    });


    describe('live()', function() {
        beforeEach(function() {
            jasmine.getFixtures().fixturesPath = fixturePath;
            loadFixtures(regularFixture);

            this.carousel = new Carousel({
                infinite: true,
                dots: false
            });
        });

        it('should equal 0 upon default start', function() {
            expect( this.carousel.live() ).toEqual(0);
        });

        it('should equal 3 on show(3)', function() {
            this.carousel.show(3);
            expect( this.carousel.live() ).toEqual(3);
        });

        it('should equal 1 on show(5)', function() {
            this.carousel.show(5);
            expect( this.carousel.live() ).toEqual(1);
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
            jasmine.clock().install();
            jasmine.getFixtures().fixturesPath = fixturePath;
            loadFixtures(regularFixture);

            this.carousel = new Carousel({
                dots: true,
                autoplay: true
            });
        });
          
        afterEach(function() {
            jasmine.clock().uninstall();
        });

        it ("should ignore clicks on dot container", function() {
            spyEvent = spyOnEvent('.js-Carousel-dots', 'click');

            $('.js-Carousel-dots').click();

            expect(spyEvent).toHaveBeenTriggered();
            expect( this.carousel.live() ).toEqual(0);
        });
          
        it ("should set the current slide according to clicked dot", function() {
            spyEvent = spyOnEvent('.js-Carousel-dots li:eq(2)', 'click');

            $('.js-Carousel-dots li:eq(2)').click();

            expect(spyEvent).toHaveBeenTriggered();
            expect( this.carousel.live() ).toEqual(2);
        });

        it ("should reset the interval on dot click", function() {
            jasmine.clock().tick(2950);
            $('.js-Carousel-dots li:eq(2)').click();

            jasmine.clock().tick(2950);
            expect( this.carousel.live() ).toEqual(2);

            jasmine.clock().tick(3050);
            expect( this.carousel.live() ).toEqual(3);
        });

        it ("should just set the desired slide if not playing", function() {
            this.carousel.stop();

            jasmine.clock().tick(2500);
            $('.js-Carousel-dots li:eq(2)').click();

            jasmine.clock().tick(9000);
            expect( this.carousel.live() ).toEqual(2);
        });
    });

    
    describe("navigation arrows", function() {
        var spyEvent;

        beforeEach(function() {
            jasmine.clock().install();
            jasmine.getFixtures().fixturesPath = fixturePath;
            loadFixtures(regularFixture);

            this.carousel = new Carousel({
                arrows: true,
                autoplay: true,
                infinite: true
            });
        });
          
        afterEach(function() {
            jasmine.clock().uninstall();
        });

        it ("should go to next slide on <NEXT> arrow click", function() {
            spyEvent = spyOnEvent('.js-Carousel-arrowNext', 'click');

            $('.js-Carousel-arrowNext').click();

            expect(spyEvent).toHaveBeenTriggered();
            expect( this.carousel.live() ).toEqual(1);
        });

        it ("should reset the interval on arrow click", function() {
            jasmine.clock().tick(2999);
            expect( this.carousel.live() ).toEqual(0);

            $('.js-Carousel-arrowNext').click();

            jasmine.clock().tick(2999);
            expect( this.carousel.live() ).toEqual(1);

            jasmine.clock().tick(3000);
            expect( this.carousel.live() ).toEqual(2);
        });

        it ("should just move to next slide if not playing", function() {
            this.carousel.stop();

            $('.js-Carousel-arrowNext').click();
            $('.js-Carousel-arrowNext').click();

            jasmine.clock().tick(9999);
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

            spyEvent = spyOnEvent('.js-Carousel-btnStop', 'click');

            $('.js-Carousel-btnStop').click();

            expect('click').toHaveBeenTriggeredOn('.js-Carousel-btnStop');
            expect(spyEvent).toHaveBeenTriggered();
        });
    });

});