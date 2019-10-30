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
    create: create
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
  this.load.atlas("atlas", 'src/assets/knight_run_spritesheet.png');
}

function create() {
  const map = this.make.tilemap({key: "map"});

  const tileset = map.addTilesetImage('full-tileset', 'tiles');

  const Floor = map.createStaticLayer('Floor', tileset)
  const Wall = map.createStaticLayer('Wall', tileset);

  Wall.setCollisionByProperty({ collides: true });

  Wall.setDepth(10);
}
