/** @type {import("../typings/phaser")} */


var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);
let player;
let speed = 600;
let cursors;


function preload() {
    this.load.image('tiles', 'assets/btp-map.png')
    this.load.tilemapTiledJSON('map', 'assets/NewMapWithHiddenLayer.JSON')
    this.load.spritesheet('dude',
        'assets/player.png', {
            frameWidth: 8,
            frameHeight: 8
        }
    );
}



function create() {

    const map = this.make.tilemap({
        key: 'map'
    });

    const tileset = map.addTilesetImage('btp-map', 'tiles');

    const life = map.createLayer("life", tileset, 0, 0)
    const hidden = map.createLayer("hidden", tileset, 0, 0)

    player = this.physics.add.sprite(0, 130, 'dude');
    player.setCollideWorldBounds(true);
    player.body.setVelocityX(speed);
    player.body.allowGravity = false;

    this.physics.add.overlap(this.player, this.hidden, this.handleHidden, undefined, this)

    

    // hidden.setCollisionByProperty({
    //     collides: true
    // });

    // this.physics.add.collider(player, death);

    cursors = this.input.keyboard.createCursorKeys();

    // this.physics.add.collider(player, death, playerDies, null, this)

}

function update() {
    if (cursors.left.isDown) {
        player.setVelocity(-speed, 0);
    } else if (cursors.right.isDown) {
        player.setVelocity(speed, 0);
    } else if (cursors.down.isDown) {
        player.setVelocity(0, speed);
    } else if (cursors.up.isDown) {
        player.setVelocity(0, -speed)
    } else {
        
    }

}

function playerDies() {
    this.scene.restart();
}

function handleHidden(player, hidden) {

    console.log('overlap')
    //hide from display
    //this.carrots.killAndHide(carrot)

    //disable from physics world
    //this.physics.world.disableBody(carrot.body)

    //increment score  by 1
    //this.carrotsCollected++

    //create new text value and set it to the variable
    // const value = `Carrots: ${this.carrotsCollected}`
    // this.carrotsCollectedText.text = value

}