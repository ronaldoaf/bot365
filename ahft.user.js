// ==UserScript==
// @name         bot_AH_FT
// @namespace    http://aposte.me/
// @version      0.5.0
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

function removeDiacritics(a){changes||(changes=defaultDiacriticsRemovalMap);for(var b=0;b<changes.length;b++)a=a.replace(changes[b].letters,changes[b].base);return a}var defaultDiacriticsRemovalMap=[{base:"A",letters:/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g},{base:"AA",letters:/[\uA732]/g},{base:"AE",letters:/[\u00C6\u01FC\u01E2]/g},{base:"AO",letters:/[\uA734]/g},{base:"AU",letters:/[\uA736]/g},{base:"AV",letters:/[\uA738\uA73A]/g},{base:"AY",letters:/[\uA73C]/g},{base:"B",letters:/[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g},{base:"C",letters:/[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g},{base:"D",letters:/[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g},{base:"DZ",letters:/[\u01F1\u01C4]/g},{base:"Dz",letters:/[\u01F2\u01C5]/g},{base:"E",letters:/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g},{base:"F",letters:/[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g},{base:"G",letters:/[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g},{base:"H",letters:/[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g},{base:"I",letters:/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g},{base:"J",letters:/[\u004A\u24BF\uFF2A\u0134\u0248]/g},{base:"K",letters:/[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g},{base:"L",letters:/[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g},{base:"LJ",letters:/[\u01C7]/g},{base:"Lj",letters:/[\u01C8]/g},{base:"M",letters:/[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g},{base:"N",letters:/[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g},{base:"NJ",letters:/[\u01CA]/g},{base:"Nj",letters:/[\u01CB]/g},{base:"O",letters:/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g},{base:"OI",letters:/[\u01A2]/g},{base:"OO",letters:/[\uA74E]/g},{base:"OU",letters:/[\u0222]/g},{base:"P",letters:/[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g},{base:"Q",letters:/[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g},{base:"R",letters:/[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g},{base:"S",letters:/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g},{base:"T",letters:/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g},{base:"TZ",letters:/[\uA728]/g},{base:"U",letters:/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g},{base:"V",letters:/[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g},{base:"VY",letters:/[\uA760]/g},{base:"W",letters:/[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g},{base:"X",letters:/[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g},{base:"Y",letters:/[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g},{base:"Z",letters:/[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g},{base:"a",letters:/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g},{base:"aa",letters:/[\uA733]/g},{base:"ae",letters:/[\u00E6\u01FD\u01E3]/g},{base:"ao",letters:/[\uA735]/g},{base:"au",letters:/[\uA737]/g},{base:"av",letters:/[\uA739\uA73B]/g},{base:"ay",letters:/[\uA73D]/g},{base:"b",letters:/[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g},{base:"c",letters:/[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g},{base:"d",letters:/[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g},{base:"dz",letters:/[\u01F3\u01C6]/g},{base:"e",letters:/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g},{base:"f",letters:/[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g},{base:"g",letters:/[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g},{base:"h",letters:/[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g},{base:"hv",letters:/[\u0195]/g},{base:"i",letters:/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g},{base:"j",letters:/[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g},{base:"k",letters:/[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g},{base:"l",letters:/[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g},{base:"lj",letters:/[\u01C9]/g},{base:"m",letters:/[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g},{base:"n",letters:/[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g},{base:"nj",letters:/[\u01CC]/g},{base:"o",letters:/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g},{base:"oi",letters:/[\u01A3]/g},{base:"ou",letters:/[\u0223]/g},{base:"oo",letters:/[\uA74F]/g},{base:"p",letters:/[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g},{base:"q",letters:/[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g},{base:"r",letters:/[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g},{base:"s",letters:/[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g},{base:"t",letters:/[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g},{base:"tz",letters:/[\uA729]/g},{base:"u",letters:/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g},{base:"v",letters:/[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g},{base:"vy",letters:/[\uA761]/g},{base:"w",letters:/[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g},{base:"x",letters:/[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g},{base:"y",letters:/[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g},{base:"z",letters:/[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g}],changes;

function ns(texto){
	return removeDiacritics(texto.toLowerCase());
}


//Simula o click real, clicando no centro do objeto
unsafeWindow.jQuery.fn.extend({rclick:function(){var a=function(a,b){return Math.round((a+b)/2)},b={x1:$(this).offset().left,y1:$(this).offset().top,x2:$(this).offset().left+$(this).width(),y2:$(this).offset().top+$(this).height()},c=function(a,b){var c=document.createEvent("MouseEvent"),d=document.elementFromPoint(a,b);c.initMouseEvent("click",!0,!0,unsafeWindow,null,a,b,0,0,!1,!1,!1,!1,0,null),d.dispatchEvent(c)};c(a(b.x1,b.x2),a(b.y1,b.y2))}});




function atualizaQuantidadeDeJogos(){
	   GM_xmlhttpRequest({
		   method: "GET",
		   url: "http://aposte.me/live/n.php?i1=28&f1=40&i2=82&f2=89&intervalo=25",
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
         method: "GET",
         url: "http://aposte.me/live/alerta.php",
         onload: function(res){
            $('body').html(res);
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

bot.aposta_maxima=0.0;

bot.stake=function(){
    var soma=0;
	$( bot.textMyBets.match(/VA=[0-9\.]+/g) ).each(function(i,e){
		soma+=Number(e.split('=')[1]);
	});

	soma+=bot.balance; 

        n_jogo=Number( GM_getValue('n_jogo') );
        if (n_jogo<=30.0) n_jogo=30.0;
        percent=0.21/(n_jogo*0.10);  
      
    
	
	if (bot.aposta_maxima>0.0) return bot.aposta_maxima;
	
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
		   
			 if(  (ns(jogo.home)==ns(home)) && (ns(jogo.away)==ns(away)) ){
				   
				   //Se já houve aposta nesse jogo sai.
				   if( bot.jaFoiApostado(home,away) ) return;
				   
				   //Se o elemento DOM da linha do jogo 
				   jogo_selecionado=bot.jogoLive(home,away);
                   

                 
                    
                 
					//Aposta no Home
				 	     if (( ( jogo.ind>=1.75 ) &&  ( jogo.ind2>=1.00) && 	( jogo_selecionado.AH_Home>=0)  &&  ( jogo.gH==0.0) &&  ( (primeiroTempo() && (jogo_selecionado.tempo>=25)) ||  (segundoTempo() && (jogo_selecionado.tempo>=75))    ) )) { bot.lista_de_apostas.push(home+' v '+away);  bot.apostar(jogo_selecionado.selHome); }
					     //if (( ( jogo.ind>=4.50 ) &&  ( jogo.ind2>=3.50) && 	( jogo_selecionado.AH_Home>=0)  &&  ( jogo.gH==0.0) &&  ( (primeiroTempo() && (jogo_selecionado.tempo>=20)) ||  (segundoTempo() && (jogo_selecionado.tempo>=70))    ) )) { bot.lista_de_apostas.push(home+' v '+away);  bot.apostar(jogo_selecionado.selHome); }	 
					//else if (( ( jogo.ind>=3.50 ) &&  ( jogo.ind2>=2.50) && 	( jogo_selecionado.AH_Home>=0)  &&  ( jogo.gH==0.0) &&  ( (primeiroTempo() && (jogo_selecionado.tempo>=24)) ||  (segundoTempo() && (jogo_selecionado.tempo>=76))    ) )) { bot.lista_de_apostas.push(home+' v '+away);  bot.apostar(jogo_selecionado.selHome); }	 
                    //else if (( ( jogo.ind>=2.50 ) &&  ( jogo.ind2>=1.50) && 	( jogo_selecionado.AH_Home>=0)  &&  ( jogo.gH==0.0) &&  ( (primeiroTempo() && (jogo_selecionado.tempo>=28)) ||  (segundoTempo() && (jogo_selecionado.tempo>=82))    ) )) { bot.lista_de_apostas.push(home+' v '+away);  bot.apostar(jogo_selecionado.selHome); }	 				
					//else if (( ( jogo.ind>=2.00 ) &&  ( jogo.ind2>=1.00) && 	( jogo_selecionado.AH_Home>=0)  &&  ( jogo.gH==0.0) &&  ( (primeiroTempo() && (jogo_selecionado.tempo>=35)) ||  (segundoTempo() && (jogo_selecionado.tempo>=85))    ) )) { bot.lista_de_apostas.push(home+' v '+away);  bot.apostar(jogo_selecionado.selHome); }	 
					//else if (( ( jogo.ind>=1.25 ) &&  ( jogo.ind2>=1.00) && 	( jogo_selecionado.AH_Home>=0)  &&  ( jogo.gH==0.0) &&  ( (primeiroTempo() && (jogo_selecionado.tempo>=38)) ||  (segundoTempo() && (jogo_selecionado.tempo>=88))    ) )) { bot.lista_de_apostas.push(home+' v '+away);  bot.apostar(jogo_selecionado.selHome); }	 
					
					//Aposta no Away
				 	      if (( ( jogo.ind<=-1.75 ) &&  ( jogo.ind2<=-1) && 	( jogo_selecionado.AH_Away>=0)  &&  ( jogo.gA==0.0) &&  ( (primeiroTempo() && (jogo_selecionado.tempo>=25)) ||  (segundoTempo() && (jogo_selecionado.tempo>=75))    ) ))  { bot.lista_de_apostas.push(home+' v '+away);  bot.apostar(jogo_selecionado.selAway); }
					     //if (( ( jogo.ind<=-4.50 ) &&  ( jogo.ind2<=-3.50) && 	( jogo_selecionado.AH_Away>=0)  &&  ( jogo.gA==0.0) &&  ( (primeiroTempo() && (jogo_selecionado.tempo>=20)) ||  (segundoTempo() && (jogo_selecionado.tempo>=70))    ) ))  { bot.lista_de_apostas.push(home+' v '+away);  bot.apostar(jogo_selecionado.selAway); }	                       
					//else if (( ( jogo.ind<=-3.50 ) &&  ( jogo.ind2<=-2.50) && 	( jogo_selecionado.AH_Away>=0)  &&  ( jogo.gA==0.0) &&  ( (primeiroTempo() && (jogo_selecionado.tempo>=24)) ||  (segundoTempo() && (jogo_selecionado.tempo>=76))    ) ))  { bot.lista_de_apostas.push(home+' v '+away);  bot.apostar(jogo_selecionado.selAway); }	  
				   // else if (( ( jogo.ind<=-2.50 ) &&  ( jogo.ind2<=-1.50) && 	( jogo_selecionado.AH_Away>=0)  &&  ( jogo.gA==0.0) &&  ( (primeiroTempo() && (jogo_selecionado.tempo>=28)) ||  (segundoTempo() && (jogo_selecionado.tempo>=82))    ) ))  { bot.lista_de_apostas.push(home+' v '+away);  bot.apostar(jogo_selecionado.selAway); }  
					//else if (( ( jogo.ind<=-2.00 ) &&  ( jogo.ind2<=-1.00) && 	( jogo_selecionado.AH_Away>=0)  &&  ( jogo.gA==0.0) &&  ( (primeiroTempo() && (jogo_selecionado.tempo>=35)) ||  (segundoTempo() && (jogo_selecionado.tempo>=85))    ) ))  { bot.lista_de_apostas.push(home+' v '+away);  bot.apostar(jogo_selecionado.selAway); }  
					//else if (( ( jogo.ind<=-1.25 ) &&  ( jogo.ind2<=-1.00) && 	( jogo_selecionado.AH_Away>=0)  &&  ( jogo.gA==0.0) &&  ( (primeiroTempo() && (jogo_selecionado.tempo>=38)) ||  (segundoTempo() && (jogo_selecionado.tempo>=88))    ) ))  { bot.lista_de_apostas.push(home+' v '+away);  bot.apostar(jogo_selecionado.selAway); }  
		   

			 }
	   });
   });

   
   
};  





//---A cada 30 segundos
bot.on30segs=function(){		
       console.log('on30segs');
	   bot.aposta_maxima=0.0;    
	
	
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
	   
		
	   //Se estiver no modo da aposta_maxima tem outro comportamento
	   if(bot.aposta_maxima==0.0){
		   //Para cada seleção no BetSlip
		   $('.betSlip .selectionRow').each(function(i,e){ 
			   console.log( $(e).find('.fullSlipMode:eq(1)').text() );	   

			   //Se o jogo que aparece no betSlip está na lista de apostas preenche o stake e Handicap
			   if( ($.inArray( $(e).find('.fullSlipMode:eq(1)').text(), bot.lista_de_apostas )>-1) && ($(e).find('.fullSlipMode:eq(0)').text().includes('Handicap')) ) {
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
	   }
			
	   if ($('.referDialogue').size()>0){
		   bot.aposta_maxima=Math.floor(Number( $('.referCanBePlaced .referValue').text() ))-1.5;
		   $('a:contains(Back to Bet Slip)').click();		   
		   setTimeout(function(){
			   $('input.stk').val(bot.maxima_aposta);			   
		   },1000); 
	   }
		
		
		
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
