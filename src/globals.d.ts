declare const __IN_DEVELOPMENT__          : boolean;
declare const __DEFAULT_GAME_WIDTH__      : number;
declare const __DEFAULT_GAME_HEIGHT__     : number;
declare const __DEFAULT_MIN_GAME_WIDTH__  : number;
declare const __DEFAULT_MIN_GAME_HEIGHT__ : number;
declare const __DEFAULT_MAX_GAME_WIDTH__  : number;
declare const __DEFAULT_MAX_GAME_HEIGHT__ : number;
declare const __DEFAULT_SCALE_MODE__      : number; 

interface IGameConfig {
    width: number;
    height: number;
    renderer: number;
    parent?: string|HTMLElement;
    state?: Phaser.State;
    transparent?: boolean;
    antialias?: boolean;
}

interface IGameMinMaxDimensions {
    minWidth: number;
    minHeight: number;
    maxWidth: number;
    maxHeight: number
}

interface ISpriteConfig {
    game: Phaser.Game;
    state: Phaser.State;
    x: number; 
    y: number;
    key: string;
    frame: string;
}

interface IPlayerMobileInputs {
    jump: Phaser.Sprite;
    left: Phaser.Sprite;
    right: Phaser.Sprite;
    [key: string]: Phaser.Sprite;
}

interface IPlayerMovements {
    left: boolean;
    right: boolean;
    [key: string]: boolean;
}