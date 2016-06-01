//版权 北京智能社©, 保留所有权利
//参数最小化原则
function Sprite(oImg){
	
	this.oImg = oImg;
	this.w = 0;
	this.h = 0;
	
	this.sx = 0;
	this.sy = 0;
	this.x = 0;
	this.y = 0;
	
	this.speed = 0;
	this.rotate = 0;
		
}
Sprite.prototype.draw = function(gd){
	gd.save();
	gd.translate(this.x,this.y);
	gd.rotate(d2a(this.rotate));
	gd.drawImage(
		this.oImg,
		this.sx,this.sy,this.w,this.h,
		-this.w/2,-this.h/2,this.w,this.h
	);
	gd.restore();	
};
Sprite.prototype.move = function(){
	//简单实现
	//this.x += this.speed;	
	var speedX = Math.cos(d2a(this.rotate - 90))*this.speed;
	var speedY = Math.sin(d2a(this.rotate - 90))*this.speed;
	this.x += speedX;
	this.y += speedY;
};
Sprite.prototype.collTest = function(obj){
	//this ---> obj
	
	var r1 = Math.min(this.w,this.h)/2;
	var r2 = Math.min(obj.w,obj.h)/2;
	
	var a = this.x - obj.x;
	var b = this.y - obj.y;
	
	var dis = Math.sqrt(a*a + b*b);
	
	if(dis < (r1 + r2)*0.7){
		return true;//碰上了
	}
	
	return false;//没碰上	
};








