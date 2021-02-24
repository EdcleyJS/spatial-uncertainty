var sucesso=0;
function refresh(){
  if(sucesso==2){
      window.location.reload(true);
  }
}

var maior=0,menor=+Infinity;
function distribuicaoNYC(id){
  var distdataMes=[];
  databasetaxi.forEach(function(d,i){
    distdataMes.push(d[0][id]);
    if(maior<Number(d[0][id])){
      maior=d[0][id];
    }
    if(menor>Number(d[0][id])){
      menor=d[0][id];
    }
  });
  return distdataMes;
}

function distribuicaoSin(id,disttomap){
  var distSin=[];
  disttomap.forEach(function(d,i){
    distSin.push(d[0][id]);
    if(maior<Number(d[0][id])){
      maior=d[0][id];
    }
    if(menor>Number(d[0][id])){
      menor=d[0][id];
    }
  });
  return distSin;
}

function color_distance(prob){
    if(colorScale == undefined){
	var cbf = palette('cb-BuGn', 9);
	var color;
	grades_distance.forEach(function(d,i){
	    if(Number(prob)>=d){
		color=cbf[i];
	    }
	});
	return color;
    }
    else{
	return colorScale(prob);
    }
}

// PREPARA A DISTRUIBUICAO DE CADA ÁREA EM DIAS 365 PARA CADA ANO NO DATASET.
function distribuicaoAno(featurename){
  var distdataAno=[];
  var soma=0,soma1=0,soma2=0;
  if(mesSelecionado!=undefined){
    database.forEach(function(d,i){
      if (d.name==featurename && d.Ano==anoSelecionado && d.Mês==mesSelecionado){
        var dias=diasToArray(d);
        dias.forEach(function(d,i){
                    distdataAno.push(d);
                  });
      }
    });
  }else if(trimestreSelecionado!=undefined){
    database.forEach(function(d,i){
      if(trimestreSelecionado==1){
        if( d.Mês=='Jan'|| d.Mês=='Fev' || d.Mês=='Mar' ){
          if (d.name==featurename && d.Ano==anoSelecionado){
            var dias=diasToArray(d);
            dias.forEach(function(d,i){
              distdataAno.push(d);
            });
          }
        }
      }else if(trimestreSelecionado==2){
        if( d.Mês=='Abr'|| d.Mês=='Mai' || d.Mês=='Jun' ){
          if (d.name==featurename && d.Ano==anoSelecionado){
            var dias=diasToArray(d);
            dias.forEach(function(d,i){
              distdataAno.push(d);
            });
          }
        }
      }else if(trimestreSelecionado==3){
        if( d.Mês=='Jul'|| d.Mês=='Ago' || d.Mês=='Set' ){
          if (d.name==featurename && d.Ano==anoSelecionado){
            var dias=diasToArray(d);
            dias.forEach(function(d,i){
              distdataAno.push(d);
            });
          }
        }
      }else{
        if( d.Mês=='Out'|| d.Mês=='Nov' || d.Mês=='Dez' ){
          if (d.name==featurename && d.Ano==anoSelecionado){
            var dias=diasToArray(d);
            dias.forEach(function(d,i){
              distdataAno.push(d);
            });
          }
        }
      }
    });
  }else if(diaSelecionado!=undefined){
    database.forEach(function(d,i){
      if (d.name==featurename && d.Ano==anoSelecionado){
          distdataAno.push(d[diaSelecionado]);
      }
    });
  }else if(anoSelecionado!=null){
    database.forEach(function(d,i){
      if (d.name==featurename && d.Ano==anoSelecionado){
          distdataAno.push(SomaDias(d));
      }
    });
  }else{
    database.forEach(function(d,i){
      if (d.name==featurename) {
        if(d.Ano==2016){
          soma+=SomaDias(d);
        }else if (d.Ano==2017) {
          soma1+=SomaDias(d);
        }else{
          soma2+=SomaDias(d);
        }
      }
    });
    distdataAno.push(soma);
    distdataAno.push(soma1);
    distdataAno.push(soma2);
  }
  return distdataAno;
}
// PREPARA A DISTRUIBUICAO DE DIAS PARA MESES DE 365 PARA 12 POR ANO.
function SomaDias(d){
  var soma=0;
  if(d.Mês=='Abr'||d.Mês=='Jun'||d.Mês=='Set'||d.Mês=='Nov'){
    for (var i = 1; i < 31; i++) {
      soma=soma+Number(d[i]);
    }
  }else if(d.Mês=='Fev'){
    for (var i = 1; i < 29; i++) {
      soma+=Number(d[i]);
    }
  }else{
    for (var i = 1; i < 32; i++) {
      soma=soma+Number(d[i]);
    }
  }
  return soma;
}
// PREPARA A DISTRUIBUICAO PARA TRIMESTRES JUNTANDO MESES DE 12 PARA 3.
function distribuicaoTri(featurename){
  var distdataTrimestre=[];
  if(anoSelecionado!=undefined){
    database.forEach(function(d,i){
      if(trimestreSelecionado==1){
        if( d.Mês=='Jan'|| d.Mês=='Fev' || d.Mês=='Mar' ){
          if (d.name==featurename && d.Ano==anoSelecionado){
            distdataTrimestre.push(SomaDias(d));
          }
        }
      }else if(trimestreSelecionado==2){
        if( d.Mês=='Abr'|| d.Mês=='Mai' || d.Mês=='Jun' ){
          if (d.name==featurename && d.Ano==anoSelecionado){
            distdataTrimestre.push(SomaDias(d));
          }
        }
      }else if(trimestreSelecionado==3){
        if( d.Mês=='Jul'|| d.Mês=='Ago' || d.Mês=='Set' ){
          if (d.name==featurename && d.Ano==anoSelecionado){
            distdataTrimestre.push(SomaDias(d));
          }
        }
      }else{
        if( d.Mês=='Out'|| d.Mês=='Nov' || d.Mês=='Dez' ){
          if (d.name==featurename && d.Ano==anoSelecionado){
            distdataTrimestre.push(SomaDias(d));
          }
        }
      }
    });
  }else if(diaSelecionado!=undefined){
    database.forEach(function(d,i){
      if(trimestreSelecionado==1){
        if( d.Mês=='Jan'|| d.Mês=='Fev' || d.Mês=='Mar' ){
          if (d.name==featurename){
            distdataTrimestre.push(d[diaSelecionado]);
          }
        }
      }else if(trimestreSelecionado==2){
        if( d.Mês=='Abr'|| d.Mês=='Mai' || d.Mês=='Jun' ){
          if (d.name==featurename){
            distdataTrimestre.push(d[diaSelecionado]);
          }
        }
      }else if(trimestreSelecionado==3){
        if( d.Mês=='Jul'|| d.Mês=='Ago' || d.Mês=='Set' ){
          if (d.name==featurename){
            distdataTrimestre.push(d[diaSelecionado]);
          }
        }
      }else{
        if( d.Mês=='Out'|| d.Mês=='Nov' || d.Mês=='Dez' ){
          if (d.name==featurename){
            distdataTrimestre.push(d[diaSelecionado]);
          }
        }
      }
    });
    /*database.forEach(function(d,i){
      if (d.name==featurename && d.Mês==mesSelecionado){
          distdataTrimestre.push(SomaDias(d[diaSelecionado]));
      }
    });*/
  }else if(trimestreSelecionado!=undefined){
    database.forEach(function(d,i){
      if(trimestreSelecionado==1){
        if(d.Mês=='Jan'|| d.Mês=='Fev' || d.Mês=='Mar'){
          if (d.name==featurename){
            distdataTrimestre.push(SomaDias(d));
          }
        }
      }else if(trimestreSelecionado==2){
        if(d.Mês=='Abr'|| d.Mês=='Mai' || d.Mês=='Jun'){
          if (d.name==featurename){
            distdataTrimestre.push(SomaDias(d));
          }
        }
      }else if(trimestreSelecionado==3){
        if(d.Mês=='Jul'|| d.Mês=='Ago' || d.Mês=='Set'){
          if (d.name==featurename){
            distdataTrimestre.push(SomaDias(d));
          }
        }
      }else{
        if(d.Mês=='Out'|| d.Mês=='Nov' || d.Mês=='Dez'){
          if (d.name==featurename){
            distdataTrimestre.push(SomaDias(d));
          }
        }
      }
    });
  }else{
    database.forEach(function(d,i){
      if (d.name==featurename){
          distdataTrimestre.push(SomaDias(d));
      }
    });
  }
  return distdataTrimestre;
}
// PREPARA A DISTRUIBUICAO PARA MESES 12 POR ANO.
function distribuicaoMes(featurename){
  var distdataMes=[];
  if(anoSelecionado!=undefined){
    if (mesSelecionado==undefined) {
      database.forEach(function(d,i){
        if (d.name==featurename && d.Ano==anoSelecionado){
            distdataMes.push(SomaDias(d));
        }
      });  
    }else{
      database.forEach(function(d,i){
        if (d.name==featurename && d.Mês==mesSelecionado && d.Ano==anoSelecionado){
            distdataMes.push(SomaDias(d));
        }
      });
    }
  }else if(diaSelecionado!=undefined){
    database.forEach(function(d,i){
      if (d.name==featurename && d.Mês==mesSelecionado){
          distdataMes.push(SomaDias(d[diaSelecionado]));
      }
    });
  }else if(mesSelecionado!=undefined){
    database.forEach(function(d,i){
      if (d.name==featurename && d.Mês==mesSelecionado){
          distdataMes.push(SomaDias(d));
      }
    });
  }else{

    database.forEach(function(d,i){
      if(d.name==featurename){
          var m= SomaDias(d);
          distdataMes.push(Number(m.toFixed(2)));
      }
    });
  }
  return distdataMes;
}
// PREPARA A DISTRUIBUICAO DE DIAS PARA MESES DE 365 PARA 12 POR ANO.
function diasToArray(d){
  var diasArray=[];
  if(d.Mês=='Abr'||d.Mês=='Jun'||d.Mês=='Set'||d.Mês=='Nov'){
    for (var i = 1; i < 31; i++) {
      diasArray.push(d[i]);
    }
  }else if(d.Mês=='Fev'){
    for (var i = 1; i < 29; i++) {
      diasArray.push(d[i]);
    }
  }else{
    for (var i = 1; i < 32; i++) {
      diasArray.push(d[i]);
    }
  }
  return diasArray;
}
// PREPARA A DISTRUIBUICAO DE DIAS.
function distribuicaoDia(featurename){
  var distdataDia=[];
  if(anoSelecionado!=undefined){
    database.forEach(function(d,i){
      if (d.name==featurename && d.Ano==anoSelecionado){
        if(diaSelecionado==31){
          if(d.Mês=='Abr' || d.Mês=='Jun' || d.Mês=='Set' || d.Mês=='Nov' || d.Mês=='Fev'){

          }else{
            distdataDia.push(d[diaSelecionado]);
          }
        }else{
          distdataDia.push(d[diaSelecionado]);
        }
      }
    });
  }else if(trimestreSelecionado!=undefined){
    database.forEach(function(d,i){
      if(trimestreSelecionado==1 && d.name==featurename){
        if( d.Mês=='Jan'|| d.Mês=='Fev' || d.Mês=='Mar' ){
          if(diaSelecionado==31){
            if(d.Mês=='Abr' || d.Mês=='Jun' || d.Mês=='Set' || d.Mês=='Nov' || d.Mês=='Fev'){

            }else{
              distdataDia.push(d[diaSelecionado]);
            }
          }else{
            distdataDia.push(d[diaSelecionado]);
          }
        }
      }else if(trimestreSelecionado==2 && d.name==featurename){
        if( d.Mês=='Abr'|| d.Mês=='Mai' || d.Mês=='Jun' ){
          if(diaSelecionado==31){
            if(d.Mês=='Abr' || d.Mês=='Jun' || d.Mês=='Set' || d.Mês=='Nov' || d.Mês=='Fev'){

            }else{
              distdataDia.push(d[diaSelecionado]);
            }
          }else{
            distdataDia.push(d[diaSelecionado]);
          }
        }
      }else if(trimestreSelecionado==3 && d.name==featurename){
        if( d.Mês=='Jul'|| d.Mês=='Ago' || d.Mês=='Set' ){
          if(diaSelecionado==31){
            if(d.Mês=='Abr' || d.Mês=='Jun' || d.Mês=='Set' || d.Mês=='Nov' || d.Mês=='Fev'){

            }else{
              distdataDia.push(d[diaSelecionado]);
            }
          }else{
            distdataDia.push(d[diaSelecionado]);
          }
        }
      }else{
        if( d.Mês=='Out'|| d.Mês=='Nov' || d.Mês=='Dez' ){
          if (d.name==featurename){
            if(diaSelecionado==31){
              if(d.Mês=='Abr' || d.Mês=='Jun' || d.Mês=='Set' || d.Mês=='Nov' || d.Mês=='Fev'){

              }else{
                distdataDia.push(d[diaSelecionado]);
              }
            }else{
              distdataDia.push(d[diaSelecionado]);
            }
          }
        }
      }
    });
  }else if(mesSelecionado!=undefined){
    database.forEach(function(d,i){
      if (d.name==featurename && d.Mês==mesSelecionado){
        if(diaSelecionado==31){
          if(d.Mês=='Abr' || d.Mês=='Jun' || d.Mês=='Set' || d.Mês=='Nov' || d.Mês=='Fev'){

          }else{
            distdataDia.push(d[diaSelecionado]);
          }
        }else{
          distdataDia.push(d[diaSelecionado]);
        }
      }
    });
  }else if(diaSelecionado!=undefined){
    database.forEach(function(d,i){
      if (d.name==featurename) {
        if(diaSelecionado==31){
          if(d.Mês=='Abr' || d.Mês=='Jun' || d.Mês=='Set' || d.Mês=='Nov' || d.Mês=='Fev'){

          }else{
            distdataDia.push(d[diaSelecionado]);
          }
        }else{
          distdataDia.push(d[diaSelecionado]);
        }
      }
    });
  }else{
    database.forEach(function(d,i){
      if (d.name==featurename) {
        diasToArray(d).forEach(function(d,i){
          distdataDia.push(d);
        });
      }
    });
  }
  return distdataDia;
}
// PREPARA A DISTRUIBUICAO DE PONTOS PARA O MAP DE PONTOS.
function dotMapPrep(dist){
  var round=[];
  var uniqueArray;
  dist.forEach(function(d,i){
    round.push(Math.ceil(d/10)*10);
  });
  uniqueArray = round.filter(function(item, pos) {
      return round.indexOf(item) == pos;
  });
  var probs = {};
  round.forEach(function(x) {
    var num=(probs[x] || 0)+1;
    probs[x]=num;
  });
    for(var key in probs){
      probs[key] = probs[key] / round.length;
    }
  uniqueArray.forEach(function(d,i){
    uniqueArray[i]=[d,probs[d]];
  });
  return uniqueArray;
}
// PREPARA A INFORMAÇÃO DO MAPA COM BASE NO DATA SET E SE TIVER ALGUM FILTRO DE MES, TRIMESTRE, OU DIA ATIVADO.
function infoprops(props){
    if(featurename!=undefined){
      if(anoSelecionado!=undefined){
        if(mesSelecionado!=undefined){
          return '<h5>Informações com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+mesSelecionado+'/'+anoSelecionado+'.');
        }else if(trimestreSelecionado!=undefined){
          if(diaSelecionado!=undefined){
            return '<h5>Informações com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para os '+diaSelecionado+'ºs dias do '+trimestreSelecionado+'ºtrimestre/'+anoSelecionado+'.');
          }else{
            return '<h5>Informações com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para o '+trimestreSelecionado+'º trimestre de '+anoSelecionado+'.');
          }
        }else if(diaSelecionado!=undefined){
          return '<h5>Informações com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para os '+diaSelecionado+'ºs dias de '+anoSelecionado+'.');
        }else{
          return '<h5>Informações com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+anoSelecionado+'.');
        }
      }else if(trimestreSelecionado!=undefined){
        if(diaSelecionado!=undefined){
            return '<h5>Informações com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para os '+diaSelecionado+'ºs dias dos'+trimestreSelecionado+'º trimestres no período.');
        }else{
            return '<h5>Informações com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para os '+trimestreSelecionado+'ºs trimestres no período.');
        }
      }else if(mesSelecionado!=undefined){
        if(diaSelecionado!=undefined){
            return '<h5>Informações com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para os '+diaSelecionado+'ºs dias dos mês de'+mesSelecionado+' no período.');
        }else{
            return '<h5>Informações com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para os mês de '+mesSelecionado+' no período.');
        }
      }else if(diaSelecionado!==undefined){
            return '<h5>Informações com base em '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para os '+diaSelecionado+'ºs dias dos mês no período.');
      }else{
          return '<h4> Informações com base em '+featurename+'.</h4>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores referentes a todo o período.');
      }
    }else{
      if(anoSelecionado!=undefined){

        if(mesSelecionado!=undefined){
          return '<h5>Informações com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+mesSelecionado+'/'+anoSelecionado+'.');
        }else if(trimestreSelecionado!=undefined){
          if(diaSelecionado!=undefined){
            return '<h5>Informações com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para os '+diaSelecionado+'ºs dias do '+trimestreSelecionado+'ºtrimestre/'+anoSelecionado+'.');
          }else{
            return '<h5>Informações com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para o '+trimestreSelecionado+'º trimestre de '+anoSelecionado+'.');
          }
        }else if(diaSelecionado!=undefined){
          return '<h5>Informações com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para os '+diaSelecionado+'ºs dias de '+anoSelecionado+'.');
        }else{
          return '<h5>Informações com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+anoSelecionado+'.');
        }

      }else if(trimestreSelecionado!=undefined){
        if(diaSelecionado!=undefined){
            return '<h5>Informações com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para os '+diaSelecionado+'ºs dias dos'+trimestreSelecionado+'º trimestres no período.');
        }else{
            return '<h5>Informações com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para os '+trimestreSelecionado+'ºs trimestres no período.');
        }
      }else if(mesSelecionado!=undefined){
        if(diaSelecionado!=undefined){
            return '<h5>Informações com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para os '+diaSelecionado+'ºs dias dos mês de'+mesSelecionado+' no período.');
        }else{
            return '<h5>Informações com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para o mês de '+mesSelecionado+' no período.');
        }
      }else if(diaSelecionado!==undefined){
            return '<h5>Informações com base em PE.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para os '+diaSelecionado+'ºs dias dos mês no período.');
      }else{
          return '<h4> Informações gerais.</h4>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores referentes a todo o período.');
      }
    }
}
// DESTACA O LAYER DE UM POLIGONO NOS MAPAS
function highlightFeature(e) {
  var layer = e.target;
  layer.setStyle({
    weight: 1.5,
    color: 'black',
    fillOpacity: 0.7
  });
  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}
