var novaDist, bounds, width, height, area, nump, cont, cor, p, markerCircle, opcoes = [], anoSelecionado, featurename, mesSelecionado, anoSelecionado, diaSelecionado, trimestreSelecionado, layerTuto3;
var mapVis03 = L.map('vis03', { preferCanvas: true, backgroun: 'blue', attributionControl: false, crs: L.CRS.Simple })
  .setView([0.203125, 0.6640625], 2);
var grades_distance = [91, 170, 249, 328, 407, 486, 565, 644, 727];
var colorScale = undefined;


var myRendererTaxi = L.canvas({ padding: 0.5 });
var LayerDotMap, LayerTaxi, pontos;
var database, dots = [], dotsZ1 = [], dotsZ2 = [], dotsZ3 = [], dotsTaxi = [], dotsZ1Taxi = [], dotsZ2Taxi = [], dotsZ3Taxi = [];
var bounds = [[0, 0], [1000, 1000]];
var dots;
var tentativa = [];
var d_distance_near = [], d1_distance_near = [], d2_distance_near = [], d3_distance_near = [];
var ndist_distance_near;
var mapFeaturePoints = {};
//-----------------------------------------------------------------------------
var distance_near_geodata;

var url_string = window.location.href
var url = new URL(url_string);
var polyfile = url.searchParams.get("polygon");
var distributionfile = url.searchParams.get("distribution");

var infoVis03;
var legendVis03;

if (!polyfile) {
  polyfile = "./spatial_uncertainty/data/rio.geojson";//"./data/polygons.geojson";
}

if (!distributionfile) {
  distributionfile = "./spatial_uncertainty/data/weather.json";//"./data/distribuicao.json";
}

console.log(polyfile, distributionfile);

//--------------------------------------------------------------
var dist_distance;
d3.json(distributionfile, function (error, distribuicao) {

  //
  menor = Infinity
  maior = -Infinity

  for (let key in distribuicao) {
    let values = distribuicao[key];
    for (key2 in values) {
      let value = values[key2];
      if (value < menor) menor = value;
      if (value > maior) maior = value;
    }
  }

  //
  colorScale = d3.scaleQuantize().domain([menor, maior]).range(['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b']);
  grades_distance = colorScale.ticks();

  //
  dist_distance = distribuicao;
  dist_distance = Object.keys(dist_distance).map(function (key) {
    return [dist_distance[key]];
  });

  d3.json(polyfile, function (error, polygons_far) {
    distance_near_geodata = polygons_far;


    d3.json("./spatial_uncertainty/data/pointsGood.json", function (error, points) {
      mapFeaturePoints = points;
    
      //////
      //create polygon layer
      createPolygonLayer();
      //generate points
      //pontos_distance_near();
      //create markers
      createMarkers();
      //generate legend
      addLegend();
      //generate map layer
      Vis03TutorialFunction();
      //bring_front(mapVis03);
    });

  });
});

