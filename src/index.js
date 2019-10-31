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
let item;
let life = 100;
let showDebug = false;


function preload() {
  // Load tileset for the map
  this.load.image("tiles", 'src/assets/tilesets/full-tileset.png', 'src/assets/tilesets/full-tileset.json');
  // Load map
  this.load.tilemapTiledJSON("map", 'src/assets/map.json');
  // Load character image
  this.load.atlas("atlas", 'src/assets/atlas/atlas.png', 'src/assets/atlas/atlas.json');
  // Load monster image
  this.load.atlas("monster", 'src/assets/atlas/monster.png', 'src/assets/atlas/atlas.json');
  // Item
  this.load.image("item", 'src/assets/item.png');
  // Door
  this.load.image("door", 'src/assets/door.png');
}

function create() {
  const map = this.make.tilemap({key: "map"});

  const tileset = map.addTilesetImage('full-tileset', 'tiles');

  const Floor = map.createStaticLayer('Floor', tileset, 0, 0)
  const Wall = map.createStaticLayer('Wall', tileset, 0, 0);

  Wall.setCollisionByProperty({ collides: true });

  Wall.setDepth(10);

  player = this.physics.add
  .sprite(110, 95, "atlas", "misa-front")
  .setSize(30, 40)
  .setOffset(0, 24);

  player.setScale(0.6);
  // Create door

  let door = this.physics.add
  .sprite(240, 525, "door");
  door.setScale(2.25);
  this.physics.add.overlap(player, door, () => {alert("Vous Avez Gagnez!!!")})
  this.physics.add.collider(door, Wall);


  // Create monsters
  let createMonster = (name, x, y) => {
    name = this.physics.add.sprite(x, y, 'monster')
    name.setScale(0.6);
    this.physics.add.overlap(player, name, () => {life -= 30, console.log(life), name.destroy();});
    this.physics.add.collider(name, Wall);
  }

  const monstersPos = [[370, 170], [175, 68], [110, 295], [240, 475], [430, 360], [200, 360], [240, 180]];
  for (let i = 0; i < 7; i++) {
    createMonster(`monster${i}`, monstersPos[i][0], monstersPos[i][1]);
  }

  // Create items/potions
  let createItems = (name, x, y) => {
    name = this.physics.add.sprite(x, y, 'item')
    name.setScale(1.75);
    this.physics.add.overlap(player, name, () => {life += 20, console.log(life), name.destroy();});
    this.physics.add.collider(name, Wall);
  }

  const itemsPos = [[310, 115], [560, 170], [175, 235], [410, 495]];
  for (let i = 0; i < 4; i++) {
    createItems(`item${i}`, itemsPos[i][0], itemsPos[i][1]);
  }

  this.physics.add.collider(player, Wall);

  //The holy command
  map.setCollisionBetween(1, 999, true, 'collisionLayer');

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