function resetHighlight(e) {
  GeoLayer.resetStyle(e.target);
}
// PREPARA A DISTRUIBUICAO DE ACORDO COM OS FILTROS ATIVADOS.
function getDis(featurename){
  if(anoSelecionado!=undefined){
    var dist= distribuicaoAno(featurename);
  }else if(trimestreSelecionado!=undefined){
    var dist= distribuicaoTri(featurename);
  }else if(mesSelecionado!=undefined){
    var dist= distribuicaoMes(featurename);
  }else if(diaSelecionado!=undefined){
    var dist= distribuicaoDia(featurename);
  }else{
    var dist= distribuicaoMes(featurename);
  }
  return dist;
}
function getDis2(featurename){
  if(trimestreSelecionado!=undefined){
    var dist= distribuicaoTri(featurename);
  }else if(mesSelecionado!=undefined){
    var dist= distribuicaoMes(featurename);
  }else if(diaSelecionado!=undefined){
    var dist= distribuicaoDia(featurename);
  }else{
    var dist= distribuicaoMes(featurename);
  }
  return dist;
};

function legendonAdd(map) {
  var div = L.DomUtil.create('div', 'info legend');
  for (var i = (grades.length-1); i >=0 ; i--) {
    div.innerHTML +='<i style="color:'+colorN(grades[i])+'; background:'+colorN(grades[i])+'"></i>'+">"+grades[i]+'</br>';
  }
  return div;
};

