class TitleScene extends Phaser.Scene {

	constructor() {
		super({key : 'titleScene'});
	}

    preload() {
		this.load.image('background', 'src/assets/background.jpg');
	}

	create() {
		 var bg = this.add.sprite(0,0,'background');
		  bg.setOrigin(0,0);

		  var text = this.add.text(100,100, 'Run for your life!');
	}

	update() {

	}


	
}

export default TitleScene;