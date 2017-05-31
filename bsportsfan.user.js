//https://bsportsfan.com/ci/Soccer

var tempo_intervalo=30;  //tempo em segundos


setInterval(function(){   
  var stats=[];
  $('.c_1').each(function(){  
     var href=$(this).find("a[id^=r_]").attr('href');

     $.get(href,function(data){  
        stats.push({
           id:Number( href.split('/')[2] ),
          
           time:$(data).find('.race-time').text().trim().replace("'",""),

           gH:Number( $(data).find("td:contains(Goals)").parent().find("td.text-right").text() ),
           gA:Number( $(data).find("td:contains(Goals)").parent().find("td:eq(2)").text() ),

           cH:Number( $(data).find("td:contains(Corners)").parent().find("td:eq(0)").text() ),
           cA:Number( $(data).find("td:contains(Corners)").parent().find("td:eq(2)").text() ),

           rH:Number( $(data).find("td:contains(Red Card)").parent().find("td:eq(0)").text() ),
           rA:Number( $(data).find("td:contains(Red Card)").parent().find("td:eq(2)").text() ),

           soH:Number($(data).find("td:contains(On Target)").parent().find(".sr-only:eq(0)").text()),
           soA:Number($(data).find("td:contains(On Target)").parent().find(".sr-only:eq(1)").text()),

           sfH:Number($(data).find("td:contains(Off Target)").parent().find(".sr-only:eq(0)").text()),
           sfA:Number($(data).find("td:contains(Off Target)").parent().find(".sr-only:eq(1)").text()),

           daH:Number($(data).find("td:contains(Dangerous Attacks)").parent().find(".sr-only:eq(0)").text()),
           daA:Number($(data).find("td:contains(Dangerous Attacks)").parent().find(".sr-only:eq(1)").text()),
   
           pH:Number($(data).find("td:contains(Possession)").parent().find(".sr-only:eq(0)").text()),
           pA:Number($(data).find("td:contains(Possession)").parent().find(".sr-only:eq(1)").text())  
          
        });     
     });  
  });
  
  //setTimeout(function(){ console.log( stats ) },15000 ); 

  var cont=0;
  var espera_stats=setInterval(function(){
    cont+=1;
    if( ($(stats).length==$('.c_1').length) || (cont>=tempo_intervalo-1) ){
      clearInterval(espera_stats);
      console.log( stats );   
    } 
  },1000);
  

},tempo_intervalo*1000);

