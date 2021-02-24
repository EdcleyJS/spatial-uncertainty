var filterbymouth,filterbytri,alpha=0,left=200,right=500,leftTaxi=22000,rightTaxi=36000,database,interOn,mesSelecionado,anoSelecionado,diaSelecionado,trimestreSelecionado,opcoes=[],GeoLayer,LayerRange,layerTuto1,layerTuto3,layerTuto4,LayerTaxi,dataset,max,featurename,selecionados=[],selecionadosC=[],selecionadosT=[],medias=[],hops=true;
var mapVis02 = L.map('vis02',{preferCanvas: true,attributionControl: false,crs: L.CRS.Simple}).setView([0.203125,0.6640625], 6);
var gradesR=[0,0.12,0.24,0.36,0.48,0.60,0.72,0.84,1];
var databasetaxi,datasettaxi;
mapVis02.doubleClickZoom.disable();
mapVis02.scrollWheelZoom.disable();

var bounds = [[0,0], [1000,1000]];
var distance_near_geodata;

var firstTime = true;

var url_string = window.location.href
var url = new URL(url_string);
var polyfile = url.searchParams.get("polygon");
var distributionfile = url.searchParams.get("distribution");

if(!polyfile) {
  polyfile = "./data/rio.geojson";//"./data/polygons.geojson";
}

if(!distributionfile) {
  distributionfile = "./data/weather.json";//"./data/distribuicao.json";
}

console.log(polyfile,distributionfile);

d3.json(polyfile,function(error,polygons_far){
  distance_near_geodata=polygons_far;
});
//--------------------------------------------------------------
var dist_distance;
d3.json(distributionfile,function(error,distribuicao){
  dist_distance=distribuicao;
  dist_distance= Object.keys(dist_distance).map(function(key) {
    return [dist_distance[key]];
  });
});
//-------------------
//-- DIV INFO DO MAPA CONTROLADO -- 
var infoVis02=L.control();
infoVis02.onAdd = function (mymap) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};
//-- DIV LEGENDA DO MAPA CONTROLADO --
var legendVis02 = L.control({position: 'bottomright'});
legendVis02.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),grades=[],labels = [];
  /*for (var i = 10; i >= 0; i--) {
    grades.push((0.1*i).toFixed(2));
  }*/
  for (var i = (gradesR.length-1); i >=0 ; i--) {
    if(i==0||i==8){
      div.innerHTML +='<i style="color:#'+colorR(gradesR[i])+'; background:#'+colorR(gradesR[i])+'"></i>'+(gradesR[i]*100)+'%</br>';
    }else{
      div.innerHTML +='<i style="color:#'+colorR(gradesR[i])+'; background:#'+colorR(gradesR[i])+'"></i></br>';
    }
  }
  return div;
};
legendVis02.addTo(mapVis02);
var cmpOn=false;
var flag=false;

function updateColorsTuto2(){
  for(let iid in layerTuto2._layers){
    layer = layerTuto2._layers[iid];
    var probArea= new distribuicaoIntervalo(distribuicaoSin(layer.feature.properties.id,dist_distance),left,right);
    var prob= probArea.cdfintervalo().toFixed(2);
    layer.setStyle({
      fillColor: "#"+colorR(prob)
    });
  }
  
}

//-- FUNÇÃO QUE DESENHA E CONTROLA AS AREAS NO MAPA --
var layerTuto2;

function Vis02TutorialFunction(){
  if(layerTuto2!= undefined){
      layerTuto2.clearLayers();
    }
    layerTuto2=L.geoJson(distance_near_geodata,
      {style: function(feature){
          //Style para definir configurações dos polígonos a serem desenhados e colorir com base na escala criada.
          var probArea= new distribuicaoIntervalo(distribuicaoSin(feature.properties.id,dist_distance),left,right);
        var prob= probArea.cdfintervalo().toFixed(2);
      if(feature.properties.highlight==1){
          if(feature.properties.id==0){
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(prob),
              fillOpacity: 0.9,
              color: '#e66101'
            };
          }else{
            return {
              weight: 3.5,
              opacity: 1,
              fillColor: "#"+colorR(prob),
              fillOpacity: 0.9,
              color: '#d01c8b'
            };
          }
        }else{
              return {
                weight: 0.5,
                opacity: 1,
                fillColor: "#"+colorR(prob),//+colorR(prob),
                color: 'black',
                fillOpacity: 0.9
              };
          }
    },
    onEachFeature: function (feature, layer) {
        var probArea= new distribuicaoIntervalo(distribuicaoSin(feature.properties.id,dist_distance),left,right);
        var prob= probArea.cdfintervalo().toFixed(2);
        //Criação do Popup de cada feature/polígono contendo o nome do proprietário e o cep de localização do edíficio/lote.
        //if(feature.properties.highlight==1){
          layer.bindPopup(""+feature.properties.id+": "+Math.floor(prob*100)+"%");
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
              //console.log(e);
              if(selecionados_distance_near.filter(function(el) { return el.target.feature.properties.id === e.target.feature.properties.id; }).length>0){
                layer.setStyle({
                    weight: 3.5,
                    color: 'black',
                    fillOpacity: 0.9
                });
              }
          });
        //}
      }
  }).addTo(mapVis02);

  mapVis02.fitBounds(layerTuto2.getBounds());

  infoVis02.update = function (props) {
      this._div.innerHTML= infoprops(props);
  };

    infoVis02.addTo(mapVis02);

    //
  console.log("ok");
}

setTimeout(function() {  
   Vis02TutorialFunction();
    bring_front(mapVis02);
    buildSlider();
    Vis02TutorialFunction();
}, 1000);

