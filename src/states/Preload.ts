class Preload extends Phaser.State {
    constructor(
        public __loadingLabel: Phaser.Text,
        public __progressBar: Phaser.Sprite
    ) {
        super();
    }

    preload() {

        this.__loadingLabel = this.add.text(this.game.width / 2, 150, 'Loading...', {font: '30px Arial', fill: '#ffffff'});
        this.__loadingLabel.anchor.setTo(0.5);
        this.__progressBar = this.add.sprite(this.game.width / 2, 200, 'progressBar');
        this.__progressBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.__progressBar);

        this.load.image('tileset', 'assets/tileset.png');
        this.load.tilemap('level', 'assets/level.json', null, Phaser.Tilemap.TILED_JSON);

        this.load.atlasJSONArray('atlas', 'assets/atlas.png', 'assets/atlas.json');

        this.load.audio('jump', ['assets/jump.ogg', 'assets/jump.mp3']);
        this.load.audio('coin', ['assets/coin.ogg', 'assets/coin.mp3']);
        this.load.audio('dead', ['assets/dead.ogg', 'assets/dead.mp3']);
    }

    create() {
        this.game.state.start('Menu');
    }
}

export default Preload;