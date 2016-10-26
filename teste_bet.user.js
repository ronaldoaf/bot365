// ==UserScript==
// @name         teste_bet
// @namespace    http://aposte.me/
// @version      0.1.9
// @description  try to take over the world!
// @author       Ronaldo
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @match        https://mobile.365sport365.com/*
// @match        https://mobile.bet365.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue

function notificar(){
	var base64string="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qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45OS41qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+5LEOQPAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTkuNaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uSxDkDwAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxBTUUzLjk5LjWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7ksQ5A8AAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxBTUUzLjk5LjWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+5DEOYPAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45OS41qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+5LEOQPAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTkuNaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uSxDkDwAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxBTUUzLjk5LjWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7ksQ5A8AAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy45OS41qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+5LEOQPAAAGkAAAAIAAANIAAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuOTkuNaqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//uSxDkDwAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxBTUUzLjk5LjWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7ksQ5A8AAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo=";var snd = new Audio("data:audio/mp3;base64," + base64string);snd.play();
};

//comentário

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

/*
function fnPreventWinLock() {
    var wsc = new ActiveXObject('WScript.Shell');
    wsc.SendKeys ("{SCROLLLOCK}");
    wsc = null ;
};
*/


unsafeWindow.bot={};

bot.defs={
    stake: 5.50
};

bot.tempo_betslip_ativo=0;

bot.tempo_pagina_ativa=0;

localStorage['apostando']=localStorage['apostando'] || false;


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
	//lista_seq.push({ f:(function(){ digita('Done'); }), t:500 }  );
	
	//Digita na sequencia, com intervalo de tempo. Retorna o tempo total
	return bot.seq(lista_seq);
};




bot.apostar=function(selObj){

	
	console.log('tentou apostar');
	console.log(localStorage['apostando']);
	if(bot.apostando) return -1;
	
	//Se já houve alguma aposta em andamento. NÃO APOSTA
     if ($('.qb-QuickBetModule').hasClass('qb-QuickBetModule_BetSelected') ) return -1;
	
	
	
	 //Se estiver suspenso não NÃO APOSTA
	 if ( selObj.hasClass('ip-Participant_Suspended') ) return -1;
	
	
	 
	 selObj.click();
     bot.apostando=true;
	notificar();
	
	 var tempo_para_placeBet=2000;
	 //Se não tem valor setado OU o stake setado é diferente do definido
	 if(  ($('.qb-QuickBetModule').hasClass('qb-QuickBetModule_NoValue') ) ||    (bot.defs.stake!=Number($('.qb-StakeBox ').text()) ) ) {
         console.log('SETA STAKE');
		 
		 
		 //setTimeout(function(){
              tempo_para_placeBet+=bot.setStake(bot.defs.stake);
		 //},1000);	 
		 
	 };
	setTimeout(function(){
		$('.qb-PlaceBetButton').click();

	},tempo_para_placeBet);
	

	 

	 
	
	
	
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
    bot.myBets=myBets;
        
   
    
    
    
    
    
    
};

bot.onCouponAsianFull=function(){
     //console.log('Tela Cupon  Asian Full');  
};

bot.onCouponAsianHalf=function(){
    //console.log('Tela Cupon  Asian Half');  
};





bot.onCoupon=function(){
    
    bot.tempo_pagina_ativa+=1;
    //console.log('ok');
   //if ($('.ipe-EventViewTitle_Text').text()=='Asians In-Play') bot.onCouponAsianFull();
   //if ($('.ipe-EventViewTitle_Text').text()=='1st Half Asians In-Play') bot.onCouponAsianHalf();
   
	
   //Conta o tempo que o betslipe está ativo
   if( $('.qb-QuickBetModule').hasClass('qb-QuickBetModule_BetSelected') ) {
   	bot.tempo_betslip_ativo+=1;
   }else{
        bot.tempo_betslip_ativo=0;
   };
	
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
					   
					    if (   ( $('.ipe-EventViewTitle_Text').text()=='Asians In-Play') || ($('.ipe-EventViewTitle_Text').text()=="Soccer Asians In-Play") ) {
						      if (jogo_selecionado.tempo<70) return; 
						}
					    if ($('.ipe-EventViewTitle_Text').text()=='1st Half Asians In-Play'){
						       if (jogo_selecionado.tempo<28) return; 
						}
					   
					 
					    //Aposta no Home
					    if (
							( jogo.ind>=2.00 ) &&  
							( jogo.ind2>=1.00) && 
							( ahSel(jogo_selecionado.selHome)>=-0.25)  &&
						        ( jogo.gH==0.0)
						    
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
							( jogo.ind<=-2.00 ) &&  
							( jogo.ind2<=-1.00) &&
							( ahSel(jogo_selecionado.selAway)>=-0.25)  &&
						        ( jogo.gA==0.0)
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
   

	//Reinicia a cada 15 minutos
	if  (bot.tempo_pagina_ativa>=15*60) window.location.reload();;
	
	
	if ( !(time_ % 30) ) {
	   //fnPreventWinLock();
	   //console.log('ok');
	   GM_xmlhttpRequest({
		   method: "GET",
		   url: "http://aposte.me/live/stats.php?t="+time_,
		   headers: { 
			   'Accept': "*/*; charset=utf-8",
		   },
		   onload: onLoadStats, 
	   });  
   
   };
   
	//console.log('xxxx');
	if( $('.qb-QuickBetModule').hasClass('qb-QuickBetModule_BetSelected') ) {
		bot.apostando=true;
	}
	else{
	    bot.apostando=false;
	};
	
	//Se foi apostado com sucesso fecha o modula QB, clicando no OK
	if ($('.qb-QuickBetModule').hasClass('qb-QuickBetModule_Placed') ) {
         setTimeout(function(){
		     $('.qb-MessageContainer_Indicator').click(); 
		 },2000);
		 
	};

	
	if ($('.qb-QuickBetModule').hasClass('qb-QuickBetModule_PlaceBetFailed') || (bot.tempo_betslip_ativo>=40)  ) {
         setTimeout(function(){
		     $('.qb-MessageContainer_Indicator').click(); 
			 setTimeout(function(){
			     window.location.reload();
			 },2000);
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
