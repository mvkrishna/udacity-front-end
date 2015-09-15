/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* Test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('has a URL defined and not empty and valid', function() {
      allFeeds.forEach(function(feed) {
        //URL defined
        expect(feed.url).toBeDefined();
        //URL is not empty
        expect($.trim(feed.url) != '').toBe(true);
        //URL is valid
        //http://stackoverflow.com/questions/8188645/javascript-regex-to-match-a-url-in-a-field-of-text
        var regex = new RegExp('(http|https)://[a-z0-9\-_]+(\.[a-z0-9\-_]+)+([a-z0-9\-\.,@\?^=%&;:/~\+#]*[a-z0-9\-@\?^=%&;/~\+#])?', 'i');
        expect(regex.test(feed.url)).toBe(true);
      });
    });

    /* Test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('has a name defined and the name is not empty', function() {
      allFeeds.forEach(function(feed) {
        //feed name is defined
        expect(feed.name).toBeDefined();
        //feed name is not empty
        expect($.trim(feed.name) != '').toBe(true);
      });
    });
  });

  /* Test suite named "The menu" */
  describe('The menu', function() {

    /* Test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    it('is hidden by default', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    /* Test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    it('changes visibility when the menu icon is clicked', function() {
      //Trigger click event
      $('.menu-icon-link').trigger('click');
      //Verify it is not hidden
      expect($('body').hasClass('menu-hidden')).toBe(false);
      //Trigger click event
      $('.menu-icon-link').trigger('click');
      //Verify it is not hidden
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

  });

  /* New test suite named "Initial Entries" */
  describe('Initial Entries', function() {
    beforeEach(function(done) {
      loadFeed(0, done);
    });

    /* Test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test wil require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    it('has at least one .entry element', function(done) {
      expect($('.feed').find('.entry').length >= 1).toBe(true);
      done();
    });

  });

  /* New test suite named "New Feed Selection"*/
  describe('New Feed Selection', function() {
    var beforeContent;
    var afterContent;
    beforeEach(function(done) {
      expect(allFeeds.length >= 2).toBe(true);
      loadFeed(0, function() {
        //First Load feed
        beforeContent = $('.header-title').text() + $('.feed').find('.entry').text().replace(/ +/g, " ");
        loadFeed(1, function() {
          //Second Load feed
          afterContent = $('.header-title').text() + $('.feed').find('.entry').text().replace(/ +/g, " ");
          done();
        });
      });
    });

    /* Test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    it('changes content', function(done) {
      //Check that the before and after contents are not equal
      expect(beforeContent != afterContent).toBe(true);
      done();
    });

  });
}());
