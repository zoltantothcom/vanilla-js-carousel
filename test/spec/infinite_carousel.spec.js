describe('CAROUSEL - INFINITE', function() {

    describe('general', function() {
        beforeEach(function() {
            jasmine.getFixtures().fixturesPath = fixturePath;
            loadFixtures(regularFixture);

            this.carousel = new Carousel({
                infinite: false
            });
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
                dots: true,
                infinite: true
            });
        });

        it('should go back 1 image on prev()', function() {
            this.carousel.prev();
            var img = $('img')[1];

            expect( imgName(img.src) ).toBe('nature-2.jpg');
        });

        it('should go back 2 images on double prev()', function() {
            this.carousel.prev();
            this.carousel.prev();
            var img = $('img')[1];

            expect( imgName(img.src) ).toBe('nature-1.jpg');
        });

        it('should go back 3 images on triple prev()', function() {
            this.carousel.prev();
            this.carousel.prev();
            this.carousel.prev();
            var img = $('img')[1];

            expect( imgName(img.src) ).toBe('nature-4.jpg');
        });
    });


    describe('next()', function() {
        beforeEach(function() {
            jasmine.getFixtures().fixturesPath = fixturePath;
            loadFixtures(regularFixture);

            this.carousel = new Carousel({
                dots: true,
                initial: 2,
                infinite: true
            });
        });

        it('should go forward 1 image on next()', function() {
            this.carousel.next();
            var img = $('img')[1];

            expect( imgName(img.src) ).toBe('nature-4.jpg');
        });

        it('should go forward 2 images on double next()', function() {
            this.carousel.next();
            this.carousel.next();
            var img = $('img')[1];

            expect( imgName(img.src) ).toBe('nature-1.jpg');
        });

        it('should go forward 3 images on triple next()', function() {
            this.carousel.next();
            this.carousel.next();
            this.carousel.next();
            var img = $('img')[1];

            expect( imgName(img.src) ).toBe('nature-2.jpg');
        });
    });

    describe('show()', function() {
        beforeEach(function() {
            jasmine.getFixtures().fixturesPath = fixturePath;
            loadFixtures(regularFixture);

            this.carousel = new Carousel({
                infinite: true
            });
        });

        it('should show the 1st image on show(0)', function() {
            this.carousel.show(0);
            var img = $('img')[1];

            expect( imgName(img.src) ).toBe('nature-1.jpg');
        });

        it('should show the 3rd image on show(2)', function() {
            this.carousel.show(2);
            var img = $('img')[1];

            expect( imgName(img.src) ).toBe('nature-3.jpg');
        });

        it('should show the last image on show(-1)', function() {
            this.carousel.show(-1);
            var img = $('img')[1];

            expect( imgName(img.src) ).toBe('nature-4.jpg');
        });
    });

});