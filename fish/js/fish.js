//版权 北京智能社©, 保留所有权利
function Fish(imgs,type){
	Sprite.call(this,imgs["fish"+type]);	
	this.count = 0;
	
	var size = [
		null,
		{w: 37, h: 55},
		{w: 64, h: 78},
		{w: 56, h: 72},
		{w: 59, h: 77},
		{w: 122, h: 107}
	];
	
	this.w = size[type].w;
	this.h = size[type].h;
	
	this.rotate = 90;
	
	this.speed = rnd(2,6);
	
}

Fish.prototype = new Sprite();
Fish.prototype.constructor = Fish;

var oldMove = Sprite.prototype.move;
Fish.prototype.move = function(){
	//30ms
	oldMove.call(this);	
	this.count++;
	
	//120ms 换图片
	if(this.count%4 == 0){
		this.sx += this.w;
		if(this.sx >= this.w*4){
			this.sx = 0;
		}
	}
};