import Phaser from "phaser";
import TitleScene from './Components/TitleSCene/TitleScene';
import GameScene from './Components/GameScene/GameScene';
import GameOverScene from './Components/GameOverScene/GameOverScene';
//import VictoryScene from './Components/VictoryScene/VictoryScene';


const gameScene = new GameScene();
const titleScene = new TitleScene();
const gameOverScene = new GameOverScene();
//const victoryScene = new VictoryScene();


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

};

const game = new Phaser.Game(config);



game.scene.add('titleScene', titleScene);
game.scene.add("gameScene", gameScene);
game.scene.add('gameOverScene', gameOverScene);
//game.scene.add("victoryScene", victoryScene);








game.scene.start('gameOverScene');

