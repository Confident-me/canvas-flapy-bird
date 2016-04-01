/*window.onload=function(){
    // console.log(canvas)
   
	var bird={
		x:140,
		y:264,
		w:40,
		h:40,
	};
	var guan=[
		{
			top:{x:220,y:0,w:50,h:250},
			bottom:{x:220,y:350,w:50,h:228}
		},{
			top:{x:400,y:0,w:50,h:250},
			bottom:{x:400,y:350,w:50,h:228}
		}
	]

	var ctx=document.querySelector("#canvas").getContext('2d');
	//ctx.fillRect(bird.x,bird.y,bird.w,bird.h);
	var draw=function(){
         ctx.clearRect(0,0,320,568);
		//画小鸟
		bird.y+=1;
         ctx.fillRect(bird.x,bird.y,bird.w,bird.h);

        //背景
        var img = new Image();
        var img = 'img/bg1.jpg';
        var gb = [{x:0,y:0},{x:320,y:0}];
        img.onload = function(){
            ctx.clearRect(0,0,320,568);
            bg[0].x -=2;
            ctx.drawImage(img,bg[0].x,bg[0].y);
            bg[1].x -= 2;
            ctx.drawImage(imgBG,bg[1].x,bg[1].y);
            if(bg[0].x <= -384){
                bg[0].x = 384;
            }else if(bg[1].x <= -384){
                bg[1].x = 384;
            }
        }

         //画管道
         var vas;
         for(var i=0;i<guan.length;i++){
         	var d=guan[i];
         	d.top.x-=1;
         	d.bottom.x-=1;
         	ctx.fillRect(d.top.x,d.top.y,d.top.w,d.top.h);
         	ctx.fillRect(d.bottom.x,d.bottom.y,d.bottom.w,d.bottom.h);
         	if(recvsrec(bird,d.top)||recvsrec(bird,d.bottom)){
         		vas=true;
         	}
         	if(d.top.x<=-d.top.w){
         		d.top.x=320;
         		d.bottom.x=320
         		var h=Math.random()*100+250;
		        d.top.h=h;
		        d.bottom.y=h+100;
         	}
         }
         	if(vas){
         		return;
         	}

         //边界判断
		if(bird.y>=568-40){
			ctx.fillRect(140,528,bird.w,bird.h);
		}else if(bird.y<=0){
			ctx.fillRect(140,0,bird.w,bird.h);
		}else{
			window.requestAnimationFrame(draw);
		}
	}
	canvas.onclick=function(){
		bird.y-=20;
	}
	window.requestAnimationFrame(draw);
  //判断矩形碰撞
  //rect0  
	var recvsrec =  function(rect0,rect1){
    if (rect0.x >= rect1.x && rect0.x >= rect1.x + rect1.w) {
      return false;
    } else if (rect0.x <= rect1.x && rect0.x + rect0.w <= rect1.x) {
      return false;
    } else if (rect0.y >= rect1.y && rect0.y >= rect1.y + rect1.h) {
      return false;
    } else if (rect0.y <= rect1.y && rect0.y + rect0.h <= rect1.y) {
      return false;
    }
    return true;
  };

}*/






