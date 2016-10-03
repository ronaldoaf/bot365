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





unsafeWindow.bot={};

bot.defs={
    stake: 1.00
};




bot.seq=function(funcs){
	var tempo=0;
    $(funcs).each(function(i,e){
		tempo+=e.t;
	    setTimeout(e.f, tempo );
	});
	return tempo;
	
};


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
			jogo.posSelsJogo=[jogo.positionInMarket, jogo.positionInMarket+jogo.numJogos];
			jogo.selHome=$(jogo.market).find('.ip-Participant').eq(jogo.posSelsJogo[0]);
			jogo.selAway=$(jogo.market).find('.ip-Participant').eq(jogo.posSelsJogo[1]);				
		}
	});
	jogo.tempo=Number($(jogo.market).find('.ipe-ParticipantCouponFixtureName_Timer').text().split(':')[0]);
	
	jogo.betHome=function(){ jogo.selHome.click();   };
	jogo.betAway=function(){ jogo.selAway.click();   };
	
	return jogo;
};



bot.jaFoiApostado=function(home,away){
	 var saida=false;
     $(bot.myBets).each(function(i,e){
         if(home+' v '+away==e.jogo) saida=true;
	 });
	
	return saida;
};



bot.setStake=function(valor){
	var digita=function(digito){
	    console.log(digito);
		$('.qb-KeypadButton:contains('+digito+')').click();		
	};

	
	
	var lista_seq=[{f: (function(){ $('.qb-DetailsContainer').click(); }), t:1000 }];
	//Para cada do valor
    $( String(valor).split('') ).each(function(i,digito){
	    lista_seq.push({ f:(function(){ digita(digito); }), t:500 }  );
	});
	
	//Digita na sequencia, com intervalo de tempo. Retorna o tempo total
	return bot.seq(lista_seq);
};




bot.apostar=function(selObj){
	 //Se já houve alguma aposta em andamento. NÃO APOSTA
     if ($('.qb-QuickBetModule').hasClass('qb-QuickBetModule_BetSelected') ) return -1;
	
	
	
	 //Se estiver suspenso não NÃO APOSTA
	 if ( selObj.hasClass('ip-Participant_Suspended') ) return -1;
	
	
	
	 selObj.click();
      
	 //Se não tem valor setado OU o stake setado é diferente do definido
	 if(  ($('.qb-QuickBetModule').hasClass('qb-QuickBetModule_NoValue') ) ||    (bot.stake!=Number($('.qb-StakeBox ').text()) ) ) {
         console.log('SETA STAKE');
		 
		 var tempo_para_placeBet=2000;
		 setTimeout(function(){
              tempo_para_placeBet+=bot.setStake(bot.defs.stake);
		 },1000);
		 
		 setTimeout(function(){
              $('.qb-PlaceBetButton').click();
		 },tempo_para_placeBet);
		 
		 
		 
	 }

	 

	 
	
	
	
};





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
   //if ($('.ipe-EventViewTitle_Text').text()=='Asians In-Play') bot.onCouponAsianFull();
   //if ($('.ipe-EventViewTitle_Text').text()=='1st Half Asians In-Play') bot.onCouponAsianHalf();
   
   var ahSel=function(selObj){
       var arr_ah=selObj.find('.ip-Participant_OppName').text().split(',');
 
	   var s=0;
	   $(arr_ah).each(function(i,e){ s+=Number(e); });
	   return s/$(arr_ah).size();
   };	
	
	
   var onLoadStats=function(response){
       //console.log(response);
	   var jogos=eval(response.responseText);
	   console.log(jogos);
	   
	   
	   //Para jogo no cupom
	   $('.ipe-ParticipantCouponFixtureName_Participant').each(function(i,e){

		   var home=$(e).find('.ipe-ParticipantCouponFixtureName_TeamName:eq(0)').text();
		   var away=$(e).find('.ipe-ParticipantCouponFixtureName_TeamName:eq(1)').text();
		   
		   
		   var apostando_agora=false;
		   
		   //Cada jogo do Ajax
		   $(jogos).each(function(ii,jogo){
			   
			     if (apostando_agora) return;
			   
                 //console.log([jogo.home, jogo.away, away] );
		         if(  (jogo.home==home) && (jogo.away==away) ){
				       //console.log(['bateu', home, away]);
					   jogo_selecionado=bot.jogoLive(home,away);
					   
					    if ($('.ipe-EventViewTitle_Text').text()=='Asians In-Play') {
						       if (jogo_selecionado.tempo<70) return; 
						}
					    if ($('.ipe-EventViewTitle_Text').text()=='1st Half Asians In-Play'){
						        if (jogo_selecionado.tempo<28) return; 
						}
					   
					 
					    //Aposta no Home
					    if (
							( jogo.ind>2.00 ) &&  
							( jogo.ind2>0.00) && 
							( ahSel(jogo_selecionado.selHome)>=0.0)  
						){
						     if ( !bot.jaFoiApostado(home,away) ){
								 bot.apostar(jogo_selecionado.selHome);
								 console.log(jogo);
								 console.log('APOSTANDO NO HOME');
								 
								 apostando_agora=true;
						     }
						};
			   
			            
                        //Aposta no Away
					    if (
							( jogo.ind<-2.00 ) &&  
							( jogo.ind2<0.00) && 
							( ahSel(jogo_selecionado.selAway)>=0.0)  
						){
						     if (!bot.jaFoiApostado(home,away)){
								 bot.apostar(jogo_selecionado.selAway);
								 console.log(jogo);
								 console.log('APOSTANDO NO AWAY');
								 
								 apostando_agora=true;
						     }
						};		   
			             
			   

				 }
		   });
		   

	   });
	   
	   
   };
   
   var time_=Math.floor( (+new Date) /1000);

	if ( !(time_ % 30) ) {
	   //console.log('ok');
	   GM_xmlhttpRequest({
		   method: "GET",
		   url: "http://aposte.me/live/stats.php?t="+time_,
		   headers: { 
			   'Accept': "*/*; charset=utf-8",
		   },
		   onload: onLoadStats, 
	   });  
   
   }
   
	
	//Se foi apostado com sucesso fecha o modula QB, clicando no OK
	if ($('.qb-QuickBetModule').hasClass('qb-QuickBetModule_Placed') ) {
         setTimeout(function(){
		     $('.qb-MessageContainer_Indicator').click(); 
		 },2000);
		 
	};

	
	if ($('.qb-QuickBetModule').hasClass('qb-QuickBetModule_PlaceBetFailed') ) {
         setTimeout(function(){
		     $('.qb-MessageContainer_Indicator').click(); 
		 },2000);
		 
	};

	
	if ($('.qb-QuickBetModule').hasClass('qb-QuickBetModule_ChangeSuspended') ) {
         setTimeout(function(){
		     $('.qb-MessageContainer_Indicator').click(); 
		 },2000);
		 
	};
	
	
	
	
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

   
},1000);




