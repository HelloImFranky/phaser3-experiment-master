import { Scene } from 'phaser'

class GameScene extends Scene {
  constructor(){
    super()

    this.score = 0
    this.gameOver = false
  }
//==============================================
//preload
  preload() {
    this.load.image('mntScene', 'assets/mountainScene.png')
    this.load.image('pltfrm1', 'assets/platform1.png')
    this.load.image('runes', 'assets/eyeRune.png')
    this.load.image('ninjaStar', 'assets/trueNinjaStar.png')
    this.load.spritesheet('ninja',
        'assets/maleBase/full/ninja_full.png',
        { frameWidth: 32, frameHeight: 64 }
      )

    }
//=================================================
//create
  create() {
    const mntScene = this.add.image(0, 0, 'mntScene')
    mntScene.setOrigin(0, 0)

    this.createPlatforms()
    this.createPlayer()
    this.createCursor()
    this.createRunes()
    this.createNinjaStar()

    this.scoreText = this.add.text(16, 16, 'score: 0',
    { fontSize: '32px', fill: '#000' })
    this.gameOverText = this.add.text(400, 200, 'GAMEOVER',
    { fontSize: '64px', fill: '#000' })
    this.gameOverText.setOrigin(0.5)
    this.gameOverText.visible = false

  }

  createPlatforms() {
   this.platforms = this.physics.add.staticGroup()
   //Primary bottom platform
   this.platforms.create(400, 500, 'pltfrm1').setScale(4).refreshBody()

   this.platforms.create(500, 350, 'pltfrm1')
   this.platforms.create(300, 240, 'pltfrm1')
   this.platforms.create(720, 240, 'pltfrm1')
   this.platforms.create(100, 350, 'pltfrm1')
   this.platforms.create(475, 150, 'pltfrm1')
  }

  createPlayer() {
    this.player = this.physics.add.sprite(300, 200, 'ninja')
    this.player.setBounce(0.2)
    this.player.setCollideWorldBounds(true)
    this.physics.add.collider(this.player, this.platforms)

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

  createRunes() {
    this.runes = this.physics.add.group({
      key: 'runes',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });

  this.runes.children.iterate((child) =>  {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

  this.physics.add.collider(this.runes, this.platforms);
  this.physics.add.overlap(this.player, this.runes, this.collectRunes, null, this);

}

 collectRunes(player, runes) {
   runes.disableBody(true, true);
   this.score += 10;
   this.scoreText.setText('Score: ' + this.score);

   if (this.runes.countActive(true) === 0) {
     this.runes.children.iterate((child) => {
       child.enableBody(true, child.x, 0, true, true);
      });

       const x = (this.player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
       const theEnemyStar = this.ninjaStar.create(x, 16, 'ninjaStar');
       theEnemyStar.setBounce(1);
       theEnemyStar.setCollideWorldBounds(true);
       theEnemyStar.setVelocity(Phaser.Math.Between(-200, 200), 20);
   }
}

  createNinjaStar() {
    this.ninjaStar = this.physics.add.group();
    this.physics.add.collider(this.ninjaStar, this.platforms);
    this.physics.add.collider(this.player, this.ninjaStar, this.hitNinjaStar, null, this);
  }

  hitNinjaStar(player, ninjaStar) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    this.gameOver = true;
    this.gameOverText.visible = true
    //shows game over text
  }




  //=====================================================
//update
  update() {
        if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160)
        this.player.anims.play('left', true)
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160)
        this.player.anims.play('right', true)
      } else {
        this.player.setVelocityX(0)
        this.player.anims.play('turn')
      }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-330)
    }

  }
}

export default GameScene
