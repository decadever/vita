/**
 * Created by zhangxiancui on 16/5/12.
 */


window.onload = function(){

    var oNavBox = document.getElementById("navigation");
    var oNav = oNavBox.children[0];
    var oCur = oNavBox.getElementsByTagName("div")[0];
    var oNavLi = oNav.children;
    var len = oNavLi.length;
    for (var i = 0; i < len-1; i++){
        oNavLi[i].onmouseover = function(){
            oCur.style.transition = "none";
            oCur.style.transform = "none";
            move(oCur,this.offsetLeft+1,function(){
                //oCur.onmouseover = function(){
                //    oCur.style.transition = "0.5s all ease";
                //    oCur.style.transform = "rotateX(90deg)";
                //};
                //
                //oCur.onmouseout = function(){
                //    oCur.style.transition = "0.5s all ease";
                //    oCur.style.transform = "rotateX(0deg)";
                //};
            });
            oCur.children[0].innerHTML = this.innerHTML;
            oCur.children[1].innerHTML = this.innerHTML;

        };


    }


    var oCon = document.getElementById("content");
    var oUl = oCon.getElementsByTagName("ul")[0];
    var aLi = oUl.children;
    var len = aLi.length;

    for (var i = 0; i < len; i++) {
        var d = 360 / len * i;
        aLi[i].style.transition = "1s all ease " + (len - i) * 200 + "ms";
        aLi[i].style.transform = "rotateY(" + d + "deg) translateZ(300px) ";

        //判断运动完成
        aLi[i].addEventListener("transitionend", function () {
            for (var i = 0; i < len; i++) {
                aLi[i].style.transition = "1s all ease";
                var d = (360 / len * i+y/10)%360;

                if (d > 180) {
                    d = 360 - d;
                }
                d = 180 - d;

                var scale = d / 180;

                scale < 0.3 && (scale = 0.3);

                //aLi[i].innerHTML = scale.toFixed(2);
                aLi[i].style.opacity = scale;
            }
        }, false);
    }




    var x = 150;
    var y = 0;

    //甩
    var timer = null;
    var speedX = 0;
    var speedY = 0;
    var lastX = 0;
    var lastY = 0;
    var count = 0;
    document.onmousedown = function (ev) {
        var disX = ev.clientX - y;
        var disY = ev.clientY - x;
        clearInterval(timer);
        document.onmousemove = function (ev) {
            y = ev.clientX - disX;
            x = ev.clientY - disY;

            //限定范围
            if (x > 600) {
                x = 600;
            } else if (x < -600) {
                x = -600
            }

            oUl.style.transform = "perspective(800px) rotateX(" + -x / 10 + "deg) rotateY(" + y / 10 + "deg)";

            //算速度
            speedX = x - lastX;
            speedY = y - lastY;
            lastX = x;
            lastY = y;

        };
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;

            //开定时器
            clearInterval(timer);
            timer = setInterval(function () {
                x += speedX;
                y += speedY;
                speedX *= 0.95;
                speedY *= 0.95;

                //限定范围
                if (x > 600) {
                    x = 600;
                } else if (x < -600) {
                    x = -600
                }

                if (Math.abs(speedX) < 1) {
                    speedX = 0;
                }
                if (Math.abs(speedY) < 1) {
                    speedY = 0;
                }

                if (speedX == 0 && speedY == 0) {
                    clearInterval(timer);
                }

                document.title = count++;
                oUl.style.transform = "perspective(800px) rotateX(" + -x / 10 + "deg) rotateY(" + y / 10 + "deg)";

            }, 30);
        };
        return false;
    };




    function move(obj,iTarget,fn){

        var left = obj.offsetLeft;
        var speed = 0;

        clearInterval(obj.timer);
        obj.timer = setInterval(function(){
            speed += (iTarget - left)/5;
            speed *= 0.7;
            left += speed;

            obj.style.left = Math.round(left) + "px";
            if (obj.offsetLeft == iTarget && Math.abs(speed) < 1){
                clearInterval(obj.timer);
                fn && fn();
            }

        },30)

    }

    };

