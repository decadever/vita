//版权 北京智能社©, 保留所有权利
function loadImages(json,fn){
	var count = 0;//计数器
	var len = 0;//统计 json的个数
	var result = {};
	for(var name in json){
		len++;
		var oImg = new Image();
		result[name] = oImg;
		oImg.onload = function(){
			count++;
			if(len == count){
				fn && fn(result);
			}
		};
		oImg.src = json[name];
	}
}


function rnd(n,m){
	return Math.floor(Math.random()*(m-n) + 1);	
}

function d2a(n){
	return n*Math.PI/180;	
}
function a2d(n){
	return n*180/Math.PI;	
}