
var system = require('system');

var webPage = require('webpage');
var page = webPage.create();


page.settings.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';


page.onConsoleMessage = function(msg) {
    system.stderr.writeLine('console: ' + msg);
};


function stats(){
   page.open('http://bsportsfan.com/ci/Soccer',function(status) {
       page.injectJs('jquery.js');
       page.evaluate(function(){   

          var stats=[];
          $('.c_1').each(function(){  
             var href=$(this).find("a[id^=r_]").attr('href');

             $.get(href,function(data){  
                stats.push({
                   id:Number( href.split('/')[2] ),
                  
                   time:$(data).find('.race-time').text().trim().replace("'","").trim(),

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

                   atH:Number($(data).find("td:contains(Attacks):not(:contains(Dangerous))").parent().find(".sr-only:eq(0)").text()),
                   atA:Number($(data).find("td:contains(Attacks):not(:contains(Dangerous))").parent().find(".sr-only:eq(1)").text()),
                  
                   daH:Number($(data).find("td:contains(Dangerous Attacks)").parent().find(".sr-only:eq(0)").text()),
                   daA:Number($(data).find("td:contains(Dangerous Attacks)").parent().find(".sr-only:eq(1)").text()),
           
                   pH:Number($(data).find("td:contains(Possession)").parent().find(".sr-only:eq(0)").text()),
                   pA:Number($(data).find("td:contains(Possession)").parent().find(".sr-only:eq(1)").text())  
                  
                });     
             });  
          });          

          var cont=0;
          var espera_stats=setInterval(function(){
            cont+=1;
            if( ($(stats).length==$('.c_1').length) || (cont>=28) ){
              clearInterval(espera_stats);
              $.ajax({
                  type: 'POST',
                  url: 'http://aposte.me/AO/insert_stats.php',
                  crossDomain: true,
                  data: JSON.stringify(stats),
                  success: function(data) {
                     console.log(data);
                  }              
              });
            } 
          },1000);                      
       });
   });    
}




stats();

setInterval(function(){   
   stats();
},30*1000);









setTimeout(function(){
    phantom.exit();
},(10*60)*1000);




