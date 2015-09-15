# Project Overview

A web-based application that reads RSS feeds. The original developer of this application clearly saw the value in testing, they've already included [Jasmine](http://jasmine.github.io/) and even started writing their first test suite! Unfortunately, they decided to move on to start their own company and we're now left with an application with an incomplete test suite. That's where you come in.

# Running the application
1. Unzip the folder
2. Open index.html in a browser
3. There will be two sections
   * Top section is the actual application which should have the feeds
   * Bottom section is the test suite to test the top section
4. There are total of 7 test cases with 4 test suites
   * [Test Suite] RSS Feeds
      - are defined
      - has a URL defined and not empty and valid
      - has a name defined and the name is not empty
  * [Test Suite] The menu
      - is hidden by default
      - changes visibility when the menu icon is clicked
  * [Test Suite] Initial Entries
      - has at least one .entry element
  * [Test Suite] New Feed Selection
      - changes content
5. Application is rendered with rss feeds.
6. All the 7 test specs are passed with 0 failures 
