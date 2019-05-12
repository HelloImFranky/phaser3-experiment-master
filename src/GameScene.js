import { Scene } from 'phaser'

class GameScene extends Scene {

  preload() {
    this.load.image('mntScene', 'assets/mountainScene.png');
    this.load.image('pltfrm1', 'assets/platform1.png');
    this.load.image('runes', 'assets/eyeRune.png');
    this.load.image('ninjaStar', 'assets/trueNinjaStar.png');
    this.load.spritesheet('ninja',
        'assets/maleBase/full/ninja_full.png',
        { frameWidth: 32, frameHeight: 64 }
      )
    }

  create() {
    const mntScene = this.add.image(0, 0, 'mntScene')
    mntScene.setOrigin(0, 0)

    this.createPlatforms()
    this.createPlayer()
    this.createCursor()
  }

  createPlatforms() {
   this.platforms = this.physics.add.staticGroup()
   this.platforms.create(400, 500, 'pltfrm1').setScale(3).refreshBody()
   this.platforms.create(600, 400, 'pltfrm1')
   this.platforms.create(50, 250, 'pltfrm1')
   this.platforms.create(700, 220, 'pltfrm1')
  }

  createPlayer() {
    this.player = this.physics.add.sprite(300, 200, 'ninja');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('ninja', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [ { key: 'ninja', frame: 4 } ],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('ninja', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
  }

  createCursor() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
        if (this.cursors.left.isDown){
        this.player.setVelocityX(-160);
        this.player.anims.play('left', true);
      } else if (this.cursors.right.isDown){
        this.player.setVelocityX(160);
        this.player.anims.play('right', true);
      } else {
        this.player.setVelocityX(0);
        this.player.anims.play('turn');
      }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-330);
    }
  }
}

export default GameScene