//ESCALA DE CORES PARA O MAPA DE PONTOS
function colorD(media){
  var cbf = palette('cb-BuGn', 9);
  //var cbf = palette('cb-BrBG', 11);
  var color;
  gradesDot.forEach(function(d,i){
    if(Number(media)>=d){
      color="#"+cbf[i];
    }
  });
  return color;
}
function colorR(prob){
    var cbf = palette('cb-BuGn', 9);
    var color;
    gradesR.forEach(function(d,i){
	if(Number(prob)>=d){
	    color=cbf[i];
	}
    });
    return color;

}
//ESCALA DE CORES PARA PROBABILIDADE
function colorN(d){
  var cbf = palette('cb-BrBG', 11);
  cbf.reverse();
  if(d>=1.0){
    cor= cbf[10];   
  }else if (d>=0.9) {
    cor= cbf[9];  
  }else if(d>=0.8){
    cor= cbf[8];  
  }else if(d>=0.7){
    cor= cbf[7];  
  }else if(d>=0.6){
    cor= cbf[6];  
  }else if(d>=0.5){
    cor= cbf[5];  
  }else if(d>=0.4){
    cor= cbf[4];  
  }else if(d>=0.3){
    cor= cbf[3];  
  }else if(d>=0.2){
    cor= cbf[2];  
  }else if (d>=0.1) {
    cor= cbf[1];  
  }else{
    cor= cbf[0];  
  }
  return cor;
}
//ESCALA DE CORES PARA O MAPA DE MÉDIA
function colorM(media){
  var cbf = palette('cb-BuGn', 9);
  var color;
  grades.forEach(function(d,i){
    if(Number(media)>=d){
      color="#"+cbf[i];
    }
  });
  return color;
}
//COMPARA DOIS ARRAYS DE DISTRUIBUIÇÕES IGUAIS E RETORNA A PROBABILIDADE DO PRIMEIRO SER MENOR QUE O SEGUNDO.
function cmp(dist1,dist2){
  var count=0;
  dist1.forEach(function(d,i){
    if(dist1[i]>dist2[i]){
      count++;
    }
  });
  return (count/dist1.length);
}
// ALTERA A ORDEM DE OBJETOS EM UM ARRAY DE MODO ALEATÓRIO
function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
  }
  return array;
}

