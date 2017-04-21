describe('CAROUSEL - SINGLE IMAGE', function() {
    beforeEach(function() {
        jasmine.getFixtures().fixturesPath = fixturePath;
        loadFixtures(singleFixture);

        this.carousel = new Carousel({
            initial: 5
        });
    });

    describe('general', function() {
        it('should be defined', function() {
            expect(this.carousel).toBeDefined();
        });

        it('markup should be present', function() {
            expect( $('#carousel') ).toBeDefined();
        });

        it('should have exactly one image', function() {
            expect( $('img').length ).toEqual(1);
        });

        it('should have initial slide at 0', function() {
            expect( this.carousel.live() ).toEqual(0);
        });
    });

    describe('dots', function() {
        it('should have no dots container', function() {
            expect( $('.js-Carousel-dots').length ).toBeFalsy();
        });

        it('should have no navigation dots', function() {
            expect( $('.js-Carousel-dots li').length ).toBeFalsy();
        });
    });

    describe('buttons', function() {
        it('should have no <play> button', function() {
            expect( $('.js-Carousel-btnPlay').length ).toBeFalsy();
        });

        it('should have no <stop> button', function() {
            expect( $('.js-Carousel-btnStop').length ).toBeFalsy();
        });
    });

    describe('arrows', function() {
        it('should have no <prev> arrow', function() {
            expect( $('.js-Carousel-arrowPrev').length ).toBeFalsy();
        });

        it('should have no <next> arrow', function() {
            expect( $('.js-Carousel-arrowNext').length ).toBeFalsy();
        });
    });
});