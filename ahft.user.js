// ==UserScript==
// @name         bot_AH_FT
// @namespace    http://aposte.me/
// @version      0.3.9
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



//Simula o click real, clicando no centro do objeto
unsafeWindow.jQuery.fn.extend({rclick:function(){var a=function(a,b){return Math.round((a+b)/2)},b={x1:$(this).offset().left,y1:$(this).offset().top,x2:$(this).offset().left+$(this).width(),y2:$(this).offset().top+$(this).height()},c=function(a,b){var c=document.createEvent("MouseEvent"),d=document.elementFromPoint(a,b);c.initMouseEvent("click",!0,!0,unsafeWindow,null,a,b,0,0,!1,!1,!1,!1,0,null),d.dispatchEvent(c)};c(a(b.x1,b.x2),a(b.y1,b.y2))}});




function atualizaQuantidadeDeJogos(){
	   GM_xmlhttpRequest({
		   method: "GET",
		   url: "http://aposte.me/live/n.php?i1=23&f1=40&i2=80&f2=89&intervalo=15",
		   headers: { 
			   'Accept': "*/*; charset=utf-8",
		   },
		   onload: function(response){
		   	GM_setValue('n_jogo',response.responseText);		   
		   }
      	    }); 	
}

function login(){
   if ( $('.hm-LoginPrompt_Fail').css('display')=='block' ){
      GM_xmlhttpRequest({
         url: "http://aposte.me/live/alerta.php",
         onload: function(res){
            $('body').html('');
         }
      });
      
   }else{
      if($('.mmhdr-UserInfo_UserName').text()==''){
         $('.hm-HeaderLinkLogin_Launcher').click();
         $('#PopUp_UserName').val('ronaldoaf');
         $('#PopUp_Password').val('rr842135');
         $('#PopUp_KML').val('on');
         $('#LogInPopUpBttn').click();
      }
   }
};

function verificaErroDeLogin(){   
}


atualizaQuantidadeDeJogos();




console.log([primeiroTempo(),segundoTempo()]);


var time_;



unsafeWindow.bot={};

bot.apostando_agora=false;
bot.betslipBarEnhanced_selecionado=false;
bot.copiado_betslip=false

bot.stake=function(){
    var soma=0;
	$( bot.textMyBets.match(/VA=[0-9\.]+/g) ).each(function(i,e){
		soma+=Number(e.split('=')[1]);
	});

	soma+=bot.balance; 

        n_jogo=Number( GM_getValue('n_jogo') );
        if (n_jogo<=30.0) n_jogo=30.0;
        percent=0.21/(n_jogo*0.11);  
      
        

	return (Math.floor(soma*percent)+0.5);
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
	
	jogo.gH_atual=Number($(jogo.market).find('.ipe-ParticipantCouponFixtureName_Team1Score').eq(jogo.positionInMarket).text());
	jogo.gA_atual=Number($(jogo.market).find('.ipe-ParticipantCouponFixtureName_Team2Score').eq(jogo.positionInMarket).text());
	
	jogo.AH_Home=ahSel(jogo.selHome);
	jogo.AH_Away=ahSel(jogo.selAway);
	
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
		data:  JSON.stringify(nota),
		onload: function(res){
			console.log(res.responseText);
		}
	});
};