// ENCONTRA UM OBJETO DENTRO DE UM ARRAY POR UMA CHAVE ID.
function findP(array,id){
  var p;
  array.forEach(function(d,i){
    if(d.id==id){
      p=d;
    }
  });
  return p;
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ESSA FUNÇÃO EMBARALHA AS PERGUNTAS CONTIDAS NO ARRAY DE PERGUNTAS E PREENCHE AUTOMATICAMENTO O HTML COM A NOVA ORDEM.
function geraperguntas(perguntas,index,vis){
  var d1= document.createElement("div");
  var d2= document.createElement("div");
  d2.setAttribute('class','card');
  var pergunta= perguntas[index];
  var label = document.createElement("label");//label antes com a pergunta
  label.setAttribute('style',"font-weight:bold;");
  label.setAttribute('for',"pergunta1");
  label.setAttribute('id',"pergunta1");
  label.innerText= pergunta.question_text//[0];//"Pergunta 1 ?";
  var select = document.createElement("select");
  select.setAttribute('id',""+pergunta.id+vis);
  select.setAttribute('name',"pergunta"+pergunta.id+vis);
  select.setAttribute('class',"form-control");
  select.required=true;
  var opt= document.createElement("option");
  opt.value='';
  opt.disabled=true;
  opt.selected=true;
  opt.innerHTML = 'Escolha um';
  select.appendChild(opt);
  var nQ=pergunta.id;
  if (nQ!='004C'&&nQ!='011C'&&nQ!='012C'&&nQ!='017T'&&nQ!='024T'&&nQ!='025T') {
      var div1 = document.createElement("div");
      div1.setAttribute('class','col-sm-3 col-md-3 col-lg-3 col-xl-3');

      var input1= document.createElement("input");
      input1.setAttribute('type','hidden');
      input1.setAttribute('class','clicks');
      input1.setAttribute('id','CLC'+pergunta.id+vis);
      input1.setAttribute('name','CLC'+pergunta.id+vis);
      input1.setAttribute('value','');

      var input2= document.createElement("input");
      input2.setAttribute('type','hidden');
      input2.setAttribute('class','tempo');
      input2.setAttribute('id','TMP'+pergunta.id+vis);
      input2.setAttribute('name','TMP'+pergunta.id+vis);
      input2.setAttribute('value','');

      var inputR= document.createElement("input");
      inputR.setAttribute('type','hidden');
      inputR.setAttribute('id','ANS'+pergunta.id+vis);
      inputR.setAttribute('name','ANS'+pergunta.id+vis);
      inputR.setAttribute('value',''+pergunta.answer);

      if(pergunta.size.length>0){
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id+vis);
        inputS.setAttribute('name','CDC'+pergunta.id+vis);
        inputS.setAttribute('value','SIZE:'+pergunta.size);
      }else if(pergunta.variance.length>0){
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id+vis);
        inputS.setAttribute('name','CDC'+pergunta.id+vis);
        inputS.setAttribute('value','VARIANCE:'+pergunta.variance);
      }else if(pergunta.distance.length>0){
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id+vis);
        inputS.setAttribute('name','CDC'+pergunta.id+vis);
        inputS.setAttribute('value','DISTANCE:'+pergunta.distance);
      }else{
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id+vis);
        inputS.setAttribute('name','CDC'+pergunta.id+vis);
        inputS.setAttribute('value','');
      }

      var label2 = document.createElement("label");
      label2.setAttribute('for','CNFC'+pergunta.id+vis);
      label2.setAttribute('style',"font-weight:bold;");
      label2.innerText='De 1 a 5 sendo 1 pouco confiante e 5 muito confiante, quão confiante você está da sua resposta?';

      var input3= document.createElement("input");
      input3.setAttribute('type','text');
      input3.setAttribute('class','ioRangerSlider');
      input3.setAttribute('id','CNFC'+pergunta.id+vis);
      input3.setAttribute('name','CNFC'+pergunta.id+vis);
      input3.setAttribute('value','');
      input3.required=true;

      var input8= document.createElement("input");
      input8.setAttribute('type','text');
      input8.setAttribute('id',""+pergunta.id+vis);
      input8.setAttribute('name',"pergunta"+pergunta.id+vis);
      input8.setAttribute('class','form-control');
      input8.setAttribute('value','');
      if(pergunta.id=="004C"||pergunta.id=="011C"||pergunta.id=="012C"||pergunta.id=="017T"||pergunta.id=="024T"||pergunta.id=="025T"){
        input8.setAttribute('placeholder','Ex: Caruaru');
      }else if(pergunta.id=="026T"){
        input8.setAttribute('placeholder','Ex: 15000');
      }else{
        input8.setAttribute('placeholder','Ex: 50');
      }
      input8.required=true;
        var input4= document.createElement("div");
        var input7= document.createElement("br");
        var input6= document.createElement("p");
        input4.setAttribute('class','invalid-feedback');
        input6.innerText='Informe um valor.';
        input4.appendChild(input7);
        input4.appendChild(input6);
      div1.appendChild(input8);
      div1.appendChild(input4);
      d2.appendChild(label);
      d1.appendChild(div1);
      d2.appendChild(d1);
  }else{
    for (var i = 0; i < pergunta.op.length; i++) {
      var div1 = document.createElement("div");
      div1.setAttribute('class',"form-group col-sm-3 col-md-3 col-lg-3 col-xl-3");
      var input1= document.createElement("input");
      input1.setAttribute('type','hidden');
      input1.setAttribute('class','clicks');
      input1.setAttribute('id','CLC'+pergunta.id+vis);
      input1.setAttribute('name','CLC'+pergunta.id+vis);
      input1.setAttribute('value','');

      var input2= document.createElement("input");
      input2.setAttribute('type','hidden');
      input2.setAttribute('class','tempo');
      input2.setAttribute('id','TMP'+pergunta.id+vis);
      input2.setAttribute('name','TMP'+pergunta.id+vis);
      input2.setAttribute('value','');

      var inputR= document.createElement("input");
      inputR.setAttribute('type','hidden');
      inputR.setAttribute('id','ANS'+pergunta.id+vis);
      inputR.setAttribute('name','ANS'+pergunta.id+vis);
      inputR.setAttribute('value',''+pergunta.answer);

      if(pergunta.size.length>0){
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id+vis);
        inputS.setAttribute('name','CDC'+pergunta.id+vis);
        inputS.setAttribute('value','SIZE:'+pergunta.size);
      }else if(pergunta.variance.length>0){
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id+vis);
        inputS.setAttribute('name','CDC'+pergunta.id+vis);
        inputS.setAttribute('value','VARIANCE:'+pergunta.variance);
      }else if(pergunta.distance.length>0){
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id+vis);
        inputS.setAttribute('name','CDC'+pergunta.id+vis);
        inputS.setAttribute('value','DISTANCE:'+pergunta.distance);
      }else{
        var inputS= document.createElement("input");
        inputS.setAttribute('type','hidden');
        inputS.setAttribute('id','CDC'+pergunta.id+vis);
        inputS.setAttribute('name','CDC'+pergunta.id+vis);
        inputS.setAttribute('value','');
      }

      var label2 = document.createElement("label");
      label2.setAttribute('for','CNFC'+pergunta.id+vis);
      label2.setAttribute('style',"font-weight:bold;");
      label2.innerText='De 1 a 5 sendo 1 pouco confiante e 5 muito confiante, quão confiante você está da sua resposta?';

      var input3= document.createElement("input");
      input3.setAttribute('type','text');
      input3.setAttribute('class','ioRangerSlider');
      input3.setAttribute('id','CNFC'+pergunta.id+vis);
      input3.setAttribute('name','CNFC'+pergunta.id+vis);
      input3.setAttribute('value','');
      input3.required=true;
      var option= document.createElement("option");
      option.value = pergunta.op[i];
      option.innerHTML = pergunta.op[i];
      select.appendChild(option);
      if(i==pergunta.op.length-1){
        var input4= document.createElement("div");
        var input7= document.createElement("br");
        var input6= document.createElement("p");
        input4.setAttribute('class','invalid-feedback');
        input6.innerText='Você precisa escolher um.';
        input4.appendChild(input7);
        input4.appendChild(input6);
        div1.appendChild(select);
        div1.appendChild(input4);
        d2.appendChild(label);
        d1.appendChild(div1);
        d2.appendChild(d1);
      }
    }
  }
  d2.appendChild(label2);
  d2.appendChild(input3);
  var input5= document.createElement("div");
  input5.setAttribute('class','invalid-feedback');
  input5.innerText='Você precisa escolher um';
  d2.appendChild(input5);
  d2.appendChild(input1);
  d2.appendChild(input2);
  d2.appendChild(inputR);
  d2.appendChild(inputS);
  return d2;
}
// QUANDO O RECPATHCA É COMPLETADO SUBMETE OS FORMS.
function recaptcha_callback(){
  tempofinal= new Date();
  duracaoPerguntas= tempofinal-tempotutorial;
  duracaoPerguntas=math.round(((duracaoPerguntas/1000)/60)*100)/100;

  duracao= tempofinal-tempoinicial;
  duracao=math.round(((duracao/1000)/60)*100)/100;
  $('#duracaototal').val(duracao);
  $('#duracaotutorial').val(duracaotutorial);
  $('#duracaoperguntas').val(duracaoPerguntas);
  
  $('#5Form').submit();
  $('#feedback').val($('#feedback2').val());
  $('#ordem').val(arr.join());
  $('#2Form').submit();
  $('#vis').css('display','none');
  $('#footer').css('display','');
  //$('#Form').submit();
  //$('#3Form').submit();
  //$('#4Form').submit();
  //$('#captchaError').hide();
}

function StartHOPS(){
  hops=true;
}
function StopHOPS(){
  hops=false;
}

function infopropsTaxi(props){
    if(featurename!=undefined){
      if(anoSelecionado!=undefined){
        if(mesSelecionado!=undefined){
          return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+mesSelecionado+'/'+anoSelecionado+'.');
        }else if(trimestreSelecionado!=undefined){
          if(diaSelecionado!=undefined){
            return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+diaSelecionado+' dias de '+trimestreSelecionado+'ºtrimestre/'+anoSelecionado+'.');
          }else{
            return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para o '+trimestreSelecionado+'º trimestre de '+anoSelecionado+'.');
          }
        }else if(diaSelecionado!=undefined){
          return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+diaSelecionado+' dias de '+anoSelecionado+'.');
        }else{
          return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+anoSelecionado+'.');
        }
      }else if(trimestreSelecionado!=undefined){
        if(diaSelecionado!=undefined){
            return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+diaSelecionado+' dias de'+trimestreSelecionado+'º trimestre no período.');
        }else{
            return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+trimestreSelecionado+' trimestre no período.');
        }
      }else if(mesSelecionado!=undefined){
        if(diaSelecionado!=undefined){
            return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+diaSelecionado+' dias de o mês de'+mesSelecionado+' no período.');
        }else{
            return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para mês de '+mesSelecionado+' no período.');
        }
      }else if(diaSelecionado!==undefined){
            return '<h5>Information based on '+featurename+'.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+diaSelecionado+' dias do mês no período.');
      }else{
          return '<h4> Information based on '+featurename+'.</h4>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores referentes a todo o período.');
      }
    }else{
      if(anoSelecionado!=undefined){

        if(mesSelecionado!=undefined){
          return '<h5>Informações baseadas na ilha de Manhattan - Nova York / EUA.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+mesSelecionado+'/'+anoSelecionado+'.');
        }else if(trimestreSelecionado!=undefined){
          if(diaSelecionado!=undefined){
            return '<h5>Informações baseadas na ilha de Manhattan - Nova York / EUA.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+diaSelecionado+' dias de '+trimestreSelecionado+'ºtrimestre/'+anoSelecionado+'.');
          }else{
            return '<h5>Informações baseadas na ilha de Manhattan - Nova York / EUA.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para o '+trimestreSelecionado+'º trimestre de '+anoSelecionado+'.');
          }
        }else if(diaSelecionado!=undefined){
          return '<h5>Informações baseadas na ilha de Manhattan - Nova York / EUA.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+diaSelecionado+' dias de '+anoSelecionado+'.');
        }else{
          return '<h5>Informações baseadas na ilha de Manhattan - Nova York / EUA.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+anoSelecionado+'.');
        }

      }else if(trimestreSelecionado!=undefined){
        if(diaSelecionado!=undefined){
            return '<h5>Informações baseadas na ilha de Manhattan - Nova York / EUA.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+diaSelecionado+' dias de'+trimestreSelecionado+'º trimestre no período.');
        }else{
            return '<h5>Informações baseadas na ilha de Manhattan - Nova York / EUA.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+trimestreSelecionado+' trimestre no período.');
        }
      }else if(mesSelecionado!=undefined){
        if(diaSelecionado!=undefined){
            return '<h5>Informações baseadas na ilha de Manhattan - Nova York / EUA.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+diaSelecionado+' dias de o mês de'+mesSelecionado+' no período.');
        }else{
            return '<h5>Informações baseadas na ilha de Manhattan - Nova York / EUA.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para o mês de '+mesSelecionado+' no período.');
        }
      }else if(diaSelecionado!==undefined){
            return '<h5>Informações baseadas na ilha de Manhattan - Nova York / EUA.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para '+diaSelecionado+' dias do mês no período.');
      }else{
          return '<h4> Informações baseadas na ilha de Manhattan - Nova York / EUA.</h4>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Valores para todo o período.');
      }
    }
}
//QUANDO INVOCADA ESSA FUNÇÃO COMPARA UMA AREA COM AS DEMAIS PARA TECNICA DE INTERVALO.
function whenClicked(e) {
  $('#slidert').addClass("disabledslider");
  comparando(e);              
}

