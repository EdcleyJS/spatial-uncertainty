var novaDist,bounds,width,height,area,nump,cont,cor,p,markerCircle,opcoes=[],anoSelecionado,featurename,mesSelecionado,anoSelecionado,diaSelecionado,trimestreSelecionado,layerTuto3;
var mapVis03 = L.map('vis03',{preferCanvas: true,attributionControl: false,crs: L.CRS.Simple}).setView([0.203125,0.6640625], 6);
var grades_distance=[91,170,249,328,407,486,565,644,727];
var myRendererTaxi = L.canvas({ padding: 0.5 });
var LayerDotMap,LayerTaxi,pontos;
var database,dots=[],dotsZ1=[],dotsZ2=[],dotsZ3=[],dotsTaxi=[],dotsZ1Taxi=[],dotsZ2Taxi=[],dotsZ3Taxi=[];
var bounds = [[0,0], [1000,1000]];
var dots;
var tentativa=[];
var d_distance_near=[],d1_distance_near=[],d2_distance_near=[],d3_distance_near=[];
var ndist_distance_near;
//-----------------------------------------------------------------------------
var distance_near_geodata;

var url_string = window.location.href
var url = new URL(url_string);
var polyfile = url.searchParams.get("polygon");
var distributionfile = url.searchParams.get("distribution");

if(!polyfile) {
  polyfile = "./data/polygons.geojson";
}

