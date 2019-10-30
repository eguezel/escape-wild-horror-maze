import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: 608,
  height: 544,
  pixelArt: true, 
  antialias: false, 
  autoResize: false,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  }
};

const game = new Phaser.Game(config);

let cursors;
let player;
let showDebug = false;


function preload() {
  // Load tileset for the map
  this.load.image("tiles", 'src/assets/tilesets/full-tileset.png');
  // Load map
  this.load.tilemapTiledJSON("map", 'src/assets/map.json');
  // Load character image
  this.load.atlas("atlas", 'src/assets/atlas/atlas.png', 'src/assets/atlas/atlas.json');
}

function create() {
  const map = this.make.tilemap({key: "map"});

  const tileset = map.addTilesetImage('full-tileset', 'tiles');

  const Floor = map.createStaticLayer('Floor', tileset)
  const Wall = map.createStaticLayer('Wall', tileset);

  Wall.setCollisionByProperty({ collides: true });

  Wall.setDepth(10);

  player = this.physics.add
  .sprite(110, 95, "atlas", "misa-front")
  .setSize(30, 40)
  .setOffset(0, 24);
 
  this.physics.add.collider(player, Wall);

  // Create the player's walking animations from the texture atlas. These are stored in the global
  // animation manager so any sprite can access them.
  const anims = this.anims;
  anims.create({
    key: "misa-left-walk",
    frames: anims.generateFrameNames("atlas", { prefix: "misa-left-walk.", start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "misa-right-walk",
    frames: anims.generateFrameNames("atlas", { prefix: "misa-right-walk.", start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "misa-front-walk",
    frames: anims.generateFrameNames("atlas", { prefix: "misa-front-walk.", start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "misa-back-walk",
    frames: anims.generateFrameNames("atlas", { prefix: "misa-back-walk.", start: 0, end: 3, zeroPad: 3 }),
    frameRate: 10,
    repeat: -1
  });
}

function update(time, delta) {
  const speed = 100;
  cursors = this.input.keyboard.createCursorKeys();

  // Stop any previous movement from the last frame
  player.setVelocity(0);

  // Horizontal movement
  if (cursors.left.isDown) {
    player.setVelocityX(-speed);
  } else if (cursors.right.isDown) {
    player.setVelocityX(speed);
  }

  // Vertical movement
  if (cursors.up.isDown) {
    player.setVelocityY(-speed);
  } else if (cursors.down.isDown) {
    player.setVelocityY(speed);
  }

  // Update the animation last and give left/right animations precedence over up/down animations
  if (cursors.left.isDown) {
    player.anims.play("misa-left-walk", true);
  } else if (cursors.right.isDown) {
    player.anims.play("misa-right-walk", true);
  } else if (cursors.up.isDown) {
    player.anims.play("misa-back-walk", true);
  } else if (cursors.down.isDown) {
    player.anims.play("misa-front-walk", true);
  } else {
    player.anims.stop();
  }
}
