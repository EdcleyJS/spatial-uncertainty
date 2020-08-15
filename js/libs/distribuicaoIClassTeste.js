class distribuicaoIntervalo {
  constructor(dist,left,right) {
    this.left=left;
    this.right=right;
    this.dist= dist;//distrib(feature);
    this.dist= this.dist.sort(function(a, b){return a - b});
    this.cdfintervalo= function cdfintervalo(){
                var prob= (d3.bisectRight(this.dist, right) - d3.bisectLeft(this.dist, left))/this.dist.length;
                return prob;
              };
    this.media= function media(){
      var sum=0;
      this.dist.forEach(function(d,i){
        sum+=Number(d);
      });
      var media= sum/this.dist.length;
      return media;
    };
    this.variancia= function variancia(){
      var sum=0,aux;
      this.dist.forEach(function(d,i){
        sum+=Number(d);
      });
      var media= sum/this.dist.length;
      sum=0;
      this.dist.forEach(function(d,i){
        aux= Number(d- media);
        aux= aux*aux;
        sum+= aux;
      });
      var variancia= sum/this.dist.length;
      return variancia;
    };
    this.desvio = function desviopadrao(){
      var sum=0,aux;
      this.dist.forEach(function(d,i){
        sum+=Number(d);
      });
      var media= sum/this.dist.length;
      sum=0;
      this.dist.forEach(function(d,i){
        aux= Number(d- media);
        aux= aux*aux;
        sum+= aux;
      });
      var variancia= sum/this.dist.length;
      return Math.sqrt(variancia);
    };
    this.quartil = function quartis(){
      var distO=this.dist;
      distO.sort(function(a, b){return a-b});
      var n=dist.length;
      var Q1= 0.25*(n+1);
      if(Q1 % 1 !== 0){
        Q1=((distO[Math.ceil(Q1)]+distO[Math.floor(Q1)])/2);
      }else{
        Q1= distO[Q1];
      }
      var Q2= 0.50*(n+1);
      if(Q2 % 1 !== 0){
        Q2=((distO[Math.ceil(Q2)]+distO[Math.floor(Q2)])/2);
      }else{
        Q2= distO[Q2];
      }
      var Q3= 0.75*(n+1);
      if(Q3 % 1 !== 0){
        Q3=((distO[Math.ceil(Q3)]+distO[Math.floor(Q3)])/2);
      }else{
        Q3= distO[Q3];
      }
      var DQ= Math.floor((Q3-Q1)* 100)/100;
      return [DQ,Q1,Q2,Q3];
    }
  }
}