class VictoryScene extends Phaser.Scene {

	constructor() {
		super({key : 'victoryScene'});
	}


	preload() {
		this.load.image('victoryScene', 'src/assets/trap.jpg');
	}

	create() {
        let bg = this.add.sprite(0,0,'victoryScene');
        bg.setOrigin(0,0);
        
        let text = this.add.text(100,100, "It's a trap !  Did you  really \nthink you could escape your\ndeath? (Click here)", {
            fontSize: 30 + "px",
            color : "yellow",
            fontWeight:600,
            backgroundColor: "rgba(0,0,0,0.6)",
        });

        text.setInteractive();
        text.once('pointerup', function () {

            this.scene.start('titleScene');

        }, this);
	}

	update() {

	}



}

export default VictoryScene;