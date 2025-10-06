class Play {
    create() {
        // This method is called once, just after 'preload()'
        // It will initialize our scene, like the positions of the sprites
        this.player = this.physics.add.sprite(250, 170, 'player')
        this.player.body.gravity.y = 500
        // Create the 'right' animation by looping the frame 1 and 2
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', {frames: [1, 2]}),
            frameRate: 8,
            repeat: -1
        })
        // Create the 'left' animation by looping the frames 3 and 4
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', {frames: [3, 4]}),
            frameRate: 8,
            repeat: -1
        })

        this.arrow = this.input.keyboard.createCursorKeys()
        this.createWorld()
        this.coin = this.physics.add.sprite(60, 130, 'coin')
        this.scoreLabel = this.add.text(30, 25, 'score: 0',
            { font: '18px Arial', fill: '#fff' })
        this.score = 0

        this.enemies = this.physics.add.group()

        // Call 'addEnemy' every 2.2 seconds
        this.time.addEvent({
            delay: 2200,
            callback: () => this.addEnemy(),
            loop: true
        })

        // add sounds
        this.jumpSound = this.sound.add('jump')
        this.coinSound = this.sound.add('coin')
        this.deadSound = this.sound.add('dead')
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
        // Make the enemies and walls collide
        this.physics.collide(this.enemies, this.walls)
        // Call the 'playerDie' method when the player and an enemy overlap
        if (this.physics.overlap(this.player, this.enemies)) {
            this.playerDie()
        }
    }

    movePlayer() {
        // If arrow keys are pressed
        if (this.arrow.left.isDown) {
            // The velocity is in pixels per second
            this.player.body.velocity.x = -200
            this.player.anims.play('left', true) // Left animation
        } else if (this.arrow.right.isDown) {
            this.player.body.velocity.x = 200
            this.player.anims.play('right', true) // Right animation
        } else {
            this.player.body.velocity.x = 0
            this.player.setFrame(0) // Change frame (stand still/idle)
        }

        if (this.arrow.up.isDown && this.player.body.onFloor()) {
            this.jumpSound.play()
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
        this.deadSound.play()
        this.scene.start('menu', { score: this.score })
    }

    takeCoin() {
        this.score += 5
        this.coinSound.play()
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

    addEnemy() {
        let enemy = this.enemies.create(250, -10, 'enemy')
        enemy.body.gravity.y = 500
        enemy.body.velocity.x = Phaser.Math.RND.pick([-100, 100])
        enemy.body.bounce.x = 1

        this.time.addEvent({
            delay: 10000,
            callback: () => enemy.destroy()
        })
    }

}
