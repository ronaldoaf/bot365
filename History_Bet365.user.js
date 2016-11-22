// ==UserScript==
// @name         History Bet365
// @namespace    http://aposte.me
// @version      0.2
// @description  Salva o Historico
// @author       Ronaldo Araújo de Farias
// @require      https://cdnjs.cloudflare.com/ajax/libs/taffydb/2.7.3/taffy-min.js
// @match        https://members.365sport365.com/MEMBERS/History/SportsHistory/HistorySearch/*
// @match        https://mobile.365sport365.com/default.aspx*
// @grant        none
// ==/UserScript==

//https://members.365sport365.com/MEMBERS/History/SportsHistory/HistorySearch/?BetStatus=0&SearchScope=3&datefrom=25/10/2016%2000:00:00&dateto=19/11/2016%2023:59:59&platform=Desktop
if (location.host=='members.365sport365.com'){
    var tempo_espera=0;
    var inter=setInterval(function(){  
        if( $('.bet365-rate-limiting-message').css('display')=='block') tempo_espera+=1;
        if (tempo_espera>=30) tempo_espera=0;
        if (($('#bet365-show-more-button').css('display')!=='none')&&(tempo_espera==0))  $('#bet365-show-more-button').click();
        
        if ($('#bet365-show-more-button').css('display')=='none') {
            clearInterval(inter);
            
            
        }
    },1000);
    
    
    
    localStorage.taffy_db_history = localStorage.taffy_db_history || '[]';
    window.db_history=TAFFY(JSON.parse( localStorage.taffy_db_history ) );
    
    
    //Loop principal
    setInterval(function(){
        window.db_history.store(db_history);
    },10000);
    
}





if (location.host=='mobile.365sport365.com'){
    $('body').html('<center><button id="history">HISTORY</button></center>' + $('body').html());
    $('#history').click(function(){
        
    });
}

