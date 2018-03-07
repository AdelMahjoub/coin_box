import App from '../main';
import Player from '../entities/Player';

class Play extends Phaser.State {
    constructor(
        public __player: Player,
        public __walls: Phaser.Group,
        public __coin: Phaser.Sprite,
        public __enemies: Phaser.Group,
        public __scoreLabel: Phaser.Text,
        public __sfx: {
            jump: Phaser.Sound,
            coin: Phaser.Sound,
            dead: Phaser.Sound
        },
        public __emitter: Phaser.Particles.Arcade.Emitter,
        public __nextEnemy: number = 0,
        public __level: Phaser.Tilemap,
        public __layer: Phaser.TilemapLayer
    ) {
        super();
    }

    create(): void {
        this.__buildLevel();
        this.__sfx = {
            jump: this.add.audio('jump'),
            coin: this.add.audio('coin'),
            dead: this.add.audio('dead')
        };
        this.__emitter = this.add.emitter(0, 0, 15);
        this.__emitter.makeParticles('atlas', 'pixel');
        this.__emitter.setXSpeed(-150, 150);
        this.__emitter.setYSpeed(-150, 150);
        this.__emitter.setScale(2, 0, 2, 0, 800);
        this.__emitter.gravity = 0;
    }

    update(): void {
        this.game.physics.arcade.collide(this.__player, this.__layer);
        this.game.physics.arcade.collide(this.__enemies, this.__layer);
        this.game.physics.arcade.overlap(this.__player, this.__coin, this.__onPlayerVsCoin, () => { return this.__player.alive; }, this);
        this.game.physics.arcade.overlap(this.__player, this.__enemies, this.__onPlayerVsEnemies, () => { return this.__player.alive; }, this);

        if (this.__nextEnemy < this.time.now) {
            let start = 4000, end = 1000, score = 100;
            let delay = Math.max(start - (start - end) * (<App>this.game).__globals.score / score, end);
            this.__spawnEnemy();
            this.__nextEnemy = this.time.now + delay;
        }
    }

    __buildLevel(): void {
        this.__spawnWalls();
        this.__spawnPlayer();
        this.__spawnCoin();
        this.__spawnScore();
        this.__initEnemies();
    }

    __spawnWalls(): void {
        this.__level = this.add.tilemap('level');
        this.__level.addTilesetImage('tileset');
        this.__layer = this.__level.createLayer('level');
        this.__layer.resizeWorld();
        this.__level.setCollision(1);
    }

    __spawnPlayer(): void {
        this.__player = new Player({
            game: this.game,
            state: this,
            x: this.game.width / 2,
            y: this.game.height / 2,
            key: 'atlas',
            frame: 'player01'
        });
        this.add.existing(this.__player);
    }

    __initEnemies(): void {
        this.__enemies = this.add.group();
        this.__enemies.enableBody = true;
        this.__enemies.createMultiple(10, 'atlas', 'enemy');
    }

    __spawnEnemy(): void {
        const enemy: Phaser.Sprite|null = this.__enemies.getFirstDead();
        if (!enemy) {
            return;
        }
        enemy.anchor.setTo(0.5, 1);
        enemy.reset(this.game.width / 2, 0);
        (<Phaser.Physics.Arcade.Body>enemy.body).gravity.y = 500;
        (<Phaser.Physics.Arcade.Body>enemy.body).velocity.x = 100 * this.rnd.pick([-1, 1]);
        (<Phaser.Physics.Arcade.Body>enemy.body).bounce.x = 1;
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;
    }

    __spawnCoin(): void {
        this.__coin = this.add.sprite(60, 140, 'atlas', 'coin');
        this.__coin.anchor.setTo(0.5);
        this.game.physics.arcade.enable(this.__coin);
    }

    __spawnScore(): void {
        this.__scoreLabel = this.add.text(30, 30, 'score: 0', {font: '18px arial', fill: '#ffffff'});
        (<App>this.game).__globals.score = 0;
    }

    __onPlayerVsCoin(): void {
        this.__sfx.coin.play();
        this.__updateCoinPosition();
        (<App>this.game).__globals.score += 5;
        this.__scoreLabel.text = `score: ${(<App>this.game).__globals.score}`;
        this.add.tween(this.__player.scale).to({x: 1.3, y: 1.3}, 100, 'Linear', true, 0, 0, true);
    }

    __onPlayerVsEnemies(): void {
        this.__emitter.x = this.__player.x;
        this.__emitter.y = this.__player.y;
        this.__player.kill();
        this.__emitter.start(true, 800, undefined, 15);
        this.__sfx.dead.play();
        this.game.camera.flash(0xffffff, 300);
        this.game.camera.shake(0.02, 300);
        this.time.events.add(1000, this.__startMenu, this);
    }

    __updateCoinPosition(): void {
        const allCoinPositions: Array<{x: number, y: number}> = [
            {x: 140, y: 60}, {x: 360, y: 60},
            {x: 60, y: 140}, {x: 440, y: 140},
            {x: 130, y: 300}, {x: 370, y: 300}
        ];
        const nextCoinPositions: Array<{x: number, y: number}> = allCoinPositions.filter(position => (position.x !== this.__coin.x && position.y !== this.__coin.y));
        const newPosition: {x: number, y: number} = this.rnd.pick(nextCoinPositions);
        this.__coin.reset(newPosition.x, newPosition.y);
        this.add.tween(this.__coin.scale).from({x: 0, y: 0}, 500, Phaser.Easing.Bounce.Out, true);
    }

    __startMenu(): void {
        this.game.state.start('Menu');
    }
 }

export default Play;