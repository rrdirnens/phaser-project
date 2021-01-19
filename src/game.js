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
let speed = 300;
let cursors;


function preload() {
    this.load.image('tiles', 'assets/btp-map.png')
    this.load.spritesheet('dude',
        'assets/dude.png', {
            frameWidth: 32,
            frameHeight: 48
        }
    );
}



function create() {
    const level = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        
    ];

    const map = this.make.tilemap({
        data: level,
        tileWidth: 16,
        tileHeight: 16
    });
    const tiles = map.addTilesetImage("tiles");
    const layer = map.createStaticLayer(0, tiles, 0, 0);

    player = this.physics.add.sprite(100, 100, 'dude');
    player.setCollideWorldBounds(true);
    player.body.setVelocity(0);
    player.body.allowGravity = false;

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', {
            start: 0,
            end: 3
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{
            key: 'dude',
            frame: 4
        }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', {
            start: 5,
            end: 8
        }),
        frameRate: 10,
        repeat: -1
    });


    // this.physics.add.collider(player, platforms);

    cursors = this.input.keyboard.createCursorKeys();

}

function update() {
    if (cursors.left.isDown) {
        player.setVelocity(-speed, 0);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocity(speed, 0);
        player.anims.play('right', true);
    } else if (cursors.down.isDown) {
        player.setVelocity(0, speed);
    } else if (cursors.up.isDown) {
        player.setVelocity(0, -speed)
    } else {

        player.anims.play('turn');
    }

    // if (cursors.up.isDown && player.body.touching.down) {
    //     player.setVelocityY(-600);
    // }
}