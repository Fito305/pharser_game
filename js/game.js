// To initialize Phaser we call Phaser.Game() at the end of the JS file.
let game = new Phaser.Game({
    width: 500, // Width of the game in pixels
    height: 340, // Height of the game in pixels
    backgroundColor: '#3498db', // The background color blue
    physics: { default: 'arcade' }, // The physics engine to use // NOTE: I had a but due to misspelling default.
    parent: 'game', // The ID of the element that will contain the game <div id="game"></div> in index.html
})


// Add all the scenes
game.scene.add('load', Load)
game.scene.add('menu', Menu)
game.scene.add('play', Play)
// Start the 'load' scene
game.scene.start('load')
