// Пользовательские функции

$(function() {

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Ваше сообщение отпрвлено!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

});

// Popup Forms
// $('.btn-popup').magnificPopup({
// 	type:'inline',
// 	mainClass: 'mfp-forms'
// });

// wow animate init
//new WOW().init();


// owl-carousel
// $(document).ready(function() {

// 	$("#owl-demo").owlCarousel({

// 					navigation : true, // Show next and prev buttons
// 					slideSpeed : 300,
// 					pagination : false,
// 					paginationSpeed : 400,
// 					singleItem:true

// 					// "singleItem:true" is a shortcut for:
// 					// items : 1, 
// 					// itemsDesktop : false,
// 					// itemsDesktopSmall : false,
// 					// itemsTablet: false,
// 					// itemsMobile : false

// 				});

// });

// scrollDown
// $(".scrol").click(function() {
// 	$("html, body").animate({ scrollTop: $(".header-wrap").height()+10 }, "slow");
// 	return false;
// });
// scrollTop
// $(function() {
// 	$.fn.scrollToTop = function() {
// 		$(this).hide().removeAttr("href");
// 		if ($(window).scrollTop() >= "250") $(this).fadeIn("slow")
// 			var scrollDiv = $(this);
// 		$(window).scroll(function() {
// 			if ($(window).scrollTop() <= "250") $(scrollDiv).fadeOut("slow")
// 				else $(scrollDiv).fadeIn("slow")
// 			});
// 		$(this).click(function() {
// 			$("html, body").animate({scrollTop: 0}, "slow")
// 		})
// 	}
// });
// $(function() {
// 	$("#top").scrollToTop();
// });

// mask form
// jQuery(function($){

// 	$("#phone").mask("+375 (99) 999-99-99");
// 	$("#phone-hidden").mask("+375 (99) 999-99-99");

// });

// одинаковая высота блоков
// jQuery(document).ready(function($){
// 	function detectBrowserSize() {
// 		var myWidth = 0;
// 		if (typeof (window.innerWidth) == 'number') {
// 						//Non-IE
// 						myWidth = window.innerWidth;
// 					} else if (document.documentElement && document.documentElement.clientWidth) {
// 						//IE 6+ in 'standards compliant mode'
// 						myWidth = document.documentElement.clientWidth;
// 					} else if (document.body && document.body.clientWidth) {
// 						//IE 4 compatible
// 						myWidth = document.body.clientWidth;
// 					}
// 					return myWidth;
// 				}
// 				if (detectBrowserSize() > 768 ){ //выключаем скрипт на разрешении 768
// 				var mainDivs = $(".max-height"); //Получаем все элементы с классом max-height
// 				var maxHeight = 0;
// 				for (var i = 0; i < mainDivs.length; ++i) {
// 				if (maxHeight < $(mainDivs[i]).height()) { //Находим максимальную высоту
// 					maxHeight = $(mainDivs[i]).height(); 
// 				}
// 			}
// 			for (var i = 0; i < mainDivs.length; ++i) {
// 				$(mainDivs[i]).height(maxHeight); //Устанавливаем всем элементам максимальную высоту
// 			};
// 		}
// 	});

// удаляем, дабавляем класс на разрешении 768
// $(document).ready(function() {
	
// 	$(window).resize(function(){
// 		var windowWidth = $(window).width();
// 		if(windowWidth > 768)$(".works-items p").addClass("max-height");
// 		else $(".works-items p").removeClass("max-height");
// 	});
// });


//chatra.io
// ChatraID = 'dN3Chbwxiyss8DSKz';
// (function(d, w, c) {
// 	var n = d.getElementsByTagName('script')[0],
// 	s = d.createElement('script');
// 	w[c] = w[c] || function() {
// 	  (w[c].q = w[c].q || []).push(arguments);
//   };
//   s.async = true;
//   s.src = (d.location.protocol === 'https:' ? 'https:': 'http:')
//   + '//chat.chatra.io/chatra.js';
//   n.parentNode.insertBefore(s, n);
// })(document, window, 'Chatra');