import App from '../main';

class Menu extends Phaser.State {
    constructor(
        public __background: Phaser.Image,
        public __nameLabel: Phaser.Text,
        public __scoreLabel: Phaser.Text,
        public __startLabel: Phaser.Text,
        public __startKey: Phaser.Key,
        public __muteBtn: Phaser.Button
    ) {
        super();
    }

    create() {

        if (!localStorage.getItem('bestScore')) {
            localStorage.setItem('bestScore', `${0}`);
        } else if ((<App>this.game).__globals.score > parseInt(<string>localStorage.getItem('bestScore'), 10)) {
            localStorage.setItem('bestScore', `${(<App>this.game).__globals.score}`);
        }

        this.__background = this.add.image(0, 0, 'atlas', 'background');

        this.__nameLabel = this.add.text(this.game.width / 2, -50, 'Super Coin Box', {font: '70px Geo', fill: '#ffffff'});
        this.__nameLabel.anchor.setTo(0.5);

        this.__scoreLabel = this.add.text(
            this.game.width / 2, this.game.height / 2,
            `Score: ${(<App>this.game).__globals.score}\nBest: ${localStorage.getItem('bestScore')}`,
            {font: '25px Arial', fill: '#ffffff', align: 'center'}
        );
        this.__scoreLabel.anchor.setTo(0.5);

        let text: string = !this.game.device.desktop ?  'Touch the screen to start' : 'Press [Enter] to start';
        this.__startLabel = this.add.text(this.game.width / 2, this.game.height - 80, text, {font: '25px Arial', fill: '#ffffff'});
        this.__startLabel.anchor.setTo(0.5);

        this.__startKey = this.input.keyboard.addKey(Phaser.KeyCode.ENTER);
        this.__startKey.onDown.add(this.__start, this);

        if (!this.game.device.desktop) {
            this.input.onDown.add(this.__start, this);
        }

        this.__muteBtn = this.add.button(20, 20, 'atlas', this.__toggleSound, this);
        this.__muteBtn.frameName = this.sound.mute ? 'muteOn' : 'muteOff';

        this.add.tween(this.__nameLabel).to({y: 80}, 1000, Phaser.Easing.Bounce.Out, true);
        this.add.tween(this.__startLabel).to({alpha: 0}, 500, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
    }

    __start() {
        if (!this.game.device.desktop && this.input.y < 50 && this.input.x < 60) {
            return;
        }
        this.game.state.start('Play');
    }

    __toggleSound() {
        this.sound.mute = !this.sound.mute;
        this.__muteBtn.frame = this.sound.mute ? 'muteOn' : 'muteOff';
    }
}

export default Menu;