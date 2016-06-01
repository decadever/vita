/**
 * Created by zhangxiancui on 16/5/12.
 */


window.onload = function () {

    var oNavBox = document.getElementById("navigation");
    var oBannerBox = document.getElementById("banner_wrap");
    var oBtnDown = document.getElementById("down");
    var oSkillBox = document.getElementById("skills_wrap");
    var oWorksBox = document.getElementById("works_wrap");
    var oContactBox = document.getElementById("contact_wrap");
    var oNav = oNavBox.children[0];
    var aNavLi = oNav.children;
    var len = aNavLi.length;
    var oMoveLi = aNavLi[len - 1];
    var iNow = 0;

    for (var i = 0; i < len - 1; i++) {
        (function(index){
            aNavLi[i].onmouseover = function () {
                move(oMoveLi, this.offsetLeft + 1);
                iNow = index;
            }
        })(i)
    }

    //
    //var downTimer = null;
    //downTimer = setInterval(fnDown,1000);



    //function fnDown(){
    //    console.log(1);
    //    myMove(oBtnDown,{top:450},{complete:function(){
    //        setTimeout(function(){
    //            myMove(oBtnDown,{top:400});
    //        },500);
    //    }});
    //}

    function getScrollPos(obj){
        return obj.getBoundingClientRect();
    }

    var arrPos = [];
    var docScrollT = document.documentElement.scrollTop || document.body.scrollTop;
    var oBannerBoxT = getScrollPos(oBannerBox).top;
    var oSkillBoxT = getScrollPos(oSkillBox).top-60;
    var oWorksBoxT = getScrollPos(oWorksBox).top-60;
    var oContactBoxT = getScrollPos(oContactBox).top-60;
    arrPos = [0,oSkillBoxT,oWorksBoxT,oContactBoxT];
    for (var i = 0; i < len-1; i++) {
        (function(index){
            aNavLi[i].onclick = function () {
                moveScroll(arrPos[index],500);
                console.log(arrPos[index],index);
            }
        })(i);
    }



    //作品展示特效
    var oWorksBox = document.getElementById("works_wrap");
    var oUl = oWorksBox.getElementsByTagName("ul")[0];
    var aLi = oUl.children;


    for (var i = 0; i < aLi.length; i++) {
        lagou(aLi[i]);
    }


    function getDir(obj, oEvent) {

        var json = obj.getBoundingClientRect();

        var x = oEvent.clientX - (json.left + obj.offsetWidth / 2);
        var y = json.top + obj.offsetHeight / 2 - oEvent.clientY;

        //0 左边 1 下面  2 右边  3 上面
        return Math.round((Math.atan2(y, x) * 180 / Math.PI + 180) / 90) % 4;

    }

    function lagou(oDiv) {
        oDiv.onmouseenter = function (ev) {
            var oEvent = ev || event;

            var n = getDir(this, oEvent);
            var oSpan = this.children[0];
            oSpan.onclick = function(){
                var oNext = this.nextSibling || this.nextElementSibling;
                oNext.click();

            };

            switch (n) {
                case 0://左
                    oSpan.style.left = "-280px";
                    oSpan.style.top = "200px";
                    break;
                case 1://下
                    oSpan.style.left = "0";
                    oSpan.style.top = "280px";
                    break;
                case 2://右
                    oSpan.style.left = "280px";
                    oSpan.style.top = "200px";
                    break;
                case 3://上
                    oSpan.style.left = "0";
                    oSpan.style.top = "-280px";

                    break;
            }
            myMove(oSpan, {left: 0, top: 0});

        };
        oDiv.onmouseleave = function (ev) {
            var oEvent = ev || event;

            var n = getDir(this, oEvent);
            var oSpan = this.children[0];

            switch (n) {
                case 0://左
                    myMove(oSpan, {left: -280, top: 200});
                    break;
                case 1://下
                    myMove(oSpan, {left: 0, top: 280});
                    break;
                case 2://右
                    myMove(oSpan, {left: 280, top: 200});
                    break;
                case 3://上
                    myMove(oSpan, {left: 0, top: -280});
                    break;
            }
        };

    }


    //skills模块

    var oSkillsBox = document.getElementById("skills_wrap");
    var oUl = oSkillsBox.getElementsByTagName("ul")[0];
    var aLi = oUl.children;
    var len = aLi.length;

    for (var i = 0; i < len; i++) {
        var d = 360 / len * i;
        aLi[i].style.transition = "1s all ease " + (len - i) * 200 + "ms";
        aLi[i].style.transform = "rotateY(" + d + "deg) translateZ(400px)";

        aLi[i].addEventListener("transitionend", function () {//判断运动完成
            focusImg();
        }, false);
    }

    function focusImg() {
        for (var i = 0; i < len; i++) {
            aLi[i].style.transition = "2s all ease";

            var d = (360 / len * i + y / 10) % 360;
//                        var d = 360 / len * i + y/10;
            if (d > 180) {
                d = 360 - d;
            }
            d = 180 - d;

            var scale = d / 180;

            scale < 0.4 && (scale = 0.4);
            scale > 0.8 && (scale = 1);
            aLi[i].style.opacity = scale;
        }

    }

    var x = 180;
    var y = 0;
    var speedX = 0;
    var speedY = 0;
    var lastX = 0;
    var lastY = 0;
    var timer = null;


    oSkillBox.onmousedown = function (ev) {

        var disX = ev.clientX - y;
        var disY = ev.clientY - x;

//                for (var i = 0; i < len; i++){
//                    aLi[i].style.opacity = 1;
//                }


        document.onmousemove = function (ev) {
            y = ev.clientX - disX;
            x = ev.clientY - disY;

            if (x > 150) x = 150;
            if (x < -150) x = -150;

            oUl.style.transform = "perspective(1200px) rotateX(" + (-x / 10) + "deg) rotateY(" + y / 10 + "deg)";

            speedX = x - lastX;
            speedY = y - lastY;
            lastX = x;
            lastY = y;
        };

        document.onmouseup = function (ev) {//甩出惯性
            document.onmousemove = null;
            document.onmouseup = null;

            clearInterval(timer);
            timer = setInterval(function () {

                x += speedX;
                y += speedY;

                ////摩擦
                speedX *= 0.95;
                speedY *= 0.95;

                if (x > 150) x = 150;
                if (x < -150) x = -150;


                if (Math.abs(speedX) < 1) speedX = 0;
                if (Math.abs(speedY) < 1) speedY = 0;

                if (speedX == 0 && speedY == 0) clearInterval(timer);

                oUl.style.transform = "perspective(1200px) rotateX(" + (-x / 10) + "deg) rotateY(" + y / 10 + "deg)";

                focusImg();

            }, 30);

        };
        return false;
    };




    function moveScroll(iTarget,time){
        //起点
        var start = document.documentElement.scrollTop || document.body.scrollTop;
        //距离
        var dis = iTarget - start;
        //次数
        var count = Math.round(time/30);

        var n = 0;
        var timer = null;
        clearInterval(timer);
        timer = setInterval(function(){
            n++;
            var a = 1 - n/count;
            var cur = start + dis*(1 - a*a*a);
            document.documentElement.scrollTop = cur;
            document.body.scrollTop = cur;

            if(n == count){
                clearInterval(timer);
            }
        },30);
    }


    function move(obj, iTarget) {

        var left = obj.offsetLeft;
        var speed = 0;

        clearInterval(obj.timer);
        obj.timer = setInterval(function () {

            speed += (iTarget - left) / 10;
            speed *= 0.8;
            left += speed;

            obj.style.left = Math.round(left) + "px";
            if (obj.offsetLeft == iTarget && Math.abs(speed) < 1) {
                clearInterval(obj.timer);
            }

        }, 30)

    }

};

