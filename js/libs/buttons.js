var arr = [0,1,2,3,4,5],clicks=0,d1 = new Date(),stepper1,stepper2,stepper3,stepper4,d4,list,d2,diff,post_url,request_method,form_data,forms;
var novodataset;
var tempoinicial=new Date(),tempofinal,tempotutorial,duracaoPerguntas,duracaotutorial,duracao;
var selecionados_distance_far=[],selecionados_distance_near=[],selecionados_size_large=[],selecionados_size_small=[],selecionados_variance_small=[],selecionados_variance_large=[];
function buildSlider() {
    // ATUALIZA OS VALORES DO MAPA DE PROB COM INTERVALO QUANDO O SLIDER MUDA NA ETAPA DO TUTORIAL.

    let myMin = math.floor(menor);
    let myMax = math.ceil(maior);

    left=0.2*myMax;
    right=0.8*myMax;
    
	$("#Vis02Tuto").ionRangeSlider({
		type: "double",
	    min: myMin,
            max: myMax,
            from: 0.2*myMax,
            to: 0.8*myMax,
        step: 1,
        drag_interval: true,
        skin: "big",
        grid: true,
        onChange: function (data) {
        	opcoes=[];
        	//opcoes=['Recife','Caruaru'];
            left=data.from;
            right=data.to;
            updateColorsTuto2();
        }
	});
}
