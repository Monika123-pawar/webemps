
/**
 * Application javascript library to manage common functions
 * Theme WebEmps
 * Author Rahul N <rahul@webemeps.com>
 * Since v1.0.0
 */

/**
 * speak
 * Speak the text
 * @since v1.0.0
 * @author Rahul N <rahul@webemps.com>
 * @param string speaktext 
 * @param string name 
 * @param string ocu 
 * @returns void
 */
function speak(speaktext, name, ocu) {
	if ('speechSynthesis' in window) {
		speaktext  = speaktext.replace(/{name}/g, name).replace(/{ocu}/g, ocu);
		var text   = speaktext ?? 'Hello'; //$('#message').val();
		var msg    = new SpeechSynthesisUtterance();
		var voices = window.speechSynthesis.getVoices();
		msg.voice  = voices[0];
		msg.rate   = 10 / 10;
		msg.pitch  = 1;
		msg.text   = text;
		msg.onend  = function(e) {$('.default-entry input').focus();};

		// Let's speak
		speechSynthesis.speak(msg);
	} else {
		console.error('Your browser does not support speak function');
	}
}

/**
 * ValidateEmail
 * Validate email pattern
 * @since v1.0.0
 * @author Rahul N <rahul@webemps.com>
 * @param string mail 
 * @returns bool
 */
function ValidateEmail(mail) 
{
	return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail));
}

/**
 * isDay 
 * Check if currunt time is day
 * @since v1.0.0
 * @author Rahul N <rahul@webemps.com>
 * @returns bool
 */
function isDay() {
	const hours = new Date().getHours();
	// console.log(hours);
	return !(hours > 6 && hours < 18);
}

/**
 * setTopMargin 
 * Set top margin of element dynamically
 * @param element dom element
 * @param margin int 
 * @since v1.0.0
 * @author Rahul N <rahul@webemps.com>
 * @returns void
 */
function setTopMargin(element, margin) {
	element.css('margin-top', margin + 'px');
}

/**
 * manipulateLoader() { 
 * Add or Remove page loader
 * @since v1.0.0
 * @author Rahul N <rahul@webemps.com>
 * @returns void
 */
function manipulateLoader() {
	var $body = $('body');
	if($body.hasClass('body-bg')) {
		$body.removeClass('body-bg');
	} else {
		$body.addClass('body-bg');
	}
}