window.onload = function(){
    var canvas = document.querySelector('#canvas');
    var ctx = canvas.getContext('2d');
    var bird = {x:170,y:234,w:45,h:33};
    var ground = [{x:0,y:505},{x:384,y:505}];
    var gd = [{x:314,y:-130,w:70,h:304},{x:314,y:286,w:70,h:304},{x:576,y:-170,w:70,h:304},{x:576,y:312,w:70,h:304}];
    var bg = [{x:0,y:0},{x:384,y:0}];
    var animation;
    var reset = document.querySelector('#reset');
    var start = document.querySelector('#start');
    var guandaoflag = false;

    //随机函数
    var gdY1,gdY2;
    var random1 = function(){
        gdY1 = Math.random()*232-232;
        gd[0].y = gdY1;
        gd[1].y = 416+gdY1;

    }
    var random2 = function(){
        gdY2 = Math.random()*232-232;
        gd[2].y = gdY2;
        gd[3].y = 416+gdY2;
    }
    random2();

    //start
    start.onclick = function(){
        start.style.display = 'none';
        guandaoflag = true;
    }
    if(!guandaoflag){
        a = 0;
    }

    var a = 1;

    //界面绘制
    var draw = function(){
        //检测模型碰撞
        var collide = function(rect0,rect1){
            if (rect0.x >= rect1.x && rect0.x >= rect1.x + rect1.w) {
              return false;
            } else if (rect0.x <= rect1.x && rect0.x + rect0.w <= rect1.x) {
              return false;
            } else if (rect0.y >= rect1.y && rect0.y >= rect1.y + rect1.h) {
              return false;
            } else if (rect0.y <= rect1.y && rect0.y + rect0.h <= rect1.y) {
              return false;
            }
            return true;
        };

        //背景
        var imgBG = new Image();
        imgBG.src = 'img/bg2.jpg';
        imgBG.onload = function(){
            ctx.clearRect(0,0,320,568);
            bg[0].x -= 2;
            ctx.drawImage(imgBG,bg[0].x,bg[0].y);
            bg[1].x -= 2;
            ctx.drawImage(imgBG,bg[1].x,bg[1].y);
            if(bg[0].x <= -320){
                bg[0].x = 320;
            }else if(bg[1].x <= -320){
                bg[1].x = 320;
            }
        }

        //管道 间距72
        var guandao = function(){
            var stopUp = new Image();
            stopUp.src = 'img/g-up.png';
            var stopDown = new Image();
            stopDown.src = 'img/g-down.png';
            stopUp.onload = stopDown.onload = function(){
                //初始第一组管道
                gd[0].x -= 1;
                ctx.drawImage(stopUp,gd[0].x,gd[0].y);
                gd[1].x -= 1;
                ctx.drawImage(stopDown,gd[1].x,gd[1].y);
                //初始第二组管道
                gd[2].x -= 1;
                ctx.drawImage(stopUp,gd[2].x,gdY2);
                gd[3].x -= 1;
                ctx.drawImage(stopDown,gd[3].x,416+gdY2);
                //管道循环
                if(gd[0].x <= -70){
                    random1();
                    gd[0].x = 454;
                    ctx.drawImage(stopUp,gd[0].x,gdY1);
                    gd[1].x = 454;
                    ctx.drawImage(stopDown,gd[1].x,416+gdY1);
                }else if(gd[2].x <= -70){
                    random2();
                    gd[2].x = 454;
                    ctx.drawImage(stopUp,gd[2].x,gdY2);
                    gd[3].x = 454;
                    ctx.drawImage(stopDown,gd[3].x,416+gdY2);
                }
            }
        }
        if(guandaoflag){
            guandao();
        }

        //地面
        var imgGround = new Image();
        imgGround.src = 'img/ground.png';
        imgGround.onload = function(){
            ground[0].x -= 2;
            ctx.drawImage(imgGround,ground[0].x,ground[0].y);
            ground[1].x -= 2;
            ctx.drawImage(imgGround,ground[1].x,ground[1].y);
            if(ground[0].x <= -384){
                ground[0].x = 384;
            }
            else if(ground[1].x <= -384){
                ground[1].x = 384;
            }
        }

        //小鸟
        var speed = function(){
            /*a *= 1.01;
            a += 0.08;*/
            bird.y += 1.6;
        }
        if(guandaoflag){
            speed();
        }
        var imgBirdMid = new Image();
        imgBirdMid.src = 'img/bird-mid2.png';
        imgBirdMid.onload = function(){
            ctx.drawImage(imgBirdMid,bird.x,bird.y);
        }
        if(collide(bird,gd[0]) || collide(bird,gd[1]) || collide(bird,gd[2]) || collide(bird,gd[3])){
            reset.style.display = 'block';
            var imgGO = new Image();
            imgGO.src = 'img/gameover1.png';
            imgGO.onload = function(){
                ctx.drawImage(imgGO,64,200);
            }
            var imgRe = new Image();
            imgRe.src = 'img/reset2.png';
            imgRe.onload = function(){
                ctx.drawImage(imgRe,70,320);
            }
            return;
        }

        //检测碰撞底部和顶部
        if(bird.y <= 0){
            ctx.drawImage(imgBirdMid,bird.x,0);
            window.cancelAnimationFrame(animation);
            reset.style.display = 'block';
            var imgGO = new Image();
            imgGO.src = 'img/gameover.png';
            imgGO.onload = function(){
                ctx.drawImage(imgGO,64,200);
            }
            var imgRe = new Image();
            imgRe.src = 'img/reset2.png';
            imgRe.onload = function(){
                ctx.drawImage(imgRe,70,320);
            }
        }else if(bird.y >= 568-20){
            ctx.drawImage(imgBirdMid,bird.x,415);
            window.cancelAnimationFrame(animation);
            reset.style.display = 'block';
            var imgGO = new Image();
            imgGO.src = 'img/gameover.png';
            imgGO.onload = function(){
                ctx.drawImage(imgGO,64,200);
            }
            var imgRe = new Image();
            imgRe.src = 'img/reset2.png';
            imgRe.onload = function(){
                ctx.drawImage(imgRe,70,320);
            }
        }else{
            window.requestAnimationFrame(draw);
        }

    }
    animation = window.requestAnimationFrame(draw);
    
    canvas.onclick = function(){
        a = 3;
        bird.y += -45;
    }

    //reset
    reset.onclick = function(){
        location.reload();
    }
}