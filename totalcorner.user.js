// ==UserScript==
// @name         Extrai Stats Totalcorner
// @namespace    http://aposte.me
// @version      0.1
// @description  Extrai Stats Totalcorner
// @author       Ronlado Araújo de Farias
// @match        http://www.totalcorner.com/match/today
// @grant        GM_xmlhttpRequest
// ==/UserScript==


var TABELA_JOGOS={};
$('[data-match_id]').each(function(i,e){  
	TABELA_JOGOS[$(e).attr('data-match_id')]={
			home: $(e).find('.match_home a').text(),
			away: $(e).find('.match_away a').text()
	};			
});

$( document ).ajaxComplete(function( event, res, settings) {
	if (!settings.url.includes('api_ongoing_matches') ) return;
	
	var DATA=[];
    $(res.responseJSON).each(function(i,j){
		
		HA=$(j.han.split(',')).size()==2 ? (Number(j.han.split(',')[0]) + Number(j.han.split(',')[1]))/2.0 : Number(j.han.split(',')[0]);
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
