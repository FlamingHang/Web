$(function(){
			var count=0;
			var img = $(".carousel img");
			var btn = $(".btn-status span");
			var bannerPop = $(".banner-pop");
			var navbarBtn = $(".navbar ul li a");
			var navbarHover = $(".navbar ul li a,.dropdown-content table")
			var navbarDropdown = $(".dropdown-content");
			var navbarDropdownMenu = $(".dropdown-content table");
			var timeAutoPlay = null;
			var timeBannerTopPop = null;
			var timeNavbarHover= null;

			/*顶部弹出广告*/
			timeBannerTopPop = setTimeout(showAd,1000);
			/*自动播放*/
			timeAutoPlay = setInterval(autoPlay,4000);

			/*鼠标移入，控制轮播*/
			$(".carousel img,.btn-status span").hover(function(){
				clearInterval(timeAutoPlay);
			},function(){
				timeAutoPlay = setInterval(autoPlay,4000);
			});

			/*鼠标控制下拉菜单*/
			// navbarHover.hover(function(){
			// 	clearTimeout(timeNavbarHover);
			// 	var num = (navbarBtn.index(this));
			// 	navbarDropdownMenu.eq(num).css({"display":"block"}).siblings("table").css({"display":"none"});
			// 	navbarDropdown.stop().slideDown();
			// },function(){
			// 	timeNavbarHover = setTimeout(function(){
			// 		navbarDropdown.stop().slideUp();
			// 		navbarDropdownMenu.eq(num).css({"display":"none"});
			// 	},200)
			// });
	
			/*开启滚轮滚动触发事件*/
			$(window).scroll(function(){
				var scrollHeight = document.body.scrollTop || document.documentElement.scrollTop;
				if(scrollHeight/2){
					$(".btn-back-top").fadeIn();
				}
				else{
					$(".btn-back-top").fadeOut();
				}
			});

			/*自动轮播和按钮切换*/
			function autoPlay(){ 
				var oldCount = count;
				count++;
				if(count>img.length-1){count=0;}
				img.eq(oldCount).fadeOut("slow");
				img.eq(count).fadeIn("slow");
				//下面渐变代码切换效果更好，但有初次显示延时，暂时无法解决
				// carousel.eq(colCount).stop().animate({"opacity":0},600);
				// carousel.eq(count).stop().animate({"opacity":1},600);
				changeIndicatorStyle(count);
			}

			/*跳转到播放页面*/
			btn.click(function(){
				goPlay(btn.index(this));
			});

			/*改变底部圆圈指示器*/
			function changeIndicatorStyle(whichBtn){
				btn.eq(whichBtn).addClass("active").siblings("span").removeClass("active");
			}

			/*跳转指定页面*/
			function goPlay(transCount){
				var oldCount = count;
				count = transCount;
				img.eq(oldCount).fadeOut(600);
				img.eq(count).fadeIn(600);
				changeIndicatorStyle(count);
			}

			/*顶部弹出广告*/
			function showAd(){
				bannerPop.fadeIn("slow");
				clearTimeout(timeBannerTopPop);
				timeBannerTopPop = setTimeout(hideAd,5000)
			}

			/*顶部隐藏广告*/
			function hideAd(){
				bannerPop.fadeOut("slow");
				clearTimeout(timeBannerTopPop);
			}
	
			/*放回顶层按钮*/
			$(".btn-back-top").click(function(){
				$("body,html").animate({scrollTop:0},200);
				return false;
			});
		});
