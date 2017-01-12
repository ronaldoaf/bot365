// ==UserScript==
// @name         teste_bet
// @namespace    http://aposte.me/
// @version      0.1.46.7
// @description  try to take over the world!
// @author       Ronaldo
// @require       https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.16.4/lodash.min.js
// @match        https://mobile.365sport365.com/*
// @match        https://mobile.bet365.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue


// ==/UserScript==
/* jshint -W097 */
'use strict';

function login(){
	if($('.mmhdr-UserInfo_UserName').text()==''){
		$('.hm-HeaderLinkLogin_Launcher').click();
		$('#PopUp_UserName').val('ronaldoaf');
		$('#PopUp_Password').val('rr842135');
		$('#PopUp_KML').val('on');
		$('#LogInPopUpBttn').click();
	}
};






unsafeWindow.jQuery.fn.extend({
  textOnly: function() {
    return this.clone()    //clone the element
               .children() //select all the children
               .remove()   //remove all the children
               .end()  //again go back to selected element
               .text();    //get the text of element
  },
  rclick: function() {

	  
		var normalRandomInt=function(min,max){

			var gaussian=function(mean, stdev) {
				var y2;
				var use_last = false;
				return function() {
					var y1;
					if(use_last) {
					   y1 = y2;
					   use_last = false;
					}
					else {
						var x1, x2, w;
						do {
							 x1 = 2.0 * Math.random() - 1.0;
							 x2 = 2.0 * Math.random() - 1.0;
							 w  = x1 * x1 + x2 * x2;               
						} while( w >= 1.0);
						w = Math.sqrt((-2.0 * Math.log(w))/w);
						y1 = x1 * w;
						y2 = x2 * w;
						use_last = true;
				   }

				   var retval = mean + stdev * y1;
				   if(retval > 0) 
					   return retval;
				   return -retval;
			   }
			}
			
			var r=Math.round(gaussian((max+min)/2.0, (max-min)/6.0)());
			
			if (r>max) r=max;
			if (r<min) r=min;
			
			return r;

		}
		var pos={
			x1: $(this).offset().left,
			y1: $(this).offset().top,
			x2: $(this).offset().left + $(this).width(),
			y2: $(this).offset().top + $(this).height()
		};
		var click=function(x,y){
			var ev = document.createEvent("MouseEvent");
			var el = document.elementFromPoint(x,y);
			ev.initMouseEvent(
				"click",
				true /* bubble */, true /* cancelable */,
				unsafeWindow, null,
				x, y, 0, 0, /* coordinates */
				false, false, false, false, /* modifier keys */
				0 /*left*/, null
			);
			el.dispatchEvent(ev);
		}
		
		//console.log([normalRandomInt(pos.x1,pos.x2), normalRandomInt(pos.y1,pos.y2)  ]);
		click(normalRandomInt(pos.x1,pos.x2), normalRandomInt(pos.y1,pos.y2));
	    
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
    stake: 20.50
};

bot.tempo_betslip_ativo=0;

bot.tempo_pagina_ativa=0;

bot.stake=function(){
    var soma=0;
	$( bot.textMyBets.match(/VA=[0-9\.]+/g) ).each(function(i,e){
		soma+=Number(e.split('=')[1]);
	});

	soma+=bot.balance; 

	return (Math.floor(soma*0.05)+0.5);
};


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
    return bot.textMyBets.includes(home+' v '+away);
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




bot.apostar=function(selObj, tamanho_stake=0){

	
	console.log('tentou apostar');
	console.log(localStorage['apostando']);
	if(bot.apostando) return -1;
	
	//Se já houve alguma aposta em andamento. NÃO APOSTA
     if ($('.qb-QuickBetModule').hasClass('qb-QuickBetModule_BetSelected') ) return -1;
	
	
	
	 //Se estiver suspenso não NÃO APOSTA
	 if ( selObj.hasClass('ip-Participant_Suspended') ) return -1;
	
	
	 
	 selObj.click();
     bot.apostando=true;
	
	
	 var tempo_para_placeBet=2000;
	 //Se não tem valor setado OU o stake setado é diferente do definido
	 if(  ($('.qb-QuickBetModule').hasClass('qb-QuickBetModule_NoValue') ) ||    (bot.stake()!=Number($('.qb-StakeBox ').text()) ) ) {
         console.log('SETA STAKE');
		 
		 
		 //setTimeout(function(){
              tempo_para_placeBet+=bot.setStake(tamanho_stake==0 ? bot.stake() : tamanho_stake );
		 //},1000);	 
		 
	 };
	setTimeout(function(){
		$('.qb-PlaceBetButton').click();
		
		

	},tempo_para_placeBet);
	

	 

	 
	
	
	
};






bot.onCouponAsianFull=function(){
     //console.log('Tela Cupon  Asian Full');  
};

bot.onCouponAsianHalf=function(){
    //console.log('Tela Cupon  Asian Half');  
};




bot.anotar=function(nota){
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://aposte.me/live/notas.php",
		data:  nota,
		onload: function(res){
			console.log(res.responseText);
		}
	});
};

