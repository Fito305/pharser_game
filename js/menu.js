class Menu {
    // This 'create' method now has a 'data' parameter
    // It contains an object coming from the play scene
    create(data) {
        // Retrieve the score, if there is one
        let score = data.score ? data.score : 0
        // Display a background image
        // An imgage is like a lightweigth sprite that
        // doesn't need physics or animations
        // It's perfect for logos, backgrounds, etc.
        this.add.image(250, 170, 'background')
        // Display the name of the game
        let nameLabel = this.add.text(250, 80, 'The Coin Collector',
            { font: '50px Arial', fill: '#fff' })
        nameLabel.setOrigin(0.5, 0.5)
        // Display the score
        let scoreText = 'scrore: ' + score
        let scoreLabel = this.add.text(250, 170, scoreText,
            { font: '25px Arial', fill: '#fff' })
        scoreLabel.setOrigin(0.5, 0.5)
        // Display how to start the game
        let startText = 'press the up arrow key to start'
        let startLabel = this.add.text(250, 260, startText,
            { font: '25px Arial', fill: '#fff' })
        startLabel.setOrigin(0.5, 0.5)
        // Store the up arrow key
        this.upKey = this.input.keyboard.addKey('up')
    }
    update() {
        // When the up arrow key is down
        if (this.upKey.isDown) {
            // Start the play scene
            this.scene.start('play')
        }
    }
}
