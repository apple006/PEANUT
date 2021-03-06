window.onload=function(){
	WIN_WIDTH = document.documentElement.clientWidth;
	WIN_HEIGHT = document.documentElement.clientHeight;
	Canvas = document.getElementById("can");
	CTX = Canvas.getContext("2d");
	

	Canvas.init=function(){
		this.width = WIN_WIDTH;
		this.height = WIN_HEIGHT;
	}
	Canvas.init();
	config={
		length:900,
		x:(WIN_WIDTH - 900)/2,
		ballX:(WIN_WIDTH - 900)/2,
		y:100,
		vx:4,
		reach:false
	}
	Canvas.drawLine=function(config){
		CTX.save();
		CTX.beginPath();              
		CTX.lineWidth="1";
		CTX.strokeStyle="hsl(206, 82%, 67%)"; 
		CTX.moveTo(config.x,config.y);
		CTX.lineTo(config.x+config.length,config.y);
		CTX.stroke();
		CTX.font="40px sans-serif";
		CTX.strokeText("Loading....",10,50)
		CTX.restore()		
	}	
	Canvas.drawBall = function(config,r){
		CTX.save();
		CTX.shadowBlur=8;
		CTX.fillStyle="rgb(61,243,255)"
		CTX.shadowColor="white";
		CTX.beginPath();
		CTX.arc(config.ballX,config.y,r,0,2*Math.PI,true);
		CTX.closePath();
		CTX.fill();
		CTX.restore();	
	}	
	
	function translateX(config){
		if(config.ballX<config.length+config.x)
			{config.ballX+=config.vx;}
		else {config.reach=true};
	}


	
	// 度数转换成弧度
	function dToR(degree){
	  return degree * (Math.PI / 180);
	}

	Canvas.drawCircle = function(config){
		CTX.save();
		CTX.shadowBlur=config.blur;
		CTX.lineWidth=config.bold;
		CTX.shadowColor="white";
		CTX.lineCap="round";
		if(config.rotated==true){
			CTX.strokeStyle=config.strokeStyle.rotate
			CTX.translate(config.x,config.y);
			CTX.beginPath();
			CTX.clearRect(-config.r-config.bold-config.blur,
							-config.r-config.bold-config.blur,
							2*(config.r+config.bold+config.blur)+20,
							2*(config.r+config.bold+config.blur)+20
						);
			CTX.arc(0,0,config.r,0,dToR(config.degree),false);
			CTX.rotate(dToR(config.degree));
		}else{
			CTX.beginPath();
			CTX.strokeStyle=config.strokeStyle.fix
			CTX.arc(config.x,config.y,config.r,0,dToR(config.degree),true);
		}

		if(config.closePath==true){
			CTX.closePath();
		}
		CTX.stroke();
		CTX.restore();
	}
	

	outConfig={
		bold:5,
		x:(WIN_WIDTH - 600)/2,
		y:300,
		blur:8,
		r:120,
		degree:360,
		closePath:true,
		strokeStyle:{
			rotate:gradient1,
			fix:"rgba(61,243,255,0.4)"
		},
	}	
	var gradient1 = CTX.createLinearGradient(-120, 300, 120, 300);
		gradient1.addColorStop(0, "rgba(61,243,255,.1)");
		gradient1.addColorStop(1, 'rgb(61,243,255)');
	var gradient2 = CTX.createLinearGradient((WIN_WIDTH - 600)/2-120, 300, (WIN_WIDTH - 600)/2+240, 300);
		gradient2.addColorStop(0, "rgba(61,243,255,.1)");
		gradient2.addColorStop(1, 'rgb(61,243,255)');
	rotateConfig={
		bold:12,
		x:(WIN_WIDTH - 600)/2,
		y:300,
		blur:5,
		r:120,
		degree:0,
		closePath:false,
		strokeStyle:{
			rotate:gradient1,
			fix:gradient1
		},
		rotated:true,
		ration:4
	}
	function rotate(){
		rotateConfig.degree+=rotateConfig.ration;
	}
	Canvas.drawLine(config);	
	setInterval(function(){
		if(config.reach==false){
			Canvas.drawBall(config,4);
			translateX(config);
		}
		Canvas.drawCircle(rotateConfig);
		rotate();

	},16.7);
}	