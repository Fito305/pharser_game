class Load {
    preload() {
        // Load all assets
        this.load.image('background', 'assets/background.png')
        this.load.spritesheet('player', 'assets/player2.png', {
            frameWidth: 20,
            frameHeight: 20
        })
        this.load.image('coin', 'assets/coin.png')
        this.load.image('enemy', 'assets/enemy.png')
        this.load.image('wallV', 'assets/wallVertical.png')
        this.load.image('wallH', 'assets/wallHorizontal.png')

        // Particles effects
        this.load.image('pixel', 'assets/pixel.png')

        // Sound effects
        this.load.audio('jump', ['assets/jump.ogg', 'assets/jump.mp3'])
        this.load.audio('coin', ['assets/coin.ogg', 'assets/coin.mp3'])
        this.load.audio('dead', ['assets/dead.ogg', 'assets/dead.mp3'])

        // Diplay a loading label
        let loadLabel = this.add.text(250, 170, 'loading',
            { font: '30px Arial', fill: '#fff' })

        // Change the point of origin of the text
        // To make sure the text will be centered on the screen
        loadLabel.setOrigin(0.5, 0.5)
    }
    create() {
        // Start the menu scene
        this.scene.start('menu')
    }
}
