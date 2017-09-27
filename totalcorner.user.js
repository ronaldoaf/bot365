// ==UserScript==
// @name         Extrai Stats Totalcorner
// @namespace    http://aposte.me
// @version      0.4.4
// @description  Extrai Stats Totalcorner
// @author       Ronlado Araújo de Farias
// @match        *://www.totalcorner.com/match/today
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var toTimestamp=function(d){ 
	//Formato mm/dd hh:mm   para  milisegundos
	return (+new Date(d.split(' ')[0]+"/"+(new Date().getFullYear())+" "+d.split(' ')[1]));
}

$(document).ready(function(){
	
	//Reinicia a pagina 20 segundos depois ser carregada
	localStorage['reiniciado'] = localStorage['reiniciado'] || false;
	setTimeout(function(){
		if(JSON.parse(localStorage['reiniciado'])==false) {
			localStorage['reiniciado']=true;
			window.location.reload();			
		}
		else{
			localStorage['reiniciado']=false;			
		}
	},20000);
	
	//Se não estiver aparecendo a columa "on target", refaz o login e define as colunas corretas
    if( $('th:contains(on target)').size()<1 ) {
		$.post('http://www.totalcorner.com/user/login','password=rrr842135&username=ronaldoaf');
		setTimeout(function(){
             $.post('http://www.totalcorner.com/user/select_match_list_columns','asian_handicap=on&corner_score=on&total_corners=on&total_goals=on&dangerous_attack=on&shoot_on=on&shoot_off=on&events=on&save=today');
		},3000);
        
    }	
	
	setInterval(function(){
		var DATA=[];
		$('.minutes_postfix').parents('tr').each(function(i,e){ 

			var home=$(e).find('td:eq(3) a').text();
			var away=$(e).find('td:eq(5) a').text();

			DATA.push( {
				id:   Number($(e).attr('data-match_id')), 
				time_:$(e).find('.match_status_minutes').text(),
				timestamp: -4*60*60*1000+Number(   toTimestamp( $(e).find('td:eq(1)').text() )  ),
				home: $(e).find('td:eq(3) a').text(), 
				away: $(e).find('td:eq(5) a').text(), 
				HA: -7.0,
				gH: Number($(e).find('.match_goal').text().split(' - ')[0]),
				gA: Number($(e).find('.match_goal').text().split(' - ')[1]),
				daH: Number($(e).find('.match_dangerous_attacks_div').text().split(' - ')[0]),
				daA: Number($(e).find('.match_dangerous_attacks_div').text().split(' - ')[1]),
				soH: Number($(e).find('.match_on_div').text().split(' - ')[0]),
				soA: Number($(e).find('.match_on_div').text().split(' - ')[1]),
				sfH: Number($(e).find('.match_off_div').text().split(' - ')[0]),
				sfA: Number($(e).find('.match_off_div').text().split(' - ')[1])		

			}); 
		});	
		$.post('http://aposte.me/live/atualiza_live_bet365_REST.php', JSON.stringify(DATA), function(data) {console.log(data) });
	},15000);	

});