bot.onCoupon=function(){
    
    bot.tempo_pagina_ativa+=1;
    //console.log('ok');
   //if ($('.ipe-EventViewTitle_Text').text()=='Asians In-Play') bot.onCouponAsianFull();
   //if ($('.ipe-EventViewTitle_Text').text()=='1st Half Asians In-Play') bot.onCouponAsianHalf();
   
   $('.ipe-Market:not(:has(.ipe-MarketContainer ))').each(function(i,e){ $(e).click() })
	
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
						       if (jogo_selecionado.tempo<25) return; 
						}
					   
					 
					    //Aposta no Home
					    if (
							 ( ( jogo.ind>=3.50 ) &&  ( jogo.ind2>=2.5) && 	( ahSel(jogo_selecionado.selHome)==-0.5)  &&  ( jogo.gH<=1) )  ||
							 ( ( jogo.ind>=2.50 ) &&  ( jogo.ind2>=1.50) && 	( ahSel(jogo_selecionado.selHome)==-0.25)  &&  ( jogo.gH==0.0) )  ||
							 ( ( jogo.ind>=2.00 ) &&  ( jogo.ind2>=1.00) && 	( ahSel(jogo_selecionado.selHome)>=0)  &&  ( jogo.gH==0.0) ) 
						){
						     if (bot.jaFoiApostado(jogo.home,jogo.away)==false){
								 bot.anotar(JSON.stringify(jogo)+'<<<>>>'+JSON.stringify(jogos)+'<<<>>>'+JSON.stringify(jogo_selecionado)+'<<<>>>'+bot.textMyBets+'<<<>>>>'+ $('#MarketGrid').html() );
								 bot.apostar(jogo_selecionado.selHome, ahSel(jogo_selecionado.selHome)<0.0 ? 1.5 : 0 );
								 console.log(jogo);
								 console.log('APOSTANDO NO HOME');
								 
								 apostando_agora=true;
						     }
						};
			   
			            
                        //Aposta no Away
					    if (
							( ( jogo.ind<=-3.50 ) &&  ( jogo.ind2<=-2.50) && 	( ahSel(jogo_selecionado.selAway)==-0.5)  &&  ( jogo.gA<=1) )  ||
							 ( ( jogo.ind<=-2.50 ) &&  ( jogo.ind2<=-1.50) && 	( ahSel(jogo_selecionado.selAway)==-0.25)  &&  ( jogo.gA==0.0) )  ||
							 ( ( jogo.ind<=-2.00 ) &&  ( jogo.ind2<=-1.00) && 	( ahSel(jogo_selecionado.selAway)>=0)  &&  ( jogo.gA==0.0) ) 
						){
						     if (bot.jaFoiApostado(jogo.home,jogo.away)==false){
								 bot.anotar(JSON.stringify(jogo)+'<<<>>>'+JSON.stringify(jogos)+'<<<>>>'+JSON.stringify(jogo_selecionado)+'<<<>>>'+bot.textMyBets+'<<<>>>>'+ $('#MarketGrid').html() );
								 bot.apostar(jogo_selecionado.selAway, ahSel(jogo_selecionado.selAway)<0.0 ? 1.5 : 0 );
								 console.log(jogo);
								 console.log('APOSTANDO NO AWAY');
								 
								 apostando_agora=true;
						     }
						};		   
			             
			   

				 }
		   });
		   

	   });
	   
	   
   };
   
   var time_=Math.floor( (+new Date) /1000) +($('.ipe-EventViewTitle_Text').text()=='1st Half Asians In-Play'?15:0);
   

   //Reinicia a cada 15 minutos
   if  (bot.tempo_pagina_ativa>=15*60) window.location.reload();
	
	
   if ( !(time_ % 30) ){
	   //fnPreventWinLock();
	   //console.log('ok');
	   GM_xmlhttpRequest({
		   method: "GET",
		   url: "http://aposte.me/live/stats.php?t="+time_,
		   headers: { 
			   'Accept': "*/*; charset=utf-8",
		   },
		   onload: function(response){
            
             $.get('https://mobile.365sport365.com/mybets/mybetsdata.ashx?pt=0&tl=OPENBETS%3B__time&ci=28', function(data){ 
                bot.textMyBets=data;
                onLoadStats(response);
             });    
               
            $.get('https://mobile.365sport365.com/Controls/BetSlip/GetBalance.aspx',function(data){ 
                   bot.balance=Number(data.balance); 
               });
           }
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
             setTimeout(function(){
                window.location.reload();
             },1000);
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
unsafeWindow.setInterval(function(){
	
	
    bot.myBets = JSON.parse( GM_getValue("myBets", "[]") ); 
    
    if ( window.location.hash.split(';')[0]=="#type=Coupon") {
        bot.onCoupon();
    }
    

    
    login();
    //if( (Number($('#betslipBarEnhancedSelectionCount').text())>=2) && $('#betslipBarEnhanced').hasClass('showingBetSlipEnhancedBar'))  $('#betslipBarEnhanced').rclick();
	 if( $('#betslipBarEnhanced').hasClass('showingBetSlipEnhancedBar'))  $('#betslipBarEnhanced').click();

    if( $('.betReceipt').size()>0 ) {
		$('button:contains(Continue)').click();
		window.location.reload();
	}
    if( !$('.acceptChanges').hasClass('hidden') ) $('button:contains(Accept)').rclick(); 
   
},1000);




$('body').on('DOMNodeInserted', '#betSlipOverlay.opaque', function () {
	unsafeWindow.setTimeout( function(){ 
		
		//Se tiver 2 ou mais apostas Limpa
		if(Number($('#BetSlipCount span').text())>=2) $('.removeAll').rclick();
		
		//Se tiver 1 aposta então placeBet
		if(Number($('#BetSlipCount span').text())==1){
           $('.stk').val('1.50');
		   
		
		    setTimeout(function(){
               $('.placeBet').rclick();
		    },1000);
		
		}
		
		
	},5000);
});
