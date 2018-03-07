import Play from '../states/Play';

class Player extends Phaser.Sprite {

    public __state: Phaser.State;
    public __mobileInputs: IPlayerMobileInputs;
    public __cursors: Phaser.CursorKeys;
    public __movements: IPlayerMovements;

    constructor(public __config: ISpriteConfig) {

        super(__config.game, __config.x, __config.y, __config.key, __config.frame);

        this.__state = __config.state;
        this.__cursors = this.game.input.keyboard.createCursorKeys();
        this.__movements = { left: false, right: false };
        this.__mobileInputs = {
            jump: this.game.add.sprite(350, 240, 'atlas', 'jumpButton'),
            left: this.game.add.sprite(50, 240, 'atlas', 'leftButton'),
            right: this.game.add.sprite(130, 240, 'atlas', 'rightButton')
        };

        this.anchor.setTo(0.5);
        this.game.physics.arcade.enable(this);
        (<Phaser.Physics.Arcade.Body>this.body).gravity.y = 500;
        this.animations.add('right', ['player02', 'player03'], 8);
        this.animations.add('left', ['player04', 'player05'], 8);
        if (!this.game.device.desktop) {
            this.__addMobileInputs();
        }
    }

    update() {
        this.__move();
    }

    __move() {
        if (!this.alive) {
            return;
        }

        if (!this.game.input.totalActivePointers) {
            this.__movements.right = false;
            this.__movements.left = false;
        }

        let body = <Phaser.Physics.Arcade.Body>this.body;
        if ((this.__cursors.left.isDown || this.__movements.left) && body.velocity.x <= 0) {
            body.velocity.x = -200;
            this.animations.play('left');
        } else if ((this.__cursors.right.isDown || this.__movements.right) && body.velocity.x >= 0) {
            body.velocity.x = 200;
            this.animations.play('right');
        } else {
            this.animations.stop();
            this.frameName = 'player01';
            body.velocity.x = 0;
        }
        if (this.__cursors.up.isDown) {
            this.__jump();
        }
        this.game.world.wrap(this, 0, true);
    }

    __jump() {
        let body = <Phaser.Physics.Arcade.Body>this.body;
        if (body.onFloor()) {
            (<Play>this.__state).__sfx.jump.play();
            body.velocity.y = -320;
        }
    }

    __moveLeft() {
        this.__movements.left = true;
    }

    __moveRight() {
        this.__movements.right = true;
    }

    __stopLeft() {
        this.__movements.left = false;
    }

    __stopRight() {
        this.__movements.left = false;
    }

    __addMobileInputs() {

        Object.keys(this.__mobileInputs).forEach(key => {
            this.__mobileInputs[key].inputEnabled = true;
            this.__mobileInputs[key].alpha = 0.5;
        }, this);

        this.__mobileInputs.jump.events.onInputDown.add(this.__jump, this);

        this.__mobileInputs.left.events.onInputDown.add(this.__moveLeft, this);
        this.__mobileInputs.left.events.onInputOver.add(this.__moveLeft, this);
        this.__mobileInputs.left.events.onInputUp.add(this.__stopLeft, this);
        this.__mobileInputs.left.events.onInputOut.add(this.__stopLeft, this);

        this.__mobileInputs.right.events.onInputDown.add(this.__moveRight, this);
        this.__mobileInputs.right.events.onInputOver.add(this.__moveRight, this);
        this.__mobileInputs.right.events.onInputUp.add(this.__stopRight, this);
        this.__mobileInputs.right.events.onInputOut.add(this.__stopRight, this);
    }
}

export default Player;


