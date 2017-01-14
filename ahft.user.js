// ==UserScript==
// @name         bot_AH_FT
// @namespace    http://aposte.me/
// @version      0.2.3.1
// @description  Utiliza ao vivo no Asian Handicap
// @author       Ronaldo
// @require      https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.16.4/lodash.min.js
// @match        https://mobile.bet365.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue

// ==/UserScript==

/* jshint -W097 */
'use strict';

const PRIMEIRO_TEMPO = "151017012C1_1_3";
const SEGUNDO_TEMPO  = "151014714C1_1_3";


function primeiroTempo(){
   return location.hash.includes(PRIMEIRO_TEMPO);
}
function segundoTempo(){
   return location.hash.includes(SEGUNDO_TEMPO);
}


console.log([primeiroTempo(),segundoTempo()]);


var time_;



unsafeWindow.bot={};

bot.apostando_agora=false;
bot.betslipBarEnhanced_selecionado=false;
bot.stake=function(){
    var soma=0;
	$( bot.textMyBets.match(/VA=[0-9\.]+/g) ).each(function(i,e){
		soma+=Number(e.split('=')[1]);
	});

	soma+=bot.balance; 

	return (Math.floor(soma*0.05)+0.5);
};

bot.jogoLive = function (home,away){
	var ahSel=function(selObj){
	   var arr_ah=selObj.find('.ip-Participant_OppName').text().split(',');

	   var s=0;
	   $(arr_ah).each(function(i,e){ s+=Number(e); });
	   return s/$(arr_ah).size();
	};	
   
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
	jogo.tempo=Number($(jogo.market).find('.ipe-ParticipantCouponFixtureName_Timer').eq(jogo.positionInMarket).text().split(':')[0]);
	jogo.AH_Home=ahSel(jogo.selHome);
	jogo.AH_Home=ahSel(jogo.selAway);
	
	return jogo;
};

bot.jaFoiApostado=function(home,away){
    return bot.textMyBets.includes(home+' v '+away);
};




