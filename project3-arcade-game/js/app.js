
//--------------------------------------------------------------------
// Common object Item which is a super class for Enemy and Player
//--------------------------------------------------------------------

//Common object to create both enemy and player
var Item = function(x, y, sprite) {
  this.sprite = sprite;
  this.x = x;
  this.y = y;
};
Item.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(x, y, sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
    Item.call(this, x, y, sprite);
    //Setting the Enemy speed
    this.speed = this.getRandomSpeed();
};

Enemy.prototype = Object.create(Item.prototype);
Enemy.prototype.startingPosition = [68, 140, 230];
Enemy.prototype.hitPosition = {'x': 70, 'y': 40};
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= (canvas.width + this.hitPosition.x/2)) {
      this.x += this.speed  * dt;
    } else {
      this.x = -this.hitPosition.x;
      this.y = this.getRandomObject(this.startingPosition);
    }
  //handle collisions with player
  if (this.checkCollision(this, player)) {
    player.reset();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.getRandomSpeed = function() {
    return Math.floor(Math.random()*(100 - 50 + 1) + 50);
};

//Function to get a random object from the array.
Enemy.prototype.getRandomObject = function(array) {
    return array[Math.floor(Math.random() * array.length)];
};

//Check collision method used to verify whether the enemy
//object is collided with player or not
Enemy.prototype.checkCollision = function(item, player) {
  return (player.x > item.x - item.hitPosition.x/2 &&
          player.x < item.x + item.hitPosition.x/2 &&
          player.y > item.y - item.hitPosition.y/2 &&
          player.y < item.y + item.hitPosition.y/2);
};
//--------------------------------------------------------------------
// Player object
//--------------------------------------------------------------------
// Player
var Player = function(x, y, sprite) {
  Item.call(this, x, y, sprite);
};

Player.prototype = Object.create(Item.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function() {
//[up, right, down, left]
var boundaries = [0, 400, 400, 0];
  // Move player
  var stepX = 101;
  var stepY = 83;
  switch(this.action) {
    case 'up':
      if (this.y > boundaries[0]) {
        this.y -= stepY;
      }
      break;
    case 'right':
      if (this.x < boundaries[1]) {
        this.x += stepX;
      }
      break;
    case 'down':
      if (this.y < boundaries[2]) {
        this.y += stepY;
      }
      break;
    case 'left':
      if (this.x > boundaries[3]) {
        this.x -= stepX;
      }
      break;
  }
  // log position
  if (this.position !== this.x + ',' + this.y) {
    this.position = this.x + ',' + this.y;
    console.log(this.position);
  }
  // reset action
  this.action = null;

  // reset player if on goal (water)
  if (this.y < 25) {
    this.reset();
  }

};
Player.prototype.handleInput = function(e) {
  this.action = e;
};
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


//--------------------------------------------------------------------
// Initialize Enemy and Player Objects
//--------------------------------------------------------------------
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
  //Setting the Enemy initial location
  new Enemy(100, 60, 'images/enemy-bug.png'),
  new Enemy(100, 140, 'images/enemy-bug.png'),
  new Enemy(100, 230, 'images/enemy-bug.png')
];
var player = new Player(200,400,'images/char-boy.png');

//--------------------------------------------------------------------
// Event listener to handle key up events
//--------------------------------------------------------------------
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
