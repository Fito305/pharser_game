// Create our only scene called Main
class Main {
    // The three methods (currently empty)

    preload() {
        // This method is called once at the beginning
        // it will load all the assets, like sprites and sounds
        this.load.image('player', 'assets/player.png')
    }

    create() {
        // This method is called once, just after 'preload()'
        // It will initialize our scene, like the positions of the sprites
        this.player = this.physics.add.sprite(250, 170, 'player')
    }

    update() {
        // This method is called 60 times per second after 'create()'
        // It will handle all the games logic, like movements
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
