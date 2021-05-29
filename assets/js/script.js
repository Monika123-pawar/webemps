
/**
 * Application javascript theme spacific functions
 * Theme WebEmps
 * Author Rahul N <rahul@webemeps.com>
 * Since v1.0.0
 */
$(document).ready(function() {

	if(isDay()) {
		// Do nothing for now
		// $('body').addClass('day');
	}
	
	// Let's set margin of main part of front end
	setTopMargin($('main'), $('header').height());

	// Check if Name and email id has been provided by user
	var name = localStorage.getItem("name") ?? '';
	var ocu  = localStorage.getItem("ocu")  ?? '';

	// Set default speak text
	var   speaktext = entry_1_speak_text;

	// Define common images selectors
	const img1      = document.querySelector('#logo');
	const speakIcon = document.querySelector('#speak');
	const backIcon  = document.querySelector('#back');

	if(name != '') {
		$('.entry').removeClass('default-entry');
		$('.enterted_name').text(name);
		if(ocu != '') {
			// $('#entry-3 .enterted_name').append(' (' + ocu +')');
			$('#entry-3 .enterted_name');
			$('#entry-3').addClass('default-entry');
			$('#ocu').focus();
			const element = document.querySelector('#entry-3');
			element.classList.add('animate__backInRight');
			element.addEventListener('animationend', () => {
				$('#entry-3').removeClass('animate__backInRight');
				manipulateLoader();
			});
			speaktext = entry_3_speak_text;
		} else {
			$('#entry-2').addClass('default-entry');
			$('#name').focus();
			const element = document.querySelector('#entry-2');
			element.classList.add('animate__backInUp');
			element.addEventListener('animationend', () => {
				$('#entry-2').removeClass('animate__backInUp');
				manipulateLoader();
			});
			speaktext = entry_2_speak_text;
		}
	} else { setTimeout(function(){ manipulateLoader(); }, 900); }

	$('#go-1-btn').click(function(){
		name = $('#name').val();
		if(name == '') {
			$(this).css('color', 'red');
			const element = document.querySelector('#go-1-btn');
			element.classList.add('animate__shakeX');
			element.addEventListener('animationend', () => {
				$('#go-1-btn').removeClass('animate__shakeX').css('color', '#fff');
			});
			$('#name').focus();
		} else {
			manipulateLoader();
			localStorage.setItem("name", name);
			speaktext     = entry_2_speak_text;
			const element = document.querySelector('#entry-1');
			element.classList.remove('animate__fadeInLeft');
			element.classList.add('animate__backOutUp');
			element.addEventListener('animationend', () => {
				$('#entry-1').removeClass('default-entry').removeClass('animate__backOutUp');
				$('.enterted_name').text(name);
				$('#entry-2').addClass('default-entry');
				$('#ocu').focus();
				const element = document.querySelector('#entry-2');
				element.classList.add('animate__backInUp');
				element.addEventListener('animationend', () => {
					$('#entry-2').removeClass('animate__backInUp');
					manipulateLoader();
				});
				
				img1.classList.add('animate__swing');

				img1.addEventListener('animationend', () => {
					img1.classList.remove('animate__swing');
				});
			});
		}
	});

	$('#go-2-btn, #go-2-cnl').click(function() {
		manipulateLoader();
		ocu = $('#ocu').val();
		if($(this).text() == 'Go >>') {
			if(ocu != '' && ValidateEmail(ocu)) {
				localStorage.setItem("ocu", ocu);
				// $('#entry-3 .enterted_name').append(' (' + ocu + ')');
				$('#entry-3 .enterted_name');
				speaktext = entry_3_speak_text;
			} else {
				$(this).css('color', 'red');
				const element = document.querySelector('#go-2-btn');
				element.classList.add('animate__shakeX');
				$('#ocu').focus();
				element.addEventListener('animationend', () => {
					$('#go-2-btn').removeClass('animate__shakeX').css('color', '#fff');
				});
				return false;
			}
		}

		const element = document.querySelector('#entry-2');
		element.classList.add('animate__backOutLeft');
		element.addEventListener('animationend', () => {
			$('#entry-2').removeClass('default-entry').removeClass('animate__backOutLeft');
			$('#entry-3').addClass('default-entry');
			const element = document.querySelector('#entry-3');
			element.classList.add('animate__backInRight');
			element.addEventListener('animationend', () => {
				$('#entry-3').removeClass('animate__backInRight');
			});
			img1.classList.add('animate__swing');

			img1.addEventListener('animationend', () => {
				img1.classList.remove('animate__swing');
			});
		});
	});

	$('#name').on("keypress", function(e) {
		if (e.keyCode == 13) {
			$('#go-1-btn').click();
			return false; // prevent the button click from happening
		}
	});
	$('#ocu').on("keypress", function(e) {
		if (e.keyCode == 13) {
			$('#go-2-btn').click();
			return false; // prevent the button click from happening
		}
	});

	img1.addEventListener('load', function() {
		// woo yey image loaded
		img1.classList.add('animate__swing');
		speakIcon.classList.add('animate__tada');
	});
	img1.classList.add('animate__swing');
	img1.addEventListener('error', function() {
		// argh everything's broken
		console.log('fail');
	});
	
	speakIcon.addEventListener('animationend', () => {
		speakIcon.classList.remove('animate__tada');
	});

	img1.addEventListener('animationend', () => {
		img1.classList.remove('animate__swing');
		speakIcon.classList.add('animate__tada');
	});

	$('#logo').click(function(e){
		e.preventDefault();
		manipulateLoader();
		const element = document.querySelector('#logo');
		element.classList.add('animate__hinge');
		element.addEventListener('animationend', () => {
			$('#logo').removeClass('animate__hinge');
			manipulateLoader();
		});
	});

	$('#speak').click(function(e){
		e.preventDefault();
		$(this).addClass('animate__tada');
		speak(speaktext, name, ocu);
	});

	$('.link').click(function(e) {
		manipulateLoader();
		e.preventDefault();
		const eleid   = $(this).attr('id').trim();
		$('#' + eleid).addClass('watched');
		$('#' + eleid + '-data').removeClass('no-show');
		var number = eleid.split('link')[1];

		// Get dynamic speak variable and set text to speak
		speaktext = eval('entry_4_speak_text' + number);
		$('#entry-3').fadeOut( "slow", function() {
			// Animation complete.
			$(this).removeClass('default-entry');
			$('#entry-4').fadeIn("slow", function() {
				$(this).addClass('default-entry');
				manipulateLoader();
			});
		  });
		
		  backIcon.classList.remove('no-show');
	});

	$('#back_container').click(function(e){
		e.preventDefault();
		manipulateLoader();
		$('.link-data').addClass('no-show');
		speaktext = entry_3_speak_text;
		$('#entry-4').fadeOut(function() {
			$(this).removeClass('default-entry');
			$('#entry-3').fadeIn(function() {
				$(this).addClass('default-entry');
				manipulateLoader();
			});
		});
		backIcon.classList.add('no-show');
	});

	
	$(document).ready(function() {
		$("#cf7_controls").on('click', 'span', function() {
		  $("#cf7 img").removeClass("opaque");
	  
		  var newImage = $(this).index();
	  
		  $("#cf7 img").eq(newImage).addClass("opaque");
	  
		  $("#cf7_controls span").removeClass("selected");
		  $(this).addClass("selected");
		});
	  });
	
//Tooltip
	  tippy('.infoIcon', {
        content: "We ask client's email so that in future we can send email with your name.",
    
        theme:'tooltip',

      });
// Document ready end
});

// Wrap every letter in a span
// var textWrapper = document.querySelector('.link');
// textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

// anime.timeline({loop: true})
//   .add({
//     targets: '.link .letter',
//     translateY: [-100,0],
//     easing: "easeOutExpo",
//     duration: 1400,
//     delay: (el, i) => 30 * i
//   }).add({
//     targets: '.link',
//     opacity: 0,
//     duration: 1000,
//     easing: "easeOutExpo",
//     delay: 1000
//   });

document.documentElement.style.setProperty('--animate-duration', '2s');

// All animations will take half the time to accomplish
document.documentElement.style.setProperty('--animate-duration', '.5s');


