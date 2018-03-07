class Boot extends Phaser.State {

    constructor(
        public __orientationMessage: Phaser.Text
    ) {
        super();
    }

    preload() {
        this.load.image('progressBar', 'assets/progressBar.png');
    }

    create() {

        if (!this.game.device.desktop) {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(this.game.width / 2, this.game.height / 2, this.game.width * 2, this.game.width * 2);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            document.body.style.backgroundColor = '#3498db';

            this.scale.onOrientationChange.add(this.__onOrientationChange, this);

            this.__orientationMessage = this.make.text(this.game.width / 2, this.game.height / 2, 'Rotate the device in landscape', {font: '30px Arial', fill: '#fff', backgroundColor: '#000'});
            this.__orientationMessage.anchor.setTo(0.5);
            this.__onOrientationChange();
        }

        this.stage.backgroundColor = '#3498db';
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.renderer.renderSession.roundPixels = true;
        this.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT]);
        this.game.state.start('Preload');
    }

    __onOrientationChange() {
        if (this.scale.isPortrait) {
            this.game.paused = true;
            this.stage.addChild(this.__orientationMessage);
        } else {
            this.game.paused = false;
            this.stage.removeChild(this.__orientationMessage);
        }
    }

}

export default Boot;