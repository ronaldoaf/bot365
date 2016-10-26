//section.qb-QuickBetModule 
/*
qb-QuickBetModule 
	qb-QuickBetModule_BetSelected 
	qb-QuickBetModule_HasValue 
	qb-QuickBetModule_Placed 
	
	
	qb-QuickBetModule qb-QuickBetModule_HasValue qb-QuickBetModule_BetSelected 
	
	
	
	qb-QuickBetModule 
	      qb-QuickBetModule_BetSelected 
		  qb-QuickBetModule_SetStake 
		  qb-QuickBetModule_NoValue 
		  
.qb-QuickBetModule 
	qb-QuickBetModule_BetSelected 
	qb-QuickBetModule_ShowingKeypad 
	qb-QuickBetModule_HasValue 
	qb-QuickBetModule_StatusChanged 
	qb-QuickBetModule_ChangeOdds 


*/

set_stake_show=$('section.qb-QuickBetModule ').hasClass('qb-QuickBetModule_SetStake')


//Para dar OK depois da aposta feita
$('.qb-MessageContainer_Indicator').click();


normalRandomInt=function(min,max){

	var gaussian=function(mean, stdev) {
		var y2;
		var use_last = false;
		return function() {
			var y1;
			if(use_last) {
			   y1 = y2;
			   use_last = false;
			}
			else {
				var x1, x2, w;
				do {
					 x1 = 2.0 * Math.random() - 1.0;
					 x2 = 2.0 * Math.random() - 1.0;
					 w  = x1 * x1 + x2 * x2;               
				} while( w >= 1.0);
				w = Math.sqrt((-2.0 * Math.log(w))/w);
				y1 = x1 * w;
				y2 = x2 * w;
				use_last = true;
		   }

		   var retval = mean + stdev * y1;
		   if(retval > 0) 
			   return retval;
		   return -retval;
	   }
	}
	
	var r=Math.round(gaussian((max+min)/2.0, (max-min)/6.0)());
	
	if (r>max) r=max;
	if (r<min) r=min;
	
	return r;

}
