import { Z_FIXED } from "zlib";

class TitleScene extends Phaser.Scene {

	constructor() {
		super({key : 'titleScene'});
	}

    preload() {
		this.load.image('background', 'src/assets/background.jpg');
	}

	create() {
           
        let bg = this.add.sprite(0,0,'background');
		bg.setOrigin(0,0);
    
        let text = this.add.text(100,100, 'You are lost in the darkness of \n Halloween night, a menace rode \n in the shadows.Click here and \n run for your life!', {
            fontSize: 25 + "px",
            color : "yellow",
        });
            

        text.setInteractive();
        text.once('pointerup', function () {

            this.scene.start('gameScene');

        }, this);
        
        
	}

	update() {

	}


	
}

export default TitleScene;