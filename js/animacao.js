var index=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
hops=true;
sorteados=shuffle(index);
async function animacaoT(){
	for (var i = 0; i < sorteados.length; i++) {
	    if(hops){
		
			amostraN=sorteados[i];
			Vis04TutorialFunction();
			bring_front(mapVis04);
		}
		if(i==(sorteados.length-1)){
			i=-1;
		}
		await sleep(660);
	}
}

setTimeout(function() {   //calls click event after a certain time
   	animacaoT();
}, 1000);
