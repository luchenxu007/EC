
window.onload=function  () {
	// getElementsByClassName跟按ID获取的不一样，getElementsByClassName默认返回的是数组
	var showImg=document.getElementById('showImg');
	var list_img=document.getElementById('list_img');
	var buttons=document.getElementById('button').getElementsByTagName('span');
	var prev=document.getElementById('prev');
	var next=document.getElementById('next');
 	var index=1;//标示第几个小圆点亮起来
    //判断是否正在进行动画，如果在就先不调用animate函数频繁调用该函数
    var isAanimated=false;
    var timer;//自动切换的定时器

    function showButton(){
    	//在加颜色之前把前面一个去掉
    	for (var i = 0; i < buttons.length; i++) {
    		if(buttons[i].className=='on'){
    			buttons[i].className='';
    			break;
    		}
    	};
    	//给小圆点添加颜色
    	buttons[index-1].className='on';
    }

    function animate(offset){
    	isAanimated=true;
    	var newLeft=parseInt(list_img.style.left)+offset;
    	//缓慢偏移效果
    	var time=200;//位移总时间
    	var interval=10;//间隔时间
    	var speed=offset/(time/interval);
    	function go(){
    		if((speed<0&&parseInt(list_img.style.left)>newLeft)||(speed>0&&parseInt(list_img.style.left)<newLeft)){
    			list_img.style.left = parseInt(list_img.style.left) + speed + 'px';
                setTimeout(go, interval);
    		}else{
    			isAanimated=false;
    			list_img.style.left=newLeft+'px';
		    	if(newLeft>-900){
		    		list_img.style.left=-4500+'px';
		    	}
		    	if(newLeft<-4500){
		    		list_img.style.left=-900+'px';
		    	}
    		}
    	}
    	go();
    }

    //自动切换
    function play(){
    	timer=setInterval(function(){
    		next.onclick();
    	},4500);
    }
    //停止切换
    function stop(){
    	clearInterval(timer);
    }

    //点击下一张触发
    next.onclick=function(){
    	if(index==5){
			index=1;
    	}else{
    		index+=1;
    	}
    	
    	showButton();
    	if (!isAanimated) {
    		animate(-900);
    	};
    	// list_img.style.left=parseInt(list_img.style.left)-900+'px';
    }
    prev.onclick=function(){
    	if(index==1){
    		index=5;
    	}else{
    		index-=1;
    	}
    	showButton();
    	//正在动画中就不能调用animate函数，要等动画结束后再执行下一次动画
    	if (isAanimated==false) {
    		animate(+900);
    	};
    	// list_img.style.left=parseInt(list_img.style.left)+900+'px';
    }

    //点击小圆点切换
    for (var i = 0; i < buttons.length; i++) {
    	buttons[i].onclick=function(){
    		//优化:如果点击当前就不执行下面代码
    		if (this.className=='on') {
    			return;
    		};
    		var myIndex=parseInt(this.getAttribute('index'));
    		var offset=-900*(myIndex-index);
    		if (isAanimated==false) {
    			animate(offset);
    		};
    		index=myIndex;
    		showButton();
    	}
    };
    //鼠标移上去就停止动画
    showImg.onmouseover=stop;
    showImg.onmouseout=play;
    play();//加载时就执行切换
}