function createMarkers(){
  for(let id in layerTuto3._layers){
    let layer = layerTuto3._layers[id];
    let feature = layer.feature;
    ndist_distance_near = dotMapPrep(distribuicaoSin(feature.properties.id, dist_distance));
    
    if(!(feature.properties.id in mapFeaturePoints))  
      continue;
    
    let pointsGrid = mapFeaturePoints[feature.properties.id];
    //embaralho os pontos aleatoriamente
    //pointsGrid=shuffle(pointsGrid); 
    var pdisponiveis = pointsGrid.length;
    //
    if(false){
      let distribution = distribuicaoSin(feature.properties.id, dist_distance);
      for(let i = 0 ; i < pdisponiveis ; ++i){
        let value = pointsGrid[i][2];
        let cor = color_distance(value);
        //
        let coords = L.latLng(pointsGrid[i][1],pointsGrid[i][0]);
        d_distance_near.push(L.circleMarker(coords, { radius: 3.2, stroke: true, weight: 0.5, fillColor: cor, fillOpacity: 1, color: 'gray', renderer: myRendererTaxi }).bindPopup("" + value));
        d1_distance_near.push(L.circleMarker(coords, { radius: 3.2, stroke: true, weight: 0.5, fillColor: cor, fillOpacity: 1, color: 'gray', renderer: myRendererTaxi }).bindPopup("" + value));
        d2_distance_near.push(L.circleMarker(coords, { radius: 6.4, stroke: true, weight: 0.5, fillColor: cor, fillOpacity: 1, color: 'gray', renderer: myRendererTaxi }).bindPopup("" + value));
        d3_distance_near.push(L.circleMarker(coords, { radius: 9.6, stroke: true, weight: 0.5, fillColor: cor, fillOpacity: 1, color: 'gray', renderer: myRendererTaxi }).bindPopup("" + value));
      }
    }
    else if(true){

    }
    else{//sort
      let distribution = distribuicaoSin(feature.properties.id, dist_distance);
      let values = []
      for(let i = 0 ; i < pdisponiveis ; ++i){
        let index = getRandomInt(0,distribution.length);
        let value = distribution[index];
        values.push(value);
      }
      values.sort(function(a,b){
        if (a<b) {
          return -1;
        }
        else if (b<a) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });
      pointsGrid.sort(function(a,b){
        if (a[0] < b[0] || (a[0] == b[0] && a[1]<b[1])) {
          return -1;
        }
        else if ((b[0] < a[0]) || (b[0] == a[0] && b[1] < a[1])) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });
      for(let i = 0 ; i < pdisponiveis ; ++i){
        let value = values[i];
        let cor = color_distance(value);
        //
        let coords = L.latLng(pointsGrid[i][1],pointsGrid[i][0]);
        d_distance_near.push(L.circleMarker(coords, { radius: 3.2, stroke: true, weight: 0.5, fillColor: cor, fillOpacity: 1, color: 'gray', renderer: myRendererTaxi }).bindPopup("" + value));
        d1_distance_near.push(L.circleMarker(coords, { radius: 3.2, stroke: true, weight: 0.5, fillColor: cor, fillOpacity: 1, color: 'gray', renderer: myRendererTaxi }).bindPopup("" + value));
        d2_distance_near.push(L.circleMarker(coords, { radius: 6.4, stroke: true, weight: 0.5, fillColor: cor, fillOpacity: 1, color: 'gray', renderer: myRendererTaxi }).bindPopup("" + value));
        d3_distance_near.push(L.circleMarker(coords, { radius: 9.6, stroke: true, weight: 0.5, fillColor: cor, fillOpacity: 1, color: 'gray', renderer: myRendererTaxi }).bindPopup("" + value));
      }
    }



    // var indice = 0;
    // let counter = 0;
    // ndist_distance_near.forEach(function (d) {
    
    //   //a cor do ponto calculada com base no valor
    //   cor = color_distance(d[0]);
    //   //o limite é a quantidade de pontos que um valor tera disponivel dentro do total de pontos do poligono para representar seu valor
    //   //quanto maior a ocorrencia do valor na distribuição mais pontos irao representalos.
    //   //na funcao que arrendonda os valores é retornado os valores e a representação deles em % d[1]
    //   var limite = Math.round((pdisponiveis) * d[1]);
    //   var i = indice;
    //   var l = limite + indice;
    //   for (i; i < l; i++) {
    //     if (pdisponiveis > 0) {
    //       counter += 1;
    //       //são gerados 4 arrays de marcadores de pontos com raio diferente para que quando o zoom seja grande o ponto aumente
    //       //algumas pessoas reclamaram nos pilotos que ao dar zoom ficava praticamente impossivel de ver os pontos então
    //       //implementei essa solução
    //       let coords = L.latLng(pointsGrid[i][1],pointsGrid[i][0]);
    //       d_distance_near.push(L.circleMarker(coords, { radius: 3.2, stroke: true, weight: 0.5, fillColor: cor, fillOpacity: 1, color: 'gray', renderer: myRendererTaxi }).bindPopup("" + d[0]));
    //       d1_distance_near.push(L.circleMarker(coords, { radius: 3.2, stroke: true, weight: 0.5, fillColor: cor, fillOpacity: 1, color: 'gray', renderer: myRendererTaxi }).bindPopup("" + d[0]));
    //       d2_distance_near.push(L.circleMarker(coords, { radius: 6.4, stroke: true, weight: 0.5, fillColor: cor, fillOpacity: 1, color: 'gray', renderer: myRendererTaxi }).bindPopup("" + d[0]));
    //       d3_distance_near.push(L.circleMarker(coords, { radius: 9.6, stroke: true, weight: 0.5, fillColor: cor, fillOpacity: 1, color: 'gray', renderer: myRendererTaxi }).bindPopup("" + d[0]));
    //       pdisponiveis--;
    //     }
    //   }
    //   console.log(counter,pointsGrid.length);
    // });
  }
    
}