//---Toda vez que as estatisticas do arquivo JSON forem carregadas
bot.onLoadStats=function(response){
   bot.lista_de_apostas=[];
   
   //console.log(response);
   var jogos=eval(response.responseText);
   //console.log(jogos);

   //Se o flag bot.apostando_agora estiver true, não tenta aposta
   if(bot.apostando_agora) return;
    
    
    var anota_apostas=[];
   //Para jogo no cupom
   $('.ipe-ParticipantCouponFixtureName_Participant').each(function(i,e){

	   var home=$(e).find('.ipe-ParticipantCouponFixtureName_TeamName:eq(0)').text();
	   var away=$(e).find('.ipe-ParticipantCouponFixtureName_TeamName:eq(1)').text();
	   
	   //anota_apostas.push([jogo)+'<<<>>>'+JSON.stringify(jogos)+'<<<>>>'+bot.textMyBets+'<<<>>>>'+ $('#MarketGrid').html() );
	   //Cada jogo do Ajax       
	   $(jogos).each(function(ii,jogo){			   
			 //if (apostando_agora) return;
		   
			 if(  (jogo.home==home) && (jogo.away==away) ){
				   
				   //Se já houve aposta nesse jogo sai.
				   if( bot.jaFoiApostado(home,away) ) return;
				   
				   //Se o elemento DOM da linha do jogo 
				   jogo_selecionado=bot.jogoLive(home,away);
                   

                 
                    
                 
					//Aposta no Home
					if (
						 //( ( jogo.ind>=3.50 ) &&  ( jogo.ind2>=2.5) && 	   ( jogo_selecionado.AH_Home==-0.5)  &&  ( jogo.gH<=1)  &&  ( (primeiroTempo() && (jogo_selecionado.tempo>=25)) ||  (segundoTempo() && (jogo_selecionado.tempo>=70))    ) ) ||
						 //( ( jogo.ind>=2.50 ) &&  ( jogo.ind2>=1.50) && 	( jogo_selecionado.AH_Home==-0.25)  &&  ( jogo.gH==0.0) &&  ( (primeiroTempo() && (jogo_selecionado.tempo>=25)) ||  (segundoTempo() && (jogo_selecionado.tempo>=70))    ) ) ||
						 ( ( jogo.ind>=2.00 ) &&  ( jogo.ind2>=1.00) && 	( jogo_selecionado.AH_Home>=0)  &&  ( jogo.gH==0.0) &&  ( (primeiroTempo() && (jogo_selecionado.tempo>=23)) ||  (segundoTempo() && (jogo_selecionado.tempo>=80))    ) )
                   ){
						bot.lista_de_apostas.push(home+' v '+away);
						bot.apostar(jogo_selecionado.selHome);	                        
						anota_apostas.push( jogo );
					}
		   
					
					//Aposta no Away
					if (
						// ( ( jogo.ind<=-3.50 ) &&  ( jogo.ind2<=-2.5) && 	( jogo_selecionado.AH_Away==-0.5)  &&  ( jogo.gA<=1)  &&  ( (primeiroTempo() && (jogo_selecionado.tempo>=25)) ||  (segundoTempo() && (jogo_selecionado.tempo>=70))    ) ) ||
						// ( ( jogo.ind<=-2.50 ) &&  ( jogo.ind2<=-1.50) && 	( jogo_selecionado.AH_Away==-0.25)  &&  ( jogo.gA==0.0)  &&  ( (primeiroTempo() && (jogo_selecionado.tempo>=25)) ||  (segundoTempo() && (jogo_selecionado.tempo>=70))    ) ) ||
						 ( ( jogo.ind<=-1.50 ) &&  ( jogo.ind2<=-1.00) && 	( jogo_selecionado.AH_Away>=0)  &&  ( jogo.gA==0.0) &&  ( (primeiroTempo() && (jogo_selecionado.tempo>=23)) ||  (segundoTempo() && (jogo_selecionado.tempo>=80))    ) )
					){
						bot.lista_de_apostas.push(home+' v '+away);
						bot.apostar(jogo_selecionado.selAway);                        
						anota_apostas.push( jogo );
						 
					}      
				    
					//Limpa bonus DNB
                    if( (jogo_selecionado.gH_atual==jogo_selecionado.gA_atual) && ( jogo_selecionado.AH_Home==0) && (jogo_selecionado.tempo>=85)  ) {
                        if( jogo.ind>0 && jogo.ind2>0 ) window.open('https://mobile.bet365.com/default.aspx#type=Coupon;key='+jogo.id2+'C1_1_3;DNDB0');
                        if( jogo.ind<0 && jogo.ind2<0 ) window.open('https://mobile.bet365.com/default.aspx#type=Coupon;key='+jogo.id2+'C1_1_3;DNDB1');
                    }
 
					
		   

			 }
	   });
   });
   //Envia as anotacoes   
   setTimeout(function(){
   	bot.anotar({jogos: JSON.stringify(jogos), apostas: anota_apostas, myBets: bot.textMyBets, pagina: $('#MarketGrid').html() });
   },4000);
   
   
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
	   onload: function(response){
			eval(response);
	   }
   }); 	
};



//Loop Principal repete todos os comandos a cada 1 segund
unsafeWindow.setInterval(function(){
	if (location.hash)
	
	time_=Math.floor( (+new Date) /1000);
    
    //Se estiver no primeiro tempo dá uma shift de 15 segundos para que ambos os bots não executem as tarefas ao mesmo tempo
    if (primeiroTempo()) time_+=15;
    
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
	   
	   //Para cada seleção no BetSlip
	   $('.betSlip .selectionRow').each(function(i,e){ 
	   console.log( $(e).find('.fullSlipMode:eq(1)').text() );	   
	   
           //Se o jogo que aparece no betSlip está na lista de apostas preenche o stake
            if( $.inArray( $(e).find('.fullSlipMode:eq(1)').text(), bot.lista_de_apostas )>-1 ) {
				$(e).find('.stk').val(  bot.stake() );   
			}
			//Caso não esteja na lista de apostas remove do BetSlip
			else {
				$(e).find('a.remove').rclick();		
               console.log('Removeu: ' +  $(e).find('.fullSlipMode:eq(1)').text() );
                
			}
	   });
		
	   console.log(bot.lista_de_apostas);	
		
	   //Clica em "Place Bet"
	   $('.placeBet button').click();	 

	   //Clica em Continue
	   unsafeWindow.$('button:contains(Continue)').click();    
	   
	}
	
	
	//Se aparecer o "Botão Continue" depois que apostas foram colocadas, clica nele
	//if( $('.betReceipt').size()>0 ) $('button:contains(Continue)').click();    
    //Se estiver aparecendo o Continui clica
    //if( $('.abetslipRecBtn').size()>0 ) $('.abetslipRecBtn button').click();
    
    
    //Se a Bet Bar amarela ficar travado clica nela	
    if ( ($('#betslipBar').css('display')!=='none' ) && ( $('#betSlipOverlay.opaque').size()==0 )  ) $('#betslipBar').click();
    
    

    
    
    
    
	//Senão estiver logado, loga
	login();
	verificaErroDeLogin();
	
	//Abre os mercados colapsados
	$('.ipe-Market:not(:has(.ipe-MarketContainer ))').each(function(i,e){ $(e).click() })
	//bot.interativo();
	
},1000);


//A cada 15 minutos recarrega a pagina
window.setInterval(function(){
    atualizaQuantidadeDeJogos();
    window.location.reload();
},15*60*1000);
