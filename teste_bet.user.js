// ==UserScript==
// @name         teste_bet
// @namespace    http://aposte.me/
// @version      0.1
// @description  try to take over the world!
// @author       Ronaldo
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @match        https://mobile.365sport365.com/*
// @match        https://mobile.bet365.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue

// ==/UserScript==
/* jshint -W097 */
'use strict';
jQuery.fn.extend({
  textOnly: function() {
    return this.clone()    //clone the element
               .children() //select all the children
               .remove()   //remove all the children
               .end()  //again go back to selected element
               .text();    //get the text of element
  }
});
 



unsafeWindow.bot={}



bot.jogoLive = function (home,away){
	jogo=-1;
	$('div.ipe-ParticipantCouponFixtureName_Participant ').each(function(i,e){ 
		if( 
			($(e).find('.ipe-ParticipantCouponFixtureName_TeamName:eq(0)').html()==home)  && 
			($(e).find('.ipe-ParticipantCouponFixtureName_TeamName:eq(1)').html()==away )
		){
			//saida=i;
			jogo={
					market: $(e).parents('.ipe-Market')
			};
				   
		}		
		
	});
	if (jogo==-1) return jogo;
	
	jogo.selecoes=$(jogo.market).find('.ip-Participant ');
	jogo.numJogos=$(jogo.market).find('.ipe-ParticipantCouponFixtureName_Participant').size();
	$(jogo.market).find('.ipe-ParticipantCouponFixtureName_Participant').each(function(i,e){ 
		if( 
			($(e).find('.ipe-ParticipantCouponFixtureName_TeamName:eq(0)').html()==home)  && 
			($(e).find('.ipe-ParticipantCouponFixtureName_TeamName:eq(1)').html()==away )
		){
			jogo.positionInMarket=i;
			jogo.posSelsJogo=[jogo.positionInMarket, jogo.positionInMarket+jogo.numJogos]
			jogo.selHome=$(jogo.market).find('.ip-Participant').eq(jogo.posSelsJogo[0]);
			jogo.selAway=$(jogo.market).find('.ip-Participant').eq(jogo.posSelsJogo[1]);				
		}
	});
	jogo.betHome=function(){ jogo.selHome.click();   };
	jogo.betAway=function(){ jogo.selAway.click();   };
	
	return jogo;
}










bot.onMyBets=function(){
    //console.log('Tela MyBets');       
        
    //Se "Live Now" não estiver selecionado Seleciona
    if( !$('div.myb-OpenBetHeader_Button:contains(Live Now)').hasClass('myb-OpenBetHeader_ButtonSelected') ) $('div.myb-OpenBetHeader_Button:contains(Live Now)').click();
    myBets=[];
    $('.myb-OpenBetItem').each(function(i,e){
        bet={
            jogo:$(e).find('.myb-OpenBetParticipant_FixtureDescription').textOnly(),
            mercado: $(e).find('.myb-OpenBetParticipant_MarketDescription').html(),
            cashout:Boolean( $(e).find('span.cash-out').size() ),
            score_atual: $(e).find('.myb-OpenBetScores_Score').text(),
            score_inicial: $(e).find('.myb-OpenBetParticipant_HeaderTitle').text().split(')')[0].split('(')[1],  
            stake: Number( $(e).find('.myb-OpenBetItem_StakeText').text() ),
            toReturn: Number( $(e).find('.myb-OpenBetItem_ReturnText').text() ),

        };
        myBets.push(bet);
        //console.log(bet);
    });
    GM_setValue('myBets', JSON.stringify(myBets) );
        
   
    
    
    
    
    
    
};

bot.onCouponAsianFull=function(){
     //console.log('Tela Cupon  Asian Full');  
};

bot.onCouponAsianHalf=function(){
    //console.log('Tela Cupon  Asian Half');  
};





bot.onCoupon=function(){
    //console.log('ok');
   if ($('.ipe-EventViewTitle_Text').text()=='Asians In-Play') bot.onCouponAsianFull();
   if ($('.ipe-EventViewTitle_Text').text()=='1st Half Asians In-Play') bot.onCouponAsianHalf();
    
    

};
















//Loop Principal
setInterval(function(){
    bot.myBets = JSON.parse( GM_getValue("myBets", "[]") ); 
    
    if ( window.location.hash.split(';')[0]=="#type=Coupon") {
        bot.onCoupon();
    }
    
    if ( window.location.hash.split(';')[0]=="#type=MyBets") {
        bot.onMyBets();
    }

   
},500);




