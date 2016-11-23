// ==UserScript==
// @name         History Bet365
// @namespace    http://aposte.me
// @version      0.3
// @description  Salva o Historico
// @author       Ronaldo Araújo de Farias
// @require      https://cdnjs.cloudflare.com/ajax/libs/taffydb/2.7.3/taffy-min.js
// @match        https://members.365sport365.com/MEMBERS/History/SportsHistory/HistorySearch/*
// @match        https://mobile.365sport365.com/default.aspx*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

function pegaDados(){
    var bet_history=[];
    var num_bets=0;
    $('[data-bash]').each(function(i,e){
        var obj={};
        var timestamp=(+new Date);
        obj.betid=$(e).attr('data-betid');
        obj.bash=$(e).attr('data-bash');
        obj.stake=Number($(e).find('.bet-summary-total-stake').text().trim());
        obj.datahora=$(e).find('.bet-summary-placement-date').text().trim()
        var datahora=obj.datahora;
        obj.bet_timestamp=Number(Date.parse(datahora.substr(3,2)+'/'+datahora.substr(0,2)+datahora.substr(5)));
        var stake=obj.stake
        obj.retorno=Number($(e).find('.bet-summary-return').text().trim());

        var url='https://members.365sport365.com/Members/History/SportsHistory/GetBetConfirmation?platform=desktop&_='+timestamp+'&Id='+obj.betid+'&BetStatus=0&Bcar=0&Bash='+obj.bash+'&Pebs=0';
        //console.log(url);
        var bot=(stake % 1 == 0.5);
        if (!bot) return;

        num_bets+=1;
        $.get(url,function(res){

            obj.selecao=$(res).find('.bet-confirmation-table-body-selections').text().trim();
            var selecao=obj.selecao;
            var evento=$(res).find('.bet-confirmation-table-body-event').html().split('<br>');
            obj.jogo=evento[0].trim();
            obj.mercado=evento[1].trim();
            obj.odds=Number($(res).find('.bet-confirmation-table-body-odds').text().trim());
            obj.confirmacao=$(res).find('.bet-confirmation-details-ref').text().trim().split(' - ')[1];

            obj.placar = selecao.split(' ')[0].replace( '(', '' ).replace( ')','' );
            obj.handicap=$(selecao.split(' ')).last()[0].replace('-0,5','-0.5');


            //if (bot) console.log([placar, handicap ]);

            bet_history.push(obj);
        });

    });

    var aguarda=setInterval(function(){
        if ($(bet_history).size()==num_bets) {
            clearInterval(aguarda);

            console.log( JSON.stringify(bet_history)  );
            GM_xmlhttpRequest({
                method: "POST",
                url: "http://aposte.me/live/bet_history_update.php",
                data: JSON.stringify(bet_history), 
                headers: {
                    "Accecpt": " application/json"
                },
                onload: function(response){  
                    console.log(response.responseText) 
                } 
            }); 
        }	
    },1000);



}



if (location.host=='members.365sport365.com'){
    var tempo_espera=0;
    var inter=setInterval(function(){  
        if( $('.bet365-rate-limiting-message').css('display')=='block') tempo_espera+=1;
        if (tempo_espera>=30) tempo_espera=0;
        if (($('#bet365-show-more-button').css('display')!=='none')&&(tempo_espera==0))  $('#bet365-show-more-button').click();
        
        if ($('#bet365-show-more-button').css('display')=='none') {
            clearInterval(inter);
            pegaDados();
            
        }
    },1000);
    
    
    /*
    localStorage.taffy_db_history = localStorage.taffy_db_history || '[]';
    window.db_history=TAFFY(JSON.parse( localStorage.taffy_db_history ) );
    
    
    //Loop principal
    setInterval(function(){
        window.db_history.store(db_history);
    },10000);
    
    
    */
}





if (location.host=='mobile.365sport365.com'){
    $('body').html('<center><button id="history">HISTORY</button></center>' + $('body').html());
    $('#history').click(function(){
        
    });
}