function whenClicked_distance_far(e) {
  $('#div_slider_distance_far').addClass("disabledslider");
  comparando_distance_far(e);              
}

function whenClicked_distance_near(e) {
  $('#div_slider_distance_near').addClass("disabledslider");
  comparando_distance_near(e);              
}

function whenClicked_size_large(e) {
  $('#div_slider_size_large').addClass("disabledslider");
  comparando_size_large(e);              
}

function whenClicked_size_small(e) {
  $('#div_slider_size_small').addClass("disabledslider");
  comparando_size_small(e);              
}

function whenClicked_variance_large(e) {
  $('#div_slider_variance_large').addClass("disabledslider");
  comparando_variance_large(e);              
}

function whenClicked_variance_small(e) {
  $('#slider_variance_small').addClass("disabledslider");
  comparando_variance_small(e);              
}

function whenClickedC(e) {
  $('#sliderc').addClass("disabledslider");
  comparandoC(e);              
}
function whenClickedT(e) {
  $('#slidertx').addClass("disabledslider");
  comparandoT(e);              
}
var size,distance,variance_large,variance_small;
function compare(dataset){
  var probab= cmp(distribuicaoSin(dataset[0].properties.id,dist_distance),distribuicaoSin(dataset[1].properties.id,dist_distance));

  infoVis02.remove();
  if(layerTuto2!= null){
      layerTuto2.clearLayers();
  }
  layerTuto2 =L.geoJson(dataset,
    {style: function(feature){
        if(opcoes.includes(feature.properties.id)){
          if(opcoes[0]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };            
            }
          }else if(opcoes[1]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };            
            }           
          }
        }else{
          if(dataset[0].properties.id==feature.properties.id){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };
          }else{
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(1-probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };            
          }
        }
    },
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          if(dataset[0].properties.id==feature.properties.id){
            var total=probab;
          }else{
            var total=1-probab;
          }
        layer.bindPopup(""+feature.properties.id+": "+Math.round(total*100)+"%");
        layer.on({
          dblclick: whenClicked
        });
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            layerTuto2.resetStyle(e.target);
            this.closePopup();
        });
      }
  }).addTo(mapVis02);
  infoVis02.update = function (props) {
      this._div.innerHTML= infoprops(props);
  };
  infoVis02.addTo(mapVis02);
}

function compare_distance_far(dataset){
  var probab= cmp(distribuicaoSin(dataset[0].properties.id,dist_distance),distribuicaoSin(dataset[1].properties.id,dist_distance));

  info_distance_far.remove();
  if(layer_distance_far!= null){
      layer_distance_far.clearLayers();
  }
  layer_distance_far =L.geoJson(dataset,
    {style: function(feature){
        if(opcoes.includes(feature.properties.id)){
          if(opcoes[0]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };            
            }
          }else if(opcoes[1]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };            
            }           
          }
        }else{
          if(dataset[0].properties.id==feature.properties.id){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };
          }else{
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(1-probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };            
          }
        }
    },
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          if(dataset[0].properties.id==feature.properties.id){
            var total=probab;
          }else{
            var total=1-probab;
          }
        layer.bindPopup(""+feature.properties.id+": "+Math.round(total*100)+"%");
        layer.on({
          dblclick: whenClicked_distance_far
        });
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            layer_distance_far.resetStyle(e.target);
            this.closePopup();
        });
      }
  }).addTo(vis_distance_far);
  info_distance_far.update = function (props) {
      this._div.innerHTML= infoprops(props);
  };
  info_distance_far.addTo(vis_distance_far);
}

function compare_distance_near(dataset){
  var probab= cmp(distribuicaoSin(dataset[0].properties.id,dist_distance),distribuicaoSin(dataset[1].properties.id,dist_distance));

  info_distance_near.remove();
  if(layer_distance_near!= null){
      layer_distance_near.clearLayers();
  }
  layer_distance_near =L.geoJson(dataset,
    {style: function(feature){
        if(opcoes.includes(feature.properties.id)){
          if(opcoes[0]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };            
            }
          }else if(opcoes[1]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };            
            }           
          }
        }else{
          if(dataset[0].properties.id==feature.properties.id){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };
          }else{
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(1-probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };            
          }
        }
    },
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          if(dataset[0].properties.id==feature.properties.id){
            var total=probab;
          }else{
            var total=1-probab;
          }
        layer.bindPopup(""+feature.properties.id+": "+Math.round(total*100)+"%");
        layer.on({
          dblclick: whenClicked_distance_near
        });
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            layer_distance_near.resetStyle(e.target);
            this.closePopup();
        });
      }
  }).addTo(vis_distance_near);
  info_distance_near.update = function (props) {
      this._div.innerHTML= infoprops(props);
  };
  info_distance_near.addTo(vis_distance_near);
}

function compare_size_large(dataset){
  var probab= cmp(distribuicaoSin(dataset[0].properties.id,dist_size),distribuicaoSin(dataset[1].properties.id,dist_size));

  info_size_large.remove();
  if(layer_size_large!= null){
      layer_size_large.clearLayers();
  }
  layer_size_large =L.geoJson(dataset,
    {style: function(feature){
        if(opcoes.includes(feature.properties.id)){
          if(opcoes[0]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };            
            }
          }else if(opcoes[1]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };            
            }           
          }
        }else{
          if(dataset[0].properties.id==feature.properties.id){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };
          }else{
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(1-probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };            
          }
        }
    },
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          if(dataset[0].properties.id==feature.properties.id){
            var total=probab;
          }else{
            var total=1-probab;
          }
        layer.bindPopup(""+feature.properties.id+": "+Math.round(total*100)+"%");
        layer.on({
          dblclick: whenClicked_size_large
        });
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            layer_size_large.resetStyle(e.target);
            this.closePopup();
        });
      }
  }).addTo(vis_size_large);
  info_size_large.update = function (props) {
      this._div.innerHTML= infoprops(props);
  };
  info_size_large.addTo(vis_size_large);
}

function compare_size_small(dataset){
  var probab= cmp(distribuicaoSin(dataset[0].properties.id,dist_size),distribuicaoSin(dataset[1].properties.id,dist_size));

  info_size_small.remove();
  if(layer_size_small!= null){
      layer_size_small.clearLayers();
  }
  layer_size_small =L.geoJson(dataset,
    {style: function(feature){
        if(opcoes.includes(feature.properties.id)){
          if(opcoes[0]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };            
            }
          }else if(opcoes[1]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };            
            }           
          }
        }else{
          if(dataset[0].properties.id==feature.properties.id){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };
          }else{
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(1-probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };            
          }
        }
    },
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          if(dataset[0].properties.id==feature.properties.id){
            var total=probab;
          }else{
            var total=1-probab;
          }
        layer.bindPopup(""+feature.properties.id+": "+Math.round(total*100)+"%");
        layer.on({
          dblclick: whenClicked_size_small
        });
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            layer_size_small.resetStyle(e.target);
            this.closePopup();
        });
      }
  }).addTo(vis_size_small);
  info_size_small.update = function (props) {
      this._div.innerHTML= infoprops(props);
  };
  info_size_small.addTo(vis_size_small);
}

function compare_variance_small(dataset){
  var probab= cmp(distribuicaoSin(dataset[0].properties.id,dist_variance_small),distribuicaoSin(dataset[1].properties.id,dist_variance_small));

  info_variance_small.remove();
  if(layer_variance_small!= null){
      layer_variance_small.clearLayers();
  }
  layer_variance_small =L.geoJson(dataset,
    {style: function(feature){
        if(opcoes.includes(feature.properties.id)){
          if(opcoes[0]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };            
            }
          }else if(opcoes[1]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };            
            }           
          }
        }else{
          if(dataset[0].properties.id==feature.properties.id){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };
          }else{
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(1-probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };            
          }
        }
    },
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          if(dataset[0].properties.id==feature.properties.id){
            var total=probab;
          }else{
            var total=1-probab;
          }
        layer.bindPopup(""+feature.properties.id+": "+Math.round(total*100)+"%");
        layer.on({
          dblclick: whenClicked_variance_small
        });
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            layer_variance_small.resetStyle(e.target);
            this.closePopup();
        });
      }
  }).addTo(vis_variance_small);
  info_variance_small.update = function (props) {
      this._div.innerHTML= infoprops(props);
  };
  info_variance_small.addTo(vis_variance_small);
}

