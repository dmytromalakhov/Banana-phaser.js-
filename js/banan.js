var game = new Phaser. Game(1280, 720, Phaser.CANVAS, 'phaser-example', {preload:preload, create:create, update:update, render:render});
var arroy=[];
var toycount = 9;

function preload() {
	game.load.image('banan','img/banan.png') //banan

	game.load.image('ground', 'img/background.jpg'); //background
	
	game.load.spritesheet('Play','img/start-here.png', 64, 64); //button
	loadToys();
}

function loadToys(){
	for (var i=1; i<=toycount; i++){
		game.load.image('toy'+i.toString(),'img/i'+i.toString()+'.png')
		arroy[i]= 'toy'+i.toString();
	}
}
function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE) //physics

	game.add.sprite(0, 0, 'ground'); //background
	
	buttonPlay = game.add.button(20, 55, 'Play', actionOnClick, this); //button

	banan = game.add.sprite (340, 55, 'banan');
	game.physics.arcade.enable(banan);

	toys = game.add.group(); //logic 
	toys.enableBody = true; //physics

}

function actionOnClick(){
	toy = toys.create(game.rnd.integerInRange(1,3)*70, 0, arroy[game.rnd.integerInRange(1,toycount)]);
	toy.body.gravity.y = 300;
	toy.body.collideWorldBounds = true;
	toy.body.bounce.y = 0.7+Math.random()*0.2;
	toy.inputEnabled = true;
	toy.input.enableDrag(false,true);
	toy.events.onInputDown.add(onClick, this);
	toy.events.onDragStop.add(onDragStop, this);
}
 
function onDragStop(item){
 	
	if(game.physics.arcade.overlap(item, banan)){
		item.body.gravity = false;}
	else{
		item.body.moves = true;
	}
}

function onClick(item){
	item.body.moves = false;
	item.body.velocity.y = 0;
}
function update(){}
function render(){}