function createPolygonLayer(){
  layerTuto3 = L.geoJson(distance_near_geodata,
    {
      style: function (feature) {
        if (feature.properties.highlight == 1) {
          if (feature.properties.id == 0) {
            return {
              weight: 3.5,
              opacity: 1,
              fillOpacity: 0,
              color: '#e66101'
            };
          } else {
            return {
              weight: 3.5,
              opacity: 1,
              fillOpacity: 0,
              color: '#d01c8b'
            };
          }
        } else {
          return {
            weight: 0.5,
            opacity: 1,
            color: 'black',
            fillOpacity: 0
          };
        }
      },
      onEachFeature: function (feature, layer) {
        //atualmente ao clicar em um ponto é possível ver o valor que ele representa.
        //se quiser exibir o id do polygon:
        /*layer.bindPopup(""+feature.properties.id);
        layer.on('mouseover', function (e) {
          this.openPopup();
        });
        layer.on('mouseout', function (e) {
          this.closePopup();
        });*/
      }
    });
}

//-----------------------------------------------------------------------------
function pontos_distance_near() {
  var pointsdots = [];
  var xMin, yMin, xMax, yMax;
  var contdots = 0;
  mapFeaturePoints = {}
  let _counter = 1;
  let numFeatures = Object.keys(layerTuto3._layers).length;
  for(let id in layerTuto3._layers){
    console.log("Processing " + _counter + "/" + numFeatures);
    _counter += 1;
    let layer = layerTuto3._layers[id];
    let feature = layer.feature;
    mapFeaturePoints[feature.properties.id] = [];
    //var buffered = turf.transformScale(layer.toGeoJSON(), 0.85);
    var buffered = turf.buffer(feature, -3, { units: 'miles' })
    
    //Pega a distribuição com valores
    ndist_distance_near = dotMapPrep(distribuicaoSin(feature.properties.id, dist_distance));
    let distribution = distribuicaoSin(feature.properties.id, dist_distance);

    //envelopa a feature para que esteja no formato que turf.js aceita.
    console.log("envelope");
    var enveloped = turf.envelope(feature);

    //turf cria uma caixa de formato retangular em volta do poligono
    var a = turf.bbox(enveloped);
    console.log("bbox",a);

    //um grid de pontos é gerado com distancia de 15 entre os pontos (unidade não especificada mas pode ser km ou ml).
    console.log("grid");
    var grid = turf.pointGrid(a, 6);

    // array que vai guardar os pontos que estão dentro dos limites do poligono.
    var pointsGrid = [];
    //para cada ponto no grid
    console.log("Creating Points");
    grid.features.forEach(function (d) {
      //pego as cordenadas
      var aux = d.geometry.coordinates;
      //gero um objeto do tipo L.latlng que o unico aceito no mapa.
      var q = L.latLng(aux[1], aux[0]);
      // //verifico atraves da lib leafletPip se ponto criado esta dentro dos limites do poligono
      // //passando o ponto criado, o layer convertido em objeto geoJson e true para sinalizar
      // //que quero saber se o ponto pertence se fosse o contrario seria false.
      // //se o length retorno for 1 é porque a condicação é satisfeita e ponto pertence

      if (turf.inside(turf.point([q.lng, q.lat]), buffered)) {
      //if(leafletPip.pointInLayer(q, L.geoJSON(layer.toGeoJSON()), true).length > 0){
        //entao eu salvo aquele ponto que esta dentro dos limites do poligono
        let index = getRandomInt(0,distribution.length);
        let value = distribution[index];
        pointsGrid.push(q);
        mapFeaturePoints[feature.properties.id].push([q.lng, q.lat,value]);
      }
    });

    console.log("Done Creating Points");
    if(_counter >= 20)
      break
    // var indice = 0;
    // //embaralho os pontos aleatoriamente
    // //pointsGrid=shuffle(pointsGrid); 
    // var pdisponiveis = pointsGrid.length;
    // //de acordo com a nova distribuicao dos dados que foram arredondados antes eu vou converter agora
    // //cada valor em um objeto L.circle marker
    // console.log("HERE4");
    // ndist_distance_near.forEach(function (d) {
    //   //a cor do ponto calculada com base no valor
    //   cor = color_distance(d[0]);
    //   //o limite é a quantidade de pontos que um valor tera disponivel dentro do total de pontos do poligono para representar seu valor
    //   //quanto maior a ocorrencia do valor na distribuição mais pontos irao representalos.
    //   //na funcao que arrendonda os valores é retornado os valores e a representação deles em % d[1]
    //   var limite = Math.round((pointsGrid.length) * d[1]);
    //   var i = indice;
    //   var l = limite + indice;
    //   for (i; i < l; i++) {
    //     if (pdisponiveis > 0) {
    //       //são gerados 4 arrays de marcadores de pontos com raio diferente para que quando o zoom seja grande o ponto aumente
    //       //algumas pessoas reclamaram nos pilotos que ao dar zoom ficava praticamente impossivel de ver os pontos então
    //       //implementei essa solução
    //       d_distance_near.push(L.circleMarker(pointsGrid[i], { radius: 3.2, stroke: true, weight: 0.5, fillColor: cor, fillOpacity: 1, color: 'gray', renderer: myRendererTaxi }).bindPopup("" + d[0]));
    //       d1_distance_near.push(L.circleMarker(pointsGrid[i], { radius: 3.2, stroke: true, weight: 0.5, fillColor: cor, fillOpacity: 1, color: 'gray', renderer: myRendererTaxi }).bindPopup("" + d[0]));
    //       d2_distance_near.push(L.circleMarker(pointsGrid[i], { radius: 6.4, stroke: true, weight: 0.5, fillColor: cor, fillOpacity: 1, color: 'gray', renderer: myRendererTaxi }).bindPopup("" + d[0]));
    //       d3_distance_near.push(L.circleMarker(pointsGrid[i], { radius: 9.6, stroke: true, weight: 0.5, fillColor: cor, fillOpacity: 1, color: 'gray', renderer: myRendererTaxi }).bindPopup("" + d[0]));
    //       pdisponiveis--;
    //     }
    //   }
    //   //quanto os marcadores estiverem gerados na quantidade limite o loop é interrompido.
    //   indice += limite;
    // });

    // console.log("Done Creating Markers");

  }

  
    console.log(mapFeaturePoints);
    if(true){
      debugger
    }

  // let myLayer = L.geoJson(distance_near_geodata, {
  //   onEachFeature: async function (feature, layer) {
  //     //var buffered = turf.transformScale(layer.toGeoJSON(), 0.85);
  //     console.log("HERE1");
  //     var buffered = turf.buffer(layer.toGeoJSON(), -5, { units: 'miles' })
  //     if (feature.properties.highlight == 1 || feature.properties.highlight == 0) {
  //       //Pega a distribuição com valores
  //       console.log("dist");
  //       ndist_distance_near = dotMapPrep(distribuicaoSin(feature.properties.id, dist_distance));
  //       //envelopa a feature para que esteja no formato que turf.js aceita.
  //       console.log("envelope");
  //       var enveloped = turf.envelope(feature);
  //       //turf cria uma caixa de formato retangular em volta do poligono
  //       console.log("bbox");
  //       var a = turf.bbox(enveloped);
  //       //um grid de pontos é gerado com distancia de 15 entre os pontos (unidade não especificada mas pode ser km ou ml).
  //       console.log("grid");
  //       var grid = turf.pointGrid(a, 12,{mask:feature});
  //       // array que vai guardar os pontos que estão dentro dos limites do poligono.
  //       var pointsGrid = [];
  //       //para cada ponto no grid
  //       grid.features.forEach(function (d) {
  //         //pego as cordenadas
  //         var aux = d.geometry.coordinates;
  //         //gero um objeto do tipo L.latlng que o unico aceito no mapa.
  //         var q = L.latLng(aux[1], aux[0]);
  //         // //verifico atraves da lib leafletPip se ponto criado esta dentro dos limites do poligono
  //         // //passando o ponto criado, o layer convertido em objeto geoJson e true para sinalizar
  //         // //que quero saber se o ponto pertence se fosse o contrario seria false.
  //         // //se o length retorno for 1 é porque a condicação é satisfeita e ponto pertence

  //         // if (turf.inside(turf.point([q.lng, q.lat]), buffered)) {
  //         //   //if(leafletPip.pointInLayer(q, L.geoJSON(layer.toGeoJSON()), true).length > 0){
  //         //   //entao eu salvo aquele ponto que esta dentro dos limites do poligono
  //         //   pointsGrid.push(q);
  //         // }
  //         pointsGrid.push(q);
  //       });
  //       var indice = 0;
  //       //embaralho os pontos aleatoriamente
  //       //pointsGrid=shuffle(pointsGrid); 
  //       var pdisponiveis = pointsGrid.length;
  //       //de acordo com a nova distribuicao dos dados que foram arredondados antes eu vou converter agora
  //       //cada valor em um objeto L.circle marker
  //       console.log("HERE4");
  //       ndist_distance_near.forEach(function (d) {
  //         //a cor do ponto calculada com base no valor
  //         cor = color_distance(d[0]);
  //         //o limite é a quantidade de pontos que um valor tera disponivel dentro do total de pontos do poligono para representar seu valor
  //         //quanto maior a ocorrencia do valor na distribuição mais pontos irao representalos.
  //         //na funcao que arrendonda os valores é retornado os valores e a representação deles em % d[1]
  //         var limite = Math.round((pointsGrid.length) * d[1]);
  //         var i = indice;
  //         var l = limite + indice;
  //         for (i; i < l; i++) {
  //           if (pdisponiveis > 0) {
  //             //são gerados 4 arrays de marcadores de pontos com raio diferente para que quando o zoom seja grande o ponto aumente
  //             //algumas pessoas reclamaram nos pilotos que ao dar zoom ficava praticamente impossivel de ver os pontos então
  //             //implementei essa solução
  //             d_distance_near.push(L.circleMarker(pointsGrid[i], { radius: 3.2, stroke: true, weight: 0.5, fillColor: cor, fillOpacity: 1, color: 'gray', renderer: myRendererTaxi }).bindPopup("" + d[0]));
  //             d1_distance_near.push(L.circleMarker(pointsGrid[i], { radius: 3.2, stroke: true, weight: 0.5, fillColor: cor, fillOpacity: 1, color: 'gray', renderer: myRendererTaxi }).bindPopup("" + d[0]));
  //             d2_distance_near.push(L.circleMarker(pointsGrid[i], { radius: 6.4, stroke: true, weight: 0.5, fillColor: cor, fillOpacity: 1, color: 'gray', renderer: myRendererTaxi }).bindPopup("" + d[0]));
  //             d3_distance_near.push(L.circleMarker(pointsGrid[i], { radius: 9.6, stroke: true, weight: 0.5, fillColor: cor, fillOpacity: 1, color: 'gray', renderer: myRendererTaxi }).bindPopup("" + d[0]));
  //             pdisponiveis--;
  //           }
  //         }
  //         //quanto os marcadores estiverem gerados na quantidade limite o loop é interrompido.
  //         indice += limite;
  //       });

  //     }
  //     else{
  //       console.log("do nothing")
  //     }
  //   }
  // });
  // console.log("HERE2");

  // console.log("generated points");
}
// //-------------------------------------------------------------------------------------
// mapVis03.on('zoomend', function() {
//   Vis03TutorialFunction();
// });

function addLegend() {
  infoVis03 = L.control();
  infoVis03.onAdd = function (mymap) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };
  legendVis03 = L.control({ position: 'bottomright' });
  legendVis03.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    for (var i = (grades_distance.length - 1); i >= 0; i--) {
      div.innerHTML += '<i style="color:' + color_distance(grades_distance[i]) + '; background:' + color_distance(grades_distance[i]) + '"></i>' + grades_distance[i] + '</br>';
    }
    return div;
  };
  legendVis03.addTo(mapVis03);
}


function Vis03TutorialFunction() {

  layerTuto3.addTo(mapVis03);
  mapVis03.fitBounds(layerTuto3.getBounds());
  var nZoom = mapVis03.getZoom();
  if (nZoom > 9) {
    pontos = L.layerGroup(d3_distance_near);
  } else if (true) {
    pontos = L.layerGroup(d2_distance_near);
  } else if (nZoom > 7) {
    pontos = L.layerGroup(d1_distance_near);
  } else {
    pontos = L.layerGroup(d_distance_near);
  }
  pontos.addTo(mapVis03);
  
  infoVis03.update = function (props) {
    this._div.innerHTML = infoprops(props);
  };
  infoVis03.addTo(mapVis03);
}



