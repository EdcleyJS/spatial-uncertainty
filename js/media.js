  var filterbymouth,filterbytri,alpha=0,left=60,right=100,database,interOn,mesSelecionado,anoSelecionado,diaSelecionado,trimestreSelecionado,opcoes=[],GeoLayer,LayerRange,layerTuto1,layerTuto2,layerTuto3,layerTuto4,LayerTaxi,dataset,max,featurename,selecionados=[],prob_geradas=[],hops=true,prob_geradaLayer;
  var sorteados;
  var mapVis04 = L.map('vis04',{preferCanvas: true,attributionControl: false,crs: L.CRS.Simple}).setView([0.203125,0.6640625], 6);
  var grades_distance=[91,170,249,328,407,486,565,644,727];
  var Layerprob_gerada,GeoLayer2,GeoLayer3,amostraN;
  mapVis04.doubleClickZoom.disable();
  mapVis04.scrollWheelZoom.disable();
  mapVis04.dragging.disable();
  var bounds = [[0,0], [1000,1000]];
  var colorScale = undefined;
  //-----------------------------------------------------------------------------
  var distance_far_geodata;

  var url_string = window.location.href
  var url = new URL(url_string);
  var polyfile = url.searchParams.get("polygon");
  var distributionfile = url.searchParams.get("distribution");
  var infoVis04;
  var legendVis04;

  if(!polyfile) {
    polyfile = "./data/rio.geojson";//"./data/polygons.geojson";
  }

  if(!distributionfile) {
    distributionfile = "./data/weather.json";//"./data/distribuicao.json";
  }

  console.log(polyfile,distributionfile);

  //--------------------------------------------------------------
  var dist_distance;
  d3.json(distributionfile,function(error,distribuicao){

      //
      menor = Infinity
      maior = -Infinity

      for(let key in distribuicao){
        let values = distribuicao[key];
        for(key2 in values){
          let value = values[key2];
          if(value < menor) menor = value;
          if(value > maior) maior = value;
        }
      }
      
      //
      dist_distance=distribuicao;
      dist_distance= Object.keys(dist_distance).map(function(key) {
        return [dist_distance[key]];
      });

      d3.json(polyfile,function(error,polygons_far){
        distance_far_geodata=polygons_far;
        //
        colorScale = d3.scaleQuantize().domain([menor,maior]).range(['#f7fcfd','#e5f5f9','#ccece6','#99d8c9','#66c2a4','#41ae76','#238b45','#006d2c','#00441b']);
        grades_distance = colorScale.ticks();
        addLegend();
      });
  });
  //-------------------------------------------------------------
  function addLegend(){
      infoVis04 = L.control();
      infoVis04.onAdd = function (mymap) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
      };
      legendVis04 = L.control({position: 'bottomright'});
      legendVis04.onAdd = function (mapprob_gerada) {
    var div = L.DomUtil.create('div', 'info legend');
    for (var i = (grades_distance.length-1); i >=0 ; i--) {
        div.innerHTML +='<i style="color:'+color_distance(grades_distance[i])+'; background:'+color_distance(grades_distance[i])+'"></i>'+grades_distance[i]+'</br>';
    }
    return div;
      };
      legendVis04.addTo(mapVis04);
  }

  function Vis04TutorialFunction(){
    var maximo=0;
    
    if(layerTuto4!= undefined){
      layerTuto4.clearLayers();
    }

    if(distance_far_geodata.type=="FeatureCollection"){
      layerTuto4= L.geoJson(distance_far_geodata,{
      style: function(feature){
        if(amostraN!=undefined){
          var prob_gerada= distribuicaoSin(feature.properties.id,dist_distance)[amostraN];
        }else{
          var probArea= new distribuicaoTeste(distribuicaoSin(feature.properties.id,dist_distance),0);
          var prob_gerada= probArea.media().toFixed(2);
        }
        if(feature.properties.highlight==1){
            if(feature.properties.id==0){
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: color_distance(prob_gerada),
                fillOpacity: 0.9,
                color: '#e66101'
              };
            }else{
              return {
                weight: 3.5,
                opacity: 1,
                fillColor: color_distance(prob_gerada),
                fillOpacity: 0.9,
                color: '#d01c8b'
              };
            }
          }else{
                return {
                  weight: 0.5,
                  opacity: 1,
                  fillColor: color_distance(prob_gerada),
                  color: 'black',
                  fillOpacity: 0.9
                };
            }
      },
        onEachFeature: function (feature, layer) {
            if(amostraN!=undefined){
              var prob_gerada= distribuicaoSin(feature.properties.id,dist_distance)[amostraN];
            }else{
              var probArea= new distribuicaoTeste(distribuicaoSin(feature.properties.id,dist_distance),0);
              var prob_gerada= probArea.media().toFixed(2);
            }
              layer.bindPopup(""+feature.properties.id+": "+prob_gerada);
              layer.on('mouseover', function (e) {
                  highlightFeature(e);
                  this.openPopup();
              });
              layer.on('mouseout', function (e) {
                  layerTuto4.resetStyle(e.target);
                  this.closePopup();
              });
          }
      }).addTo(mapVis04);
      //debugger
      mapVis04.fitBounds(layerTuto4.getBounds()); 
    }
    if(amostraN!=undefined){
      infoVis04.update = function (props) {
        this._div.innerHTML= '<h5>Informações gerais.</h5>' +  (props ?'<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>': ' Amostra Nº'+amostraN+'.');
      };
    }else{
      infoVis04.update = function (props) {
        this._div.innerHTML= infoprops(props);
      };
    }
    infoVis04.addTo(mapVis04);
  }
  //-------------------------------------------------------------
