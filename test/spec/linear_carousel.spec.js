describe('CAROUSEL - LINEAR', function() {

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

    describe('prev()', function() {
        beforeEach(function() {
            jasmine.getFixtures().fixturesPath = fixturePath;
            loadFixtures(regularFixture);

            this.carousel = new Carousel({
                initial: 2,
                circular: false
            });
        });

        it('should stop on 1st image on triple prev()', function() {
            this.carousel.prev();
            this.carousel.prev();
            this.carousel.prev();
            var img = $('img')[0];

            expect( imgName(img.src) ).toBe('nature-1.jpg');
        });
    });


    describe('next()', function() {
        beforeEach(function() {
            jasmine.getFixtures().fixturesPath = fixturePath;
            loadFixtures(regularFixture);

            this.carousel = new Carousel({
                dots: true,
                initial: 2,
                circular: false
            });
        });

        it('should stop on last image on triple next()', function() {
            this.carousel.next();
            this.carousel.next();
            this.carousel.next();
            var img = $('img')[3];

            expect( imgName(img.src) ).toBe('nature-4.jpg');
        });
    });

    describe('show()', function() {
        beforeEach(function() {
            jasmine.getFixtures().fixturesPath = fixturePath;
            loadFixtures(regularFixture);

            this.carousel = new Carousel({
                circular: false
            });
        });

        it('should show the 1st image on show(0)', function() {
            this.carousel.show(0);
            var img = $('img')[0];

            expect( imgName(img.src) ).toBe('nature-1.jpg');
        });

        it('should show the 4th image on show(3)', function() {
            this.carousel.show(3);
            var img = $('img')[3];

            expect( imgName(img.src) ).toBe('nature-4.jpg');
        });

        xit('should show the last image on show(-1)', function() {
            this.carousel.show(-9);
            var img = $('img')[1];

            expect( imgName(img.src) ).toBe('nature-4.jpg');
        });
    });

});