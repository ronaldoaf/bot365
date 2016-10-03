var fs = require('fs');


var url='https://mobile.bet365.com/#type=InPlay;key=;ip=1;lng=1';
var page = require('webpage').create();
//page.settings.userAgent ="Mozilla/5.0 (Linux; Android 4.2.2; en-us; SAMSUNG GT-I9195 Build/JDQ39) AppleWebKit/535.19 (KHTML, like Gecko) Version/1.0 Chrome/18.0.1025.308 Mobile Safari/535.19";
page.settings.webSecurityEnabled=false;
page.settings.userAgent ="Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36";
page.viewportSize = {width: 360, height: 640};
page.open(url, function() {
	page.injectJs("jquery.js");
	
	setInterval(function(){
		eval( fs.read('in.js') );
		fs.write('in.js', '', 'w');
	},1000);
  
});





