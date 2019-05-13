import Phaser from 'phaser'
import GameScene from './GameScene'
import PreloadScene from './PreloadScene'

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 480,
    scene: [PreloadScene, GameScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
      }

};


export { config }