function compare_variance_large(dataset){
  var probab= cmp(distribuicaoSin(dataset[0].properties.id,dist_variance_large),distribuicaoSin(dataset[1].properties.id,dist_variance_large));

  info_variance_large.remove();
  if(layer_variance_large!= null){
      layer_variance_large.clearLayers();
  }
  layer_variance_large =L.geoJson(dataset,
    {style: function(feature){
        if(opcoes.includes(feature.properties.id)){
          if(opcoes[0]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };            
            }
          }else if(opcoes[1]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };            
            }           
          }
        }else{
          if(dataset[0].properties.id==feature.properties.id){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };
          }else{
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(1-probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };            
          }
        }
    },
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          if(dataset[0].properties.id==feature.properties.id){
            var total=probab;
          }else{
            var total=1-probab;
          }
        layer.bindPopup(""+feature.properties.id+": "+Math.round(total*100)+"%");
        layer.on({
          dblclick: whenClicked_variance_large
        });
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            layer_variance_large.resetStyle(e.target);
            this.closePopup();
        });
      }
  }).addTo(vis_variance_large);
  info_variance_large.update = function (props) {
      this._div.innerHTML= infoprops(props);
  };
  info_variance_large.addTo(vis_variance_large);
}

function compareTodos(newdata,dataset){
  infoVis02.remove();
  if(layerTuto2!= null){
      layerTuto2.clearLayers();
  }
  layerTuto2 =L.geoJson(distance_near_geodata,
    {style: function(feature){
      //debugger;
        var probab= cmp(distribuicaoSin(newdata[0].properties.id,distance_near_geodata),distribuicaoSin(feature.properties.id,distance_near_geodata));
        if(newdata[0].properties.id==feature.properties.id){
          probab=probab;
        }else{
          probab=1-probab;
        }
        if(opcoes.includes(feature.properties.id)){
          if(opcoes[0]==feature.properties.id){
            if(newdata[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "black",
                dashArray: '3',
                fillOpacity: 1.0,
                color: '#c51b7d'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };            
            }
          }else if(opcoes[1]==feature.properties.id){
            if(newdata[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "black",
                dashArray: '3',
                fillOpacity: 1.0,
                color: '#053061'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };            
            }           
          }
        }else{
          if(newdata[0].properties.id==feature.properties.id){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "black",
              dashArray: '3',
              fillOpacity: 1.0,
              color: 'black'
            };
          }else{
            return {
              weight: 0.5,
              opacity: 1,
              fillColor: "#"+colorR(probab),
              fillOpacity: 0.9,
              color: 'black'
            };            
          }
        }
    },
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        var probab= cmp(distribuicaoSin(newdata[0].properties.id,distance_near_geodata),distribuicaoSin(feature.properties.id,distance_near_geodata));
          if(newdata[0].properties.id==feature.properties.id){
            var total=probab;
            layer.bindPopup(feature.properties.id+" escolhida para comparar com as outras");
          }else{
            var total=1-probab;
            layer.bindPopup(""+feature.properties.id+": "+Math.round(total*100)+"%");
          }
        layer.on({
          dblclick: whenClicked
        });
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            layerTuto2.resetStyle(e.target);
            this.closePopup();
        });
      }
  }).addTo(mapVis02);
  infoVis02.update = function (props) {
      this._div.innerHTML= infoprops(props);
  };
  infoVis02.addTo(mapVis02);
}
function compareC(dataset){
  var probab= cmp(distribuicaoSin(dataset[0].properties.id,distribuicao),distribuicaoSin(dataset[1].properties.id,distribuicao));

  infoRange.remove();
  if(LayerRange!= null){
      LayerRange.clearLayers();
  }

  layer_distance_far=L.geoJson(distance_far_geodata,
    {style: function(feature){
        if(opcoes.includes(feature.properties.id)){
          if(opcoes[0]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };            
            }
          }else if(opcoes[1]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };            
            }           
          }
        }else{
          if(dataset[0].properties.id==feature.properties.id){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };
          }else{
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(1-probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };            
          }
        }
    },
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          if(dataset[0].properties.id==feature.properties.id){
            var total=probab;
          }else{
            var total=1-probab;
          }
        layer.bindPopup(""+feature.properties.id+": "+Math.round(total*100)+"%");
        layer.on({
          dblclick: whenClicked
        });
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            layerTuto2.resetStyle(e.target);
            this.closePopup();
        });
      }
  });
  layer_distance_near=L.geoJson(distance_near_geodata,
    {style: function(feature){
        if(opcoes.includes(feature.properties.id)){
          if(opcoes[0]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };            
            }
          }else if(opcoes[1]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };            
            }           
          }
        }else{
          if(dataset[0].properties.id==feature.properties.id){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };
          }else{
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(1-probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };            
          }
        }
    },
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          if(dataset[0].properties.id==feature.properties.id){
            var total=probab;
          }else{
            var total=1-probab;
          }
        layer.bindPopup(""+feature.properties.id+": "+Math.round(total*100)+"%");
        layer.on({
          dblclick: whenClicked
        });
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            layerTuto2.resetStyle(e.target);
            this.closePopup();
        });
      }
  });
  layer_size_small=L.geoJson(size_small_geodata,
    {style: function(feature){
        if(opcoes.includes(feature.properties.id)){
          if(opcoes[0]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };            
            }
          }else if(opcoes[1]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };            
            }           
          }
        }else{
          if(dataset[0].properties.id==feature.properties.id){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };
          }else{
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(1-probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };            
          }
        }
    },
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          if(dataset[0].properties.id==feature.properties.id){
            var total=probab;
          }else{
            var total=1-probab;
          }
        layer.bindPopup(""+feature.properties.id+": "+Math.round(total*100)+"%");
        layer.on({
          dblclick: whenClicked
        });
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            layerTuto2.resetStyle(e.target);
            this.closePopup();
        });
      }
  });
  layer_size_large=L.geoJson(size_large_geodata,
    {style: function(feature){
        if(opcoes.includes(feature.properties.id)){
          if(opcoes[0]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };            
            }
          }else if(opcoes[1]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };            
            }           
          }
        }else{
          if(dataset[0].properties.id==feature.properties.id){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };
          }else{
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(1-probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };            
          }
        }
    },
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          if(dataset[0].properties.id==feature.properties.id){
            var total=probab;
          }else{
            var total=1-probab;
          }
        layer.bindPopup(""+feature.properties.id+": "+Math.round(total*100)+"%");
        layer.on({
          dblclick: whenClicked
        });
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            layerTuto2.resetStyle(e.target);
            this.closePopup();
        });
      }
  });
  layer_variance_large=L.geoJson(variance_geodata,
    {style: function(feature){
        if(opcoes.includes(feature.properties.id)){
          if(opcoes[0]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };            
            }
          }else if(opcoes[1]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };            
            }           
          }
        }else{
          if(dataset[0].properties.id==feature.properties.id){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };
          }else{
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(1-probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };            
          }
        }
    },
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          if(dataset[0].properties.id==feature.properties.id){
            var total=probab;
          }else{
            var total=1-probab;
          }
        layer.bindPopup(""+feature.properties.id+": "+Math.round(total*100)+"%");
        layer.on({
          dblclick: whenClicked
        });
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            layerTuto2.resetStyle(e.target);
            this.closePopup();
        });
      }
  });
  layer_variance_small=L.geoJson(variance_geodata,
    {style: function(feature){
        if(opcoes.includes(feature.properties.id)){
          if(opcoes[0]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };            
            }
          }else if(opcoes[1]==feature.properties.id){
            if(dataset[0].properties.id==feature.properties.id){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };            
            }           
          }
        }else{
          if(dataset[0].properties.id==feature.properties.id){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };
          }else{
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(1-probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };            
          }
        }
    },
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          if(dataset[0].properties.id==feature.properties.id){
            var total=probab;
          }else{
            var total=1-probab;
          }
        layer.bindPopup(""+feature.properties.id+": "+Math.round(total*100)+"%");
        layer.on({
          dblclick: whenClicked
        });
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            layerTuto2.resetStyle(e.target);
            this.closePopup();
        });
      }
  });
          layer_distance_far.clearLayers();
          layer_distance_near.clearLayers();
          layer_size_small.clearLayers();
          layer_size_large.clearLayers();
          layer_variance_small.clearLayers();
          layer_variance_large.clearLayers();
          if(base=='A'){
            layer_distance_far.addData(distance_far_geodata);
            layer_distance_far.addTo(mapRange);
          }else if(base=='B'){
            layer_distance_near.addData(distance_near_geodata);
            layer_distance_near.addTo(mapRange);
          }else if(base=='C'){
            layer_size_small.addData(size_small_geodata);
            layer_size_small.addTo(mapRange);
          }else if(base=='D'){
            layer_size_large.addData(size_large_geodata);
            layer_size_large.addTo(mapRange);
          }else if(base=='E'){
            layer_variance_small.addData(variance_geodata);
            layer_variance_small.addTo(mapRange);
          }else if(base=='F'){
            layer_variance_large.addData(variance_geodata);
            layer_variance_large.addTo(mapRange);
          }  
  infoRange.update = function (props) {
    this._div.innerHTML= infoprops(props);
  };
  infoRange.addTo(mapRange);
}
function compareTodosC(newdata,dataset){
  infoRange.remove();
  if(LayerRange!= null){
      LayerRange.clearLayers();
  }
  LayerRange =L.geoJson(dataset,
    {style: function(feature){
        var probab= cmp(getDis(newdata[0].properties.name),getDis(feature.properties.name));
        if(newdata[0].properties.name==feature.properties.name){
          probab=probab;
        }else{
          probab=1-probab;
        }
        if(opcoes.includes(feature.properties.name)){
          if(opcoes[0]==feature.properties.name){
            if(newdata[0].properties.name==feature.properties.name){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "black",
                dashArray: '3',
                fillOpacity: 1.0,
                color: '#c51b7d'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };            
            }
          }else if(opcoes[1]==feature.properties.name){
            if(newdata[0].properties.name==feature.properties.name){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "black",
                dashArray: '3',
                fillOpacity: 1.0,
                color: '#053061'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };            
            }           
          }
        }else{
          if(newdata[0].properties.name==feature.properties.name){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "black",
              dashArray: '3',
              fillOpacity: 1.0,
              color: 'black'
            };
          }else{
            return {
              weight: 0.5,
              opacity: 1,
              fillColor: "#"+colorR(probab),
              fillOpacity: 0.9,
              color: 'black'
            };            
          }
        }
    },
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        var probab= cmp(getDis(newdata[0].properties.name),getDis(feature.properties.name));
        if(newdata[0].properties.name==feature.properties.name){
          var total=probab;
          layer.bindPopup(feature.properties.name+" escolhida para comparar com as outras.");
        }else{
          var total=1-probab;
          layer.bindPopup(""+feature.properties.name+": "+Math.round(total*100)+"%");
        }
        layer.on({
          dblclick: whenClickedC
        });
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            LayerRange.resetStyle(e.target);
            this.closePopup();
        });
      }
  }).addTo(mapRange);
  infoRange.update = function (props) {
    this._div.innerHTML= infoprops(props);
  };
  infoRange.addTo(mapRange);
}
function compareT(dataset){
  var probab= cmp(distribuicaoNYC(dataset[0].properties.OBJECTID),distribuicaoNYC(dataset[1].properties.OBJECTID));

  infoTaxi.remove();
  if(LayerTaxi!= null){
      LayerTaxi.clearLayers();
  }
  LayerTaxi =L.geoJson(dataset,
    {style: function(feature){
        if(opcoes.includes(feature.properties.OBJECTID)){
          if(opcoes[0]==feature.properties.OBJECTID){
            if(dataset[0].properties.OBJECTID==feature.properties.OBJECTID){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };            
            }
          }else if(opcoes[1]==feature.properties.OBJECTID){
            if(dataset[0].properties.OBJECTID==feature.properties.OBJECTID){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(1-probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };            
            }      
          }
        }else{
          if(dataset[0].properties.OBJECTID==feature.properties.OBJECTID){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };
          }else{
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(1-probab),
              dashArray: '3',
              fillOpacity: 0.9,
              color: 'black'
            };            
          }
        }
    },
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
          if(dataset[0].properties.OBJECTID==feature.properties.OBJECTID){
            var total=probab;
          }else{
            var total=1-probab;
          }
        layer.bindPopup(""+feature.properties.zone+": "+Math.round(total*100)+"%");
        layer.on({
          dblclick: whenClickedT
        });
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            LayerTaxi.resetStyle(e.target);
            this.closePopup();
        });
      }
  }).addTo(mapVistaxi);
  infoTaxi.update = function (props) {
    this._div.innerHTML= infopropsTaxi(props);
  };
  infoTaxi.addTo(mapVistaxi);
}
function compareTodosT(newdata,dataset){
  infoTaxi.remove();
  if(LayerTaxi!= null){
      LayerTaxi.clearLayers();
  }
  LayerTaxi =L.geoJson(dataset,
    {style: function(feature){
      var probab= cmp(distribuicaoNYC(newdata[0].properties.OBJECTID),distribuicaoNYC(feature.properties.OBJECTID));
        if(newdata[0].properties.OBJECTID==feature.properties.OBJECTID){
          probab=probab;
        }else{
          probab=1-probab;
        }
        if(opcoes.includes(feature.properties.OBJECTID)){
          if(opcoes[0]==feature.properties.OBJECTID){
            if(newdata[0].properties.OBJECTID==feature.properties.OBJECTID){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "black",
                dashArray: '3',
                fillOpacity: 1.0,
                color: '#c51b7d'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#c51b7d'
              };            
            }
          }else if(opcoes[1]==feature.properties.OBJECTID){
            if(newdata[0].properties.OBJECTID==feature.properties.OBJECTID){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "black",
                dashArray: '3',
                fillOpacity: 1.0,
                color: '#053061'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: "#"+colorR(probab),
                dashArray: '3',
                fillOpacity: 0.9,
                color: '#053061'
              };            
            }      
          }
        }else{
          if(newdata[0].properties.OBJECTID==feature.properties.OBJECTID){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "black",
              dashArray: '3',
              fillOpacity: 1.0,
              color: 'black'
            };
          }else{
            return {
              weight: 0.5,
              opacity: 1,
              fillColor: "#"+colorR(probab),
              fillOpacity: 0.9,
              color: 'black'
            };            
          }
        }
    },
      onEachFeature: function (feature,layer) {
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
      var probab= cmp(distribuicaoNYC(newdata[0].properties.OBJECTID),distribuicaoNYC(feature.properties.OBJECTID));
        if(newdata[0].properties.OBJECTID==feature.properties.OBJECTID){
          probab=probab;
          layer.bindPopup(feature.properties.zone+" escolhida para comparar com as outras.");
        }else{
          probab=1-probab;
          layer.bindPopup(""+feature.properties.zone+": "+Math.round(probab*100)+"%");
        }
        layer.on({
          dblclick: whenClickedT
        });
        layer.on('mouseover', function (e) {
            highlightFeature(e);
            this.openPopup();
        });
        layer.on('mouseout', function (e) {
            LayerTaxi.resetStyle(e.target);
            this.closePopup();
        });
      }
  }).addTo(mapVistaxi);
  infoTaxi.update = function (props) {
    this._div.innerHTML= infopropsTaxi(props);
  };
  infoTaxi.addTo(mapVistaxi);
}
// QUANDO INVOCADA ESSA FUNÇÃO COMPARA DUAS ÁREAS RETORNA A PROBABILIDADE DE UMA SER MAIOR QUE A OUTRA
function comparando_distance_far(e){
  //console.log(e);
  var exists=false;
    selecionados_distance_far.forEach(function(d,i){
      if(e.target.feature.properties.id==d.target.feature.properties.id){
        exists=true;
      }
    });
    if(exists==false && selecionados.length<3){
      var layer = e.target;
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
      selecionados_distance_far.push(e);
      if(selecionados_distance_far.length==2){
        layer_distance_far.clearLayers();
        var newdata=[];
        selecionados_distance_far.forEach(function(d,i){
          newdata.push(d.target.feature);
        });
        compare_distance_far(newdata);
      }
    }else if(exists==true && selecionados_distance_far.length>0){
      selecionados_distance_far=[];
      $('#div_slider_distance_far').removeClass("disabledslider");
      inicio_distance_far(distance_far_geodata,true);
    }else if(exists){
      var filtered = selecionados_distance_far.filter(function(el) { return el.target.feature.properties.id != e.target.feature.properties.id; }); 
      selecionados_distance_far=filtered;
      layer_distance_far.resetStyle(e.target);
    }
}

