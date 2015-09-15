## Website Performance Optimization portfolio project
Optimize a provided website with a number of optimization- and performance-related issues so that it achieves a target PageSpeed score and runs at 60 frames per second

### Running the application
### Download the zip file and unzip the file.
### Open the index.html in any browser
### Click on "Cam's Pizzeria" link to view the pizza.html

###Part 1: Optimize index.html screen
#### Performance 1: Load style sheet using javascript on load of the page
#### Performance 2: Minified css files and load  them using non blocking javascript
#### Performance 3: Minified css files and added media as print only
#### Performance 4: Minified js files
#### Performance 5: Moved analytics js code and js file to last line  and minified

###Part 2: Optimize pizza.html screen
#### Performance 1: Minify and Load style sheets using javascript on load of the page
#### Performance 2: Moved code out of the loop and store the container object and length in a vairable so that the dom is not parsed every time.
#### Performance 3: Initialize new variables to store current scroll position and a boolean variable to check scrolling or not
#### Performance 4: Created a  new function which will be called on scroll
#### Performance 5: inserted currentScrollPositionY  which is calculated on scroll.
#### Performance 6: Calculate background pizza image count based on the window height.
