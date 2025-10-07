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
        // Display the name of the game and set the y position to -50
        // so we don't see the label
        let nameLabel = this.add.text(250, -50, 'The Coin Collector',
            { font: '50px Arial', fill: '#fff' })
        this.tweens.add({
            targets: nameLabel,
            y: 80, // change the y position from -50 to 80
            duration: 1000,
            ease: 'bounce.out'
        })
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
        this.tweens.add({
            targets: startLabel,
            angle: { from: -2, to: 2 },
            duration: 1000,
            yoyo: true, // perforom the tween in reverse
            repeat: -1  // repeat the tween indefinitely
        })
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
