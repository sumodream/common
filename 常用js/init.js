//under here there is function about fuc* dota
//定义当前页面和最后页面
var now = {row : 1,col : 1};
var last = {row : 0,col : 0};

//定义常量 上右下左消失
const TOWORDS = {
	UP : 1,
	RIGHT : 2,
	DOWN : 3,
	LEFT : 4,
	FADEOUT:5,
};

//初始动画
var isAnimating = false;

//定义动画页面
var pageAnimations = {
	//页面计数 4页
	_page_count : 4,
	//页面动画时间600毫秒
	_animation_time : 600,
	//动画方法
	doAnimate : function(towards) {
		//定义前一个页面和当前页面类
		var lastPage = ".page-" + last.row + "-" + last.col;
		var nowPage = ".page-" + now.row + "-" + now.col;
		//做判断 行驶的方向
		switch(towards) {
		case TOWORDS.UP:
			outClass = 'pt-page-moveToTop';
			inClass = 'pt-page-moveFromBottom';
			break;
		case TOWORDS.RIGHT:
			outClass = 'pt-page-moveToRight';
			inClass = 'pt-page-moveFromLeft';
			break;
		case TOWORDS.DOWN:
			outClass = 'pt-page-moveToBottom';
			inClass = 'pt-page-moveFromTop';
			break;
		case TOWORDS.LEFT:
			outClass = 'pt-page-moveToLeft';
			inClass = 'pt-page-moveFromRight';
			break;
		case TOWORDS.FADEOUT:
			outClass = 'pt-page-scaleDown-slow';
			inClass = 'pt-page-scaleUp';
			break;
		case TOWORDS.NORMAL:
			outClass = 'pt-page-scaleDown-quick';
			inClass = 'pt-page-scaleUp';
			break;
		}
		//动画开始运行
		isAnimating = true;
		//当前页面动画隐藏
		$(nowPage).removeClass("hide");
		//前一个页面动画
		$(lastPage).addClass(outClass);
		//当前页面动画
		$(nowPage).addClass(inClass);
		//设定时间执行方法
		setTimeout(function() {
			$(lastPage).removeClass('page-current');
			$(lastPage).removeClass(outClass);
			$(lastPage).addClass("hide");
			$(lastPage).find("img").addClass("hide");
			$(lastPage).find(".for-show").addClass("hide");
			$(nowPage).addClass('page-current');
			$(nowPage).removeClass(inClass);
			$(nowPage).find("img").removeClass("hide");
			$(nowPage).find(".for-show").removeClass("hide");
			isAnimating = false;
		}, this._animation_time);
	},
	pageUp : function() {
		if (isAnimating)
			return;
		last.row = now.row;
		last.col = now.col;
		if (last.row != this._page_count) {
			now.row = last.row + 1;
			now.col = 1;
			this.doAnimate(TOWORDS.UP);
		}
	},
	pageLeft : function() {
		if (isAnimating)
			return;
		last.row = now.row;
		last.col = now.col;
		if (last.row != this._page_count) {
			now.row = last.row + 1;
			now.col = 1;
			this.doAnimate(TOWORDS.LEFT);
		}
	},
	pageDown : function() {
		if (isAnimating)
			return;
		last.row = now.row;
		last.col = now.col;
		if (last.row != 1) {
			now.row = last.row - 1;
			now.col = 1;
			this.doAnimate(TOWORDS.DOWN);
		}
	},
	pageRight : function() {
		if (isAnimating)
			return;
		last.row = now.row;
		last.col = now.col;
		if (last.row != this._page_count) {
			now.row = last.row + 1;
			now.col = 1;
			this.doAnimate(TOWORDS.RIGHT);
		}
	},
	pageFadeOut : function() {
		if (isAnimating)
			return;
		last.row = now.row;
		last.col = now.col;
		if (last.row != this._page_count) {
			now.row = last.row + 1;
			now.col = 1;
			this.doAnimate(TOWORDS.FADEOUT);
		}
	},
	pageFadeOutTwo : function() {
		if (isAnimating)
			return;
		last.row = now.row;
		last.col = now.col;
		if (last.row != this._page_count) {
			now.row = last.row + 2;
			now.col = 1;
			this.doAnimate(TOWORDS.FADEOUT);
		}
	},
	pageNormal : function() {
		if (isAnimating)
			return;
		last.row = now.row;
		last.col = now.col;
		if (last.row != this._page_count) {
			now.row = last.row + 1;
			now.col = 1;
			this.doAnimate(TOWORDS.NORMAL);
		}
	}
};

function zoomResize(){
    var ratio = parseFloat(innerWidth / 540);
    $(".zoom-page").css("transform", "scale(" + ratio + "," + ratio + ")");
    $(".zoom-page").css("-webkit-transform", "scale(" + ratio + "," + ratio + ")");
}
$(window).resize(function(){
	zoomResize();
});
function btnClick(){
	$(".icon").click(function(){
		var jobId = $(this).attr("iconId");
		if(parseInt(jobId)!=0){
			$("#hand").remove();
		}
		
		$(".icon").removeClass("icon0-hove");
		$(".icon").removeClass("icon1-hove");
		$(".icon").removeClass("icon2-hove");
		$(".icon").removeClass("icon3-hove");
		$(".icon").removeClass("icon4-hove");
		$(".icon").removeClass("icon5-hove");
		$(this).addClass("icon"+jobId+"-hove");
		
		$(".text-container").addClass("hold-hide");
		$(".text"+jobId).removeClass("hold-hide");
	});
	$("#showVideo").click(function(){
		if(!audio.paused){
			audio.pause();
			$(".music-on").addClass("music-off");
		}
		
		var videoHtml = "<div id='videoW' style='position: absolute;width: 100%;height: 50%;top:25%;left: 0%;'><iframe id='video' width='100%' height='100%' frameborder=0 src='http://v.qq.com/iframe/player.html?vid=b0153tgmehz&tiny=0&auto=0' allowfullscreen></iframe></div>";
		$("#videoContainer").html(videoHtml);
		$("#videoWrap").show();
	});
	$("#closeVideo").click(function(){
		$("#videoWrap").hide();
		$("#videoContainer").html("");
	});
	$(".music-on").click(function(){
		if(audio.paused){
			audio.play();
			$(".music-on").removeClass("music-off");
		}else{
			audio.pause();
			$(".music-on").addClass("music-off");
		}
	});
	
	
}


//under here is some page logic
$(document).ready(function() {
	
	zoomResize();
	btnClick();
	
	
	var mc = new Hammer(document.getElementById("pageWrap"));
	mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
	mc.on("panup", function(ev) {
		pageAnimations.pageUp();
	});
	mc.on("pandown", function(ev) {
	   pageAnimations.pageDown();
	});
	var mc2 = new Hammer(document.getElementById("lastPage"));
	mc2.get('pan').set({ direction: Hammer.DIRECTION_ALL });
	mc.on("pandown", function(ev) {
	   pageAnimations.pageDown();
	});
});











