// ==UserScript==
// @name         Maxima Aposta
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://mobile.bet365.com/*
// @grant        none
// ==/UserScript==


	
setInterval(function(){
	if ($('.referDialogue').size()>0) $('.referDialogue #okButton').click(); 
	
	if( $('.receiptTitle:contains(Bet Placed)').size()>0 ) $('#betSlipOverlay').click();
	
},1000);