bot.apostar=function(selObj){
	 bot.apostando_agora=true;
	 selObj.click();

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



//---Toda vez que as estatisticas do arquivo JSON forem carregadas
bot.onLoadStats=function(response){
   
   
   //console.log(response);
   var jogos=eval(response.responseText);
   console.log(jogos);
   
   //Se o flag bot.apostando_agora estiver true, não tenta aposta
   if(bot.apostando_agora) return;
	
   //Para jogo no cupom
   $('.ipe-ParticipantCouponFixtureName_Participant').each(function(i,e){

	   var home=$(e).find('.ipe-ParticipantCouponFixtureName_TeamName:eq(0)').text();
	   var away=$(e).find('.ipe-ParticipantCouponFixtureName_TeamName:eq(1)').text();
	   
	   
	   //Cada jogo do Ajax
	   $(jogos).each(function(ii,jogo){			   
			 //if (apostando_agora) return;
		   
			 if(  (jogo.home==home) && (jogo.away==away) ){
				   
				   //Se já houve aposta nesse jogo sai.
				   if( bot.jaFoiApostado(home,away) )return;
				   
				   //Se o elemento DOM da linha do jogo 
				   jogo_selecionado=bot.jogoLive(home,away);
				   bot.anotar(JSON.stringify([jogo.home, jogo.away, jogo.ind, jogo.ind2>=2.5, jogo_selecionado.AH_Home,jogo.gH,primeiroTempo() ,jogo_selecionado.tempo]));

								 
					//Aposta no Home
					if (
						 ( ( jogo.ind>=3.50 ) &&  ( jogo.ind2>=2.5) && 	   ( jogo_selecionado.AH_Home==-0.5)  &&  ( jogo.gH<=1)  &&  ( (primeiroTempo() && (jogo_selecionado.tempo>=25)) ||  (segundoTempo() && (jogo_selecionado.tempo>=70))    ) ) ||
						 ( ( jogo.ind>=2.50 ) &&  ( jogo.ind2>=1.50) && 	( jogo_selecionado.AH_Home==-0.25)  &&  ( jogo.gH==0.0) &&  ( (primeiroTempo() && (jogo_selecionado.tempo>=25)) ||  (segundoTempo() && (jogo_selecionado.tempo>=70))    ) ) ||
						 ( ( jogo.ind>=2.00 ) &&  ( jogo.ind2>=1.00) && 	( jogo_selecionado.AH_Home>=0)  &&  ( jogo.gH==0.0) &&  ( (primeiroTempo() && (jogo_selecionado.tempo>=25)) ||  (segundoTempo() && (jogo_selecionado.tempo>=70))    ) )
                    ){
						bot.apostar(jogo_selecionado.selHome);	
						bot.anotar(JSON.stringify(jogo)+'<<<>>>'+JSON.stringify(jogos)+'<<<>>>'+bot.textMyBets+'<<<>>>>'+ $('#MarketGrid').html() );
					}
		   
					
					//Aposta no Away
					if (
						 ( ( jogo.ind<=-3.50 ) &&  ( jogo.ind2<=-2.5) && 	( jogo_selecionado.AH_Away==-0.5)  &&  ( jogo.gA<=1)  &&  ( (primeiroTempo() && (jogo_selecionado.tempo>=25)) ||  (segundoTempo() && (jogo_selecionado.tempo>=70))    ) ) ||
						 ( ( jogo.ind<=-2.50 ) &&  ( jogo.ind2<=-1.50) && 	( jogo_selecionado.AH_Away==-0.25)  &&  ( jogo.gA==0.0)  &&  ( (primeiroTempo() && (jogo_selecionado.tempo>=25)) ||  (segundoTempo() && (jogo_selecionado.tempo>=70))    ) ) ||
						 ( ( jogo.ind<=-2.00 ) &&  ( jogo.ind2<=-1.00) && 	( jogo_selecionado.AH_Away>=0)  &&  ( jogo.gA==0.0) &&  ( (primeiroTempo() && (jogo_selecionado.tempo>=25)) ||  (segundoTempo() && (jogo_selecionado.tempo>=70))    ) )
					){
						bot.apostar(jogo_selecionado.selAway);	
						bot.anotar(JSON.stringify(jogo)+'<<<>>>'+JSON.stringify(jogos)+'<<<>>>'+bot.textMyBets+'<<<>>>>'+ $('#MarketGrid').html() );
						 
					}   
					
		   

			 }
	   });
   });
};  





//---A cada 30 segundos
bot.on30segs=function(){		
       console.log('on30segs');
	
	   //Faz um ajax para o arquivo JSON "http://aposte.me/live/stats.php"
	   GM_xmlhttpRequest({
		   method: "GET",
		   url: "http://aposte.me/live/stats.php?t="+time_,
		   headers: { 
			   'Accept': "*/*; charset=utf-8",
		   },
		   onload: function(response){
             //Pega a lista de apostas ativas
             $.get('https://mobile.bet365.com/mybets/mybetsdata.ashx?pt=0&tl=OPENBETS%3B__time&ci=28', function(data){ 
                bot.textMyBets=data;
                bot.onLoadStats(response);
             });    
             
			//Pega o valor da banca disponível
            $.get('https://mobile.bet365.com/Controls/BetSlip/GetBalance.aspx',function(data){ 
                   bot.balance=Number(data.balance); 
               });
           }
	   });    
}



//Modo interativo
bot.interativo=function(){
   GM_xmlhttpRequest({
	   method: "GET",
	   url: "http://aposte.me/live/in.php?t="+time_,
	   headers: { 
		   'Accept': "*/*; charset=utf-8",
	   },
	   onload: function(response){
			eval(response);
	   }
   }); 	
};



//Loop Principal repete todos os comandos a cada 1 segund
unsafeWindow.setInterval(function(){
	if (location.hash)
	
	time_=Math.floor( (+new Date) /1000);
    
	//A cada 30 segundos
	if ( !(time_ % 30) ) bot.on30segs();
	
	
	//bot.interativo();
    
	
	//Aparecer a caixa informando que as odds mudaram clica no Botão "Accept"
	if( !$('.acceptChanges').hasClass('hidden') ) $('button:contains(Accept)').click(); 
	
    //Se a betSlipBar aparecer clica nela depois de 5 segundos
	if( $('#betslipBarEnhanced').hasClass('showingBetSlipEnhancedBar')) {
		if (bot.betslipBarEnhanced_selecionado==false) { 
			bot.betslipBarEnhanced_selecionado=true;
            setTimeout(function(){
				$('#betslipBarEnhanced').click();   
			},5000);
			
		}
	}
	//Se não aparece a betSlipBar nem o formulário para apostar, indica que não está sendo apostado no momento
	else if( $('#betSlipOverlay').hasClass('opaque')==false){
	   bot.apostando_agora=false;
	}
    
	//Se o formulario de aposta aparecer 
	if ( $('#betSlipOverlay').hasClass('opaque') ){
	   //deseleciona ao flag bot.betslipBarEnhanced_selecionado
       bot.betslipBarEnhanced_selecionado=false;
	   
	   //Coloca o valor dos stakes para cada seleção
	   $('.selectionRow').each(function(i,e){ 
			$(e).find('.stk').val('1.50');
	   });
		
	   //Clica em "Place Bet"
	   $('.placeBet button').click();		
	}
	
	
	//Se aparecer o "Botão Continue" depois que apostas foram colocadas, clica nele
	if( $('.betReceipt').size()>0 ) $('button:contains(Continue)').click();
	
},1000);


//A cada 15 minutos recarrega a pagina
window.setInterval(function(){
    window.location.reload();
},15*60*1000);