function comparando_distance_near(e){
  //console.log(e);
  var exists=false;
    selecionados_distance_near.forEach(function(d,i){
      if(e.target.feature.properties.id==d.target.feature.properties.id){
        exists=true;
      }
    });
    if(exists==false && selecionados.length<3){
      var layer = e.target;
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
      selecionados_distance_near.push(e);
      if(selecionados_distance_near.length==2){
        layer_distance_near.clearLayers();
        var newdata=[];
        selecionados_distance_near.forEach(function(d,i){
          newdata.push(d.target.feature);
        });
        compare_distance_near(newdata);
      }
    }else if(exists==true && selecionados_distance_near.length>0){
      selecionados_distance_near=[];
      $('#div_slider_distance_near').removeClass("disabledslider");
      inicio_distance_near(distance_near_geodata,true);
    }else if(exists){
      var filtered = selecionados_distance_near.filter(function(el) { return el.target.feature.properties.id != e.target.feature.properties.id; }); 
      selecionados_distance_near=filtered;
      layer_distance_near.resetStyle(e.target);
    }
}

function comparando_size_large(e){
  //console.log(e);
  var exists=false;
    selecionados_size_large.forEach(function(d,i){
      if(e.target.feature.properties.id==d.target.feature.properties.id){
        exists=true;
      }
    });
    if(exists==false && selecionados.length<3){
      var layer = e.target;
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
      selecionados_size_large.push(e);
      if(selecionados_size_large.length==2){
        layer_size_large.clearLayers();
        var newdata=[];
        selecionados_size_large.forEach(function(d,i){
          newdata.push(d.target.feature);
        });
        compare_size_large(newdata);
      }
    }else if(exists==true && selecionados_size_large.length>0){
      selecionados_size_large=[];
      $('#div_slider_size_large').removeClass("disabledslider");
      inicio_size_large(size_large_geodata,true);
    }else if(exists){
      var filtered = selecionados_size_large.filter(function(el) { return el.target.feature.properties.id != e.target.feature.properties.id; }); 
      selecionados_size_large=filtered;
      layer_size_large.resetStyle(e.target);
    }
}

