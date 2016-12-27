// ==UserScript==
// @name         Extrai Stats Totalcorner
// @namespace    http://aposte.me
// @version      0.1.6.1
// @description  Extrai Stats Totalcorner
// @author       Ronlado Araújo de Farias
// @match        http://www.totalcorner.com/match/today
// @grant        GM_xmlhttpRequest
// ==/UserScript==


$(document).ready(function(){
	
	//Reinicia a pagina 30 segundos depois ser carregada
	localStorage['reiniciado'] = localStorage['reiniciado'] || false;
	setTimeout(function(){
		if(localStorage['reiniciado']==false) {
			localStorage['reiniciado']=true;
			window.location.reload();			
		}
		else{
			localStorage['reiniciado']=false;			
		}
	},30000);
	
	//Se não estiver aparecendo a columa "on target", define as colunas corretas
    if( $('th:contains(on target)').size()<1 ) {
        $.post('http://www.totalcorner.com/user/select_match_list_columns','asian_handicap=on&corner_score=on&total_corners=on&total_goals=on&dangerous_attack=on&shoot_on=on&shoot_off=on&events=on&save=today');
    }
	
	
	
	$( document ).ajaxComplete(function( event, res, settings) {
		if (!settings.url.includes('api_ongoing_matches') ) return;
		
		var TABELA_JOGOS={};
		$('[data-match_id]').each(function(i,e){  
			TABELA_JOGOS[$(e).attr('data-match_id')]={
				home: $(e).find('.match_home a').text(),
				away: $(e).find('.match_away a').text()
			};			
		});
		
		
		
		var DATA=[];
		$(res.responseJSON).each(function(i,j){
			
			HA=$(j.han.split(',')).size()==2 ? (Number(j.han.split(',')[0]) + Number(j.han.split(',')[1]))/2.0 : Number(j.han.split(',')[0]);
			try{
				DATA.push({
						id:   j.id,
						time_:j.sta,
						home: TABELA_JOGOS[j.id].home,
						away: TABELA_JOGOS[j.id].away,
						HA:   HA,
						gH:   Number(j.hg),
						gA:   Number(j.ag),
						daH:  Number(j.hda), 
						daA:  Number(j.ada), 
						soH:  Number(j.ho), 
						soA:  Number(j.ao), 
						sfH:  Number(j.hf),
						sfA:  Number(j.af)
				});
			} catch(e){
				window.location.reload();
			}
			
		});
		
		
		//$.post('http://aposte.me/live/atualiza_live_bet365_REST.php', JSON.stringify(DATA), function(data) {console.log(data) });
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://aposte.me/live/atualiza_live_bet365_REST.php",
			data:  JSON.stringify(DATA),
			onload: function(res){
				console.log(res.responseText);
			}
		});
		
		
	});
});