
var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var r = 17;
var x=canvas.width/4;
var y=canvas.height/2;
var dx,dy;
dx=0;
dy=-4;
var mul=1;
var gravity = -0.15;
var isps = false;

var bar_top,bar_down;
var barx=canvas.width-10;
var score = 0,done=0;
bar_top = bar_down = 200;
var bar_speed = 1.8;
var lost = false;
var mx_score = 0;

function reset(){
	score = 0;
	done=0;
	gravity = -0.15;
	lost = false;
	isps = false;
	bar_top = bar_down = 200;
	bar_speed = 1.8;
	barx=canvas.width-10;
	x = canvas.width/4;
	y = canvas.height/2;
	dx = 0;
	dy = -4;
}

function getRandomInt(min, max) {
	done=0;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function max(a,b){
	return a>b?a:b;
}

function smile(){
	ctx.beginPath();
	ctx.moveTo(x+10,y);
	ctx.arc(x,y,10,0,Math.PI,false);
	ctx.moveTo(x-5,y-4);
	ctx.arc(x-5,y-4,2.5,0,Math.PI*2,false);
	ctx.moveTo(x+5,y-4);
	ctx.arc(x+5,y-4,2.5,0,Math.PI*2,false);
	ctx.stroke();
}

function tensed(){
	ctx.beginPath();
	ctx.moveTo(x+4,y+8);
	ctx.arc(x,y+8,4,0,Math.PI*2,true);
	ctx.moveTo(x-4,y-3);
	ctx.arc(x-4,y-3,2.5,0,Math.PI*2,false);
	ctx.moveTo(x+4,y-3);
	ctx.arc(x+4,y-3,2.5,0,Math.PI*2,false);
	ctx.stroke();
	ctx.closePath();
}

function cry(){
	ctx.beginPath();
	ctx.moveTo(x+7,y+8);
	ctx.arc(x,y+10,7,0,Math.PI,true);
	ctx.moveTo(x-5,y-4);
	ctx.arc(x-5,y-4,2.5,0,Math.PI*2,false);
	ctx.moveTo(x+5,y-4);
	ctx.arc(x+5,y-4,2.5,0,Math.PI*2,false);
	ctx.stroke();
	ctx.closePath();
}

function draw_ball(){
	ctx.beginPath();
	ctx.arc(x,y,r,0,2*Math.PI,false);
	ctx.fillStyle = '#ffff66';
	ctx.fill();
	ctx.lineWidth = 1.5;
	ctx.stroke();
	ctx.font = "15px courier";
	ctx.fillStyle = "black";
	ctx.fillText("SCORE:",595,30);
	ctx.font = "15px courier";
	ctx.fillStyle = "black";
	ctx.fillText(score,650,30);
	ctx.font = "15px courier";
	ctx.fillStyle = "black";
	ctx.fillText("BEST:",595,50);
	ctx.font = "15px courier";
	ctx.fillStyle = "black";
	ctx.fillText(mx_score,640,50);

	if (lost==true) cry();
	else if (barx>x && barx-x<200) tensed();
	else smile();
}

function draw_bar(){
	ctx.beginPath();
	ctx.rect(barx,0,10,bar_top);
	ctx.rect(barx,canvas.height-bar_down,10,bar_down);
	ctx.lineWidth = 1;
	ctx.strokeRect(barx,0,10,bar_top);
	ctx.strokeRect(barx,canvas.height-bar_down,10,bar_down);
	ctx.fillStyle = '#0099cc';
	ctx.fill();
	ctx.closePath();
}

function draw(){
	if (isps==false){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.beginPath();
		ctx.rect(0,300,700,200);
		ctx.fillStyle = '#99ff66';
		ctx.fill();
		ctx.closePath();

		ctx.beginPath();
		ctx.rect(0,0,700,300);
		ctx.fillStyle = '#ccffff';
		ctx.fill();
		ctx.closePath();
		
		<!--lost Conditions-->
		if (x+(r)>barx && x-(r)<barx+10){
			if ((y-(r)<=bar_top) || (y+(r)>=canvas.height-bar_down)){
				isps = true;
				lost = true;
			}
		}

		if (y+(r)>canvas.height||y-(r)<0){
			isps = lost = true;
		}

		if (done==0 && x-r>barx+10){
			score+=1;
			mx_score = max(mx_score,score);
			done = 1;
		}


		if (x+(r)>=canvas.width||x<=(r)) dx*=-1;
		x+=dx;
		dy-=gravity;
		y+=dy;
		barx-=bar_speed;
		draw_ball();
		draw_bar();
		if (barx<0){
			bar_top = getRandomInt(20,320);
			bar_down = 400-bar_top;
			barx = canvas.width;
		}
	}
}

function keyDownHandler(key){
	if (key.keyCode==13) reset();
	if (lost==false){
		if (isps==false){
			if (key.keyCode==38) dy=-4.5;
			if (key.keyCode==39) dx+=.1;
			if (key.keyCode==37) dx-=.1;
		}
		if (key.keyCode==32){
			if (isps==false) isps = true;
			else{
				dy = -4.5;
				isps = false;
			}
		}
	}
}

document.addEventListener("keydown",keyDownHandler,false);
setInterval(draw,7);