if(!distributionfile) {
  distributionfile = "./data/distribuicao.json";
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
//-----------------------------------------------------------------------------
function pontos_distance_near(){
  var pointsdots = [];
  var xMin,yMin,xMax,yMax;
  var contdots=0;
  L.geoJson(distance_near_geodata,{
    onEachFeature: async function (feature, layer) {
        await sleep(3000);
        if(feature.properties.highlight==1 || feature.properties.highlight==0){
          //Pega a distribuição com valores
          ndist_distance_near= dotMapPrep(distribuicaoSin(feature.properties.id,dist_distance));
          //envelopa a feature para que esteja no formato que turf.js aceita.
          var enveloped = turf.envelope(feature);
          //turf cria uma caixa de formato retangular em volta do poligono
          var a=turf.bbox(enveloped); 
          //um grid de pontos é gerado com distancia de 15 entre os pontos (unidade não especificada mas pode ser km ou ml).
          var grid = turf.pointGrid(a,15);
          // array que vai guardar os pontos que estão dentro dos limites do poligono.
          var pointsGrid=[];
          //para cada ponto no grid
          grid.features.forEach(function(d){
              //pego as cordenadas
              var aux=d.geometry.coordinates; 
              //gero um objeto do tipo L.latlng que o unico aceito no mapa.
              var q=L.latLng(aux[1],aux[0]);
              //verifico atraves da lib leafletPip se ponto criado esta dentro dos limites do poligono
              //passando o ponto criado, o layer convertido em objeto geoJson e true para sinalizar
              //que quero saber se o ponto pertence se fosse o contrario seria false.
              //se o length retorno for 1 é porque a condicação é satisfeita e ponto pertence
              if (leafletPip.pointInLayer(q, L.geoJSON(layer.toGeoJSON()), true).length > 0) {
                //entao eu salvo aquele ponto que esta dentro dos limites do poligono
                pointsGrid.push(q);
              }
          });
          var indice=0;
          //embaralho os pontos aleatoriamente
          pointsGrid=shuffle(pointsGrid); 
          var pdisponiveis= pointsGrid.length;
          //de acordo com a nova distribuicao dos dados que foram arredondados antes eu vou converter agora
          //cada valor em um objeto L.circle marker
          ndist_distance_near.forEach(function(d){
            //a cor do ponto calculada com base no valor
            cor= "#"+color_distance(d[0]);
            //o limite é a quantidade de pontos que um valor tera disponivel dentro do total de pontos do poligono para representar seu valor
            //quanto maior a ocorrencia do valor na distribuição mais pontos irao representalos.
            //na funcao que arrendonda os valores é retornado os valores e a representação deles em % d[1]
            var limite=Math.round((pointsGrid.length)*d[1]);
            var i= indice;
            var l=limite+indice;
            for (i; i<l; i++) {
                if (pdisponiveis>0) {
                  //são gerados 4 arrays de marcadores de pontos com raio diferente para que quando o zoom seja grande o ponto aumente
                  //algumas pessoas reclamaram nos pilotos que ao dar zoom ficava praticamente impossivel de ver os pontos então
                  //implementei essa solução
                  d_distance_near.push(L.circleMarker(pointsGrid[i], {radius: 1.6, weight: 1,fillColor: cor,fillOpacity:1, color: cor,renderer: myRendererTaxi}).bindPopup(""+d[0]));
                  d1_distance_near.push(L.circleMarker(pointsGrid[i], {radius: 3.2, weight: 1,fillColor: cor,fillOpacity:1, color: cor,renderer: myRendererTaxi}).bindPopup(""+d[0]));
                  d2_distance_near.push(L.circleMarker(pointsGrid[i], {radius: 6.4, weight: 1,fillColor: cor,fillOpacity:1, color: cor,renderer: myRendererTaxi}).bindPopup(""+d[0]));
                  d3_distance_near.push(L.circleMarker(pointsGrid[i], {radius: 9.6, weight: 1,fillColor: cor,fillOpacity:1, color: cor,renderer: myRendererTaxi}).bindPopup(""+d[0]));
                  pdisponiveis--;              
                }
            }
            //quanto os marcadores estiverem gerados na quantidade limite o loop é interrompido.
            indice+=limite;
          });

        }
    }
  });
}
//-------------------------------------------------------------------------------------
mapVis03.on('zoomend', function() {
  Vis03TutorialFunction();
});
var infoVis03=L.control();
infoVis03.onAdd = function (mymap) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};
var legendVis03 = L.control({position: 'bottomright'});
legendVis03.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend');
  for (var i = (grades_distance.length-1); i >=0 ; i--) {
    div.innerHTML +='<i style="color:#'+color_distance(grades_distance[i])+'; background:#'+color_distance(grades_distance[i])+'"></i>'+grades_distance[i]+'</br>';
  }
  return div;
};
legendVis03.addTo(mapVis03);
function Vis03TutorialFunction(){
  if(layerTuto3!= null){
    layerTuto3.clearLayers();
    pontos.clearLayers();
  }
  layerTuto3 =L.geoJson(distance_near_geodata,
    {
      style: function(feature){
        if(feature.properties.highlight==1){
          if(feature.properties.id==0){
            return {
              weight: 3.5,
              opacity: 1,
              fillOpacity: 0,
              color: '#e66101'
            };
          }else{
            return {
              weight: 3.5,
              opacity: 1,
              fillOpacity: 0,
              color: '#d01c8b'
            };
          }
        }else{
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
  }}).addTo(mapVis03);
  var nZoom= mapVis03.getZoom();
  if(nZoom>9){
    pontos = L.layerGroup(d3_distance_near);
  }else if(nZoom>8){
    pontos = L.layerGroup(d2_distance_near);
  }else if(nZoom>7){
    pontos = L.layerGroup(d1_distance_near);
  }else{
    pontos = L.layerGroup(d_distance_near);
  }
  pontos.addTo(mapVis03);
  infoVis03.update = function (props) {
    this._div.innerHTML= infoprops(props);
  };
  infoVis03.addTo(mapVis03);
}
//--------------------------------------------------------------------------------------
// é preciso gerar os pontos antes de chamar a func que desenha o mapa se não o mapa fica vazio sem pontos;
// no teste com o usuário não tem esse problema pq enquanto ele esta passando pelos passos iniciais os pontos são carregados
// aqui utilizei a abordagem a baixo. Quanto + pontos no mapa + tempo pra gerar + tempo antes de chamar a func que desenha os pontos.
setTimeout(async function(){
  pontos_distance_near();
  await sleep(3000);
  Vis03TutorialFunction();
  bring_front(mapVis03);
}, 500);

