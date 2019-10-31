class GameOverScene extends Phaser.Scene {

	constructor() {
		super({key : 'gameOverScene'});
	}


	preload() {
		this.load.image('gameOver', 'src/assets/gameOver.jpg');
	}

	create() {
           
        let bg = this.add.sprite(0,0,'gameOver');
		bg.setOrigin(0,0);

        let text = this.add.text(100,100, 'Retry ? Clik here you fool...', {
          fontSize: 30 + "px",
          color : "yellow",
        });
            

        text.setInteractive();
        text.once('pointerup', function () {

            this.scene.start('gameScene');

        }, this);
        
        
	}


}

export default GameOverScene;