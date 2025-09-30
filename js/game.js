// Create our only scene called Main
class Main {
    // The three methods (currently empty)

    preload() {
        // This method is called once at the beginning
        // it will load all the assets, like sprites and sounds
        this.load.image('player', 'assets/player.png')
        this.load.image('wallV', 'assets/wallVertical.png')
        this.load.image('wallH', 'assets/wallHorizontal.png')
        this.load.image('coin', 'assets/coin.png')
    }

    create() {
        // This method is called once, just after 'preload()'
        // It will initialize our scene, like the positions of the sprites
        this.player = this.physics.add.sprite(250, 170, 'player')
        this.player.body.gravity.y = 500
        this.arrow = this.input.keyboard.createCursorKeys()
        this.createWorld()
        this.coin = this.physics.add.sprite(60, 130, 'coin')
        this.scoreLabel = this.add.text(30, 25, 'score: 0',
            { font: '18px Arial', fill: '#fff' })
        this.score = 0
    }

    update() {
        // This method is called 60 times per second after 'create()'
        // It will handle all the games logic, like movements
        // We have to call movePlayer() inside of the update() method:
        this.movePlayer()
        // Tell Phaser that the player and the walls should collide
        this.physics.collide(this.player, this.walls)
        // If player is below the bottom hole or above the tope hole:
        if (this.player.y > 340 || this.player.y < 0) {
            this.playerDie()
        }
        // if player object overlaps with coin object
        if (this.physics.overlap(this.player, this.coin)) {
            this.takeCoin()
        }
    }

    movePlayer() {
        // If arrow keys are pressed
        if (this.arrow.left.isDown) {
            // The velocity is in pixels per second
            this.player.body.velocity.x = -200
        } else if (this.arrow.right.isDown) {
            this.player.body.velocity.x = 200
        } else {
            this.player.body.velocity.x = 0
        }

        if (this.arrow.up.isDown && this.player.body.onFloor()) {
            this.player.body.velocity.y = -320  // (jump)
        }
    }

    createWorld() {
        // Create an empty static group, with physics
        this.walls = this.physics.add.staticGroup()
        // create the 10 walls in the group
        this.walls.create(10, 170, 'wallV')  // Left
        this.walls.create(490, 170, 'wallV') // Right

        this.walls.create(50, 10, 'wallH') // Top Left
        this.walls.create(450, 10, 'wallH') // Top right
        this.walls.create(50, 330, 'wallH') // Bottom left
        this.walls.create(450, 330, 'wallH') // Bottom right

        this.walls.create(0, 170, 'wallH') // Middle left
        this.walls.create(500, 170, 'wallH') // Middle right
        this.walls.create(250, 90, 'wallH') // Middle top
        this.walls.create(250, 250, 'wallH') // Middle bottom
    }

    playerDie() {
        this.scene.start('main')
    }

    takeCoin() {
        this.score += 5
        // Update the score label by using its 'text' property
        this.scoreLabel.setText('score: ' + this.score)
        // Change the coin position
        this.updateCoinPosition()
    }

    updateCoinPosition() {
        // Store all the possible coin positions in an array
        let positions = [
            { x: 140, y: 60 },
            { x: 360, y: 60 },
            { x: 60, y: 140 },
            { x: 440, y: 140 },
            { x: 130, y: 300 },
            { x: 370, y: 300 }
        ]
        // Remove the current coin position from the array
        positions = positions.filter(coin => coin.x !== this.coin.x)
        // Randomly select a position from the array
        let newPosition = Phaser.Math.RND.pick(positions)
        // Set the new position of the coin
        this.coin.setPosition(newPosition.x, newPosition.y)
    }

}


// To initialize Phaser we call Phaser.Game() at the end of the JS file.
let game = new Phaser.Game({
    width: 500, // Width of the game in pixels
    height: 340, // Height of the game in pixels
    backgroundColor: '#3498db', // The background color blue
    physics: { default: 'arcade' }, // The physics engine to use // NOTE: I had a but due to misspelling default.
    parent: 'game', // The ID of the element that will contain the game
})


// Add the scene to the game
game.scene.add('main', Main)
// Start the scene
game.scene.start('main')