function comparando_variance_small(e){
  //console.log(e);
  var exists=false;
    selecionados_variance_small.forEach(function(d,i){
      if(e.target.feature.properties.id==d.target.feature.properties.id){
        exists=true;
      }
    });
    if(exists==false && selecionados.length<3){
      var layer = e.target;
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
      selecionados_variance_small.push(e);
      if(selecionados_variance_small.length==2){
        layer_variance_small.clearLayers();
        var newdata=[];
        selecionados_variance_small.forEach(function(d,i){
          newdata.push(d.target.feature);
        });
        compare_variance_small(newdata);
      }
    }else if(exists==true && selecionados_variance_small.length>0){
      selecionados_variance_small=[];
      $('#div_slider_variance_small').removeClass("disabledslider");
      inicio_variance_small(variance_geodata,true);
    }else if(exists){
      var filtered = selecionados_variance_small.filter(function(el) { return el.target.feature.properties.id != e.target.feature.properties.id; }); 
      selecionados_variance_small=filtered;
      layer_variance_small.resetStyle(e.target);
    }
}

function comparando_variance_large(e){
  //console.log(e);
  var exists=false;
    selecionados_variance_large.forEach(function(d,i){
    if(e.target.feature.properties.id==d.target.feature.properties.id){
        exists=true;
      }
    });
    if(exists==false && selecionados.length<3){
      var layer = e.target;
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
      selecionados_variance_large.push(e);
      if(selecionados_variance_large.length==2){
        layer_variance_large.clearLayers();
        var newdata=[];
        selecionados_variance_large.forEach(function(d,i){
          newdata.push(d.target.feature);
        });
        compare_variance_large(newdata);
      }
    }else if(exists==true && selecionados_variance_large.length>0){
      selecionados_variance_large=[];
      $('#div_slider_variance_large').removeClass("disabledslider");
      inicio_variance_large(variance_geodata,true);
    }else if(exists){
      var filtered = selecionados_variance_large.filter(function(el) { return el.target.feature.properties.id != e.target.feature.properties.id; }); 
      selecionados_variance_large=filtered;
      layer_variance_large.resetStyle(e.target);
    }
}

function comparando_size_small(e){
  //console.log(e);
  var exists=false;
    selecionados_size_small.forEach(function(d,i){
      if(e.target.feature.properties.id==d.target.feature.properties.id){
        exists=true;
      }
    });
    if(exists==false && selecionados.length<3){
      var layer = e.target;
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
      selecionados_size_small.push(e);
      if(selecionados_size_small.length==2){
        layer_size_small.clearLayers();
        var newdata=[];
        selecionados_size_small.forEach(function(d,i){
          newdata.push(d.target.feature);
        });
        compare_size_small(newdata);
      }
    }else if(exists==true && selecionados_size_small.length>0){
      selecionados_size_small=[];
      $('#div_slider_size_small').removeClass("disabledslider");
      inicio_size_small(size_small_geodata,true);
    }else if(exists){
      var filtered = selecionados_size_small.filter(function(el) { return el.target.feature.properties.id != e.target.feature.properties.id; }); 
      selecionados_size_small=filtered;
      layer_size_small.resetStyle(e.target);
    }
}

function comparando(e){
  //console.log(e);
  var exists=false;
    selecionados.forEach(function(d,i){
      if(e.target.feature.properties.id==d.target.feature.properties.id){
        exists=true;
      }
    });
    if(exists==false && selecionados.length<3){
      var layer = e.target;
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
      selecionados.push(e);
      if(selecionados.length==2){
        layerTuto2.clearLayers();
        var newdata=[];
        selecionados.forEach(function(d,i){
          newdata.push(d.target.feature);
        });
        compare(newdata);
      }
    }else if(exists==true && selecionados.length>0){
      selecionados=[];
      $('#slidert').removeClass("disabledslider");
      Vis02TutorialFunction(distance_near_geodata,true);
    }else if(exists){
      var filtered = selecionados.filter(function(el) { return el.target.feature.properties.id != e.target.feature.properties.id; }); 
      selecionados=filtered;
      layerTuto2.resetStyle(e.target);
    }
}
function comparandoC(e){
  //console.log(e);
  var exists=false;
    selecionadosC.forEach(function(d,i){
      if(e.target.feature.properties.id==d.target.feature.properties.id){
        exists=true;
      }
    });
    if(exists==false && selecionadosC.length<3){
      var layer = e.target;
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
      selecionadosC.push(e);
      if(selecionadosC.length==2){
        //LayerRange.clearLayers();
        var newdata=[];
        selecionadosC.forEach(function(d,i){
          newdata.push(d.target.feature);
        });
        compareC(newdata);
      }/*else if(selecionadosC.length==1){
        LayerRange.clearLayers();
        var newdata=[];
        selecionadosC.forEach(function(d,i){
          newdata.push(d.target.feature);
        });
        compareTodosC(newdata,dataset);
      }*/
    }else if(exists==true && selecionadosC.length>0){
      selecionadosC=[];
      $('#sliderc').removeClass("disabledslider");
      inicioRange(dataset);
    }else if(exists){
      var filtered = selecionadosC.filter(function(el) { return el.target.feature.properties.id != e.target.feature.properties.id; }); 
      selecionadosC=filtered;
      LayerRange.resetStyle(e.target);
    }
}
function comparandoT(e){
  //console.log(e);
  var exists=false;
    selecionadosT.forEach(function(d,i){
      if(e.target.feature.properties.OBJECTID==d.target.feature.properties.OBJECTID){
        exists=true;
      }
    });
    if(exists==false && selecionadosT.length<3){
      var layer = e.target;
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
      selecionadosT.push(e);
      /*if(selecionadosT.length==2){
        LayerTaxi.clearLayers();
        var newdata=[];
        selecionadosT.forEach(function(d,i){
          newdata.push(d.target.feature);
        });
        compareT(newdata);
      }else */if(selecionadosT.length==1){
        LayerTaxi.clearLayers();
        var newdata=[];
        selecionadosT.forEach(function(d,i){
          newdata.push(d.target.feature);
        });
        compareTodosT(newdata,datasettaxi);
      }
    }else if(exists==true && selecionadosT.length>0){
      selecionadosT=[];
      $('#slidertx').removeClass("disabledslider");
      inicioTaxi(datasettaxi);
    }else if(exists){
      var filtered = selecionadosT.filter(function(el) { return el.target.feature.properties.name != e.target.feature.properties.name; }); 
      selecionadosT=filtered;
      LayerTaxi.resetStyle(e.target);
    }
}

function bring_front(map){
  for (l in map._layers) {
      if(map._layers[parseInt(l)].feature!=undefined && map._layers[parseInt(l)].feature.properties.highlight==1){
      map._layers[parseInt(l)].bringToFront();
    }
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

(function(console){

  console.save = function(data, filename){
  
      if(!data) {
          console.error('Console.save: No data')
          return;
      }
  
      if(!filename) filename = 'console.json'
  
      if(typeof data === "object"){
          data = JSON.stringify(data, undefined, 4)
      }
  
      var blob = new Blob([data], {type: 'text/json'}),
          e    = document.createEvent('MouseEvents'),
          a    = document.createElement('a')
  
      a.download = filename
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
      e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
   }
  })(console)

  quantile = (arr, q) => {
    const sorted = asc(arr);
    const pos = (sorted.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (sorted[base + 1] !== undefined) {
        return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    } else {
        return sorted[base];
    }
};