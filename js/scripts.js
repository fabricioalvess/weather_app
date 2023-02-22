
$(function(){


// *** APIs ***
// clima, previsão 12 horas e previsão 5 dias: https://developer.accuweather.com/apis
// pegar coordenadas geográficas pelo nome da cidade: https://docs.mapbox.com/api/
// pegar coordenadas do IP: http://www.geoplugin.net
// gerar gráficos em JS: https://www.highcharts.com/demo

//"http://dataservice.accuweather.com/currentconditions/v1/28143?apikey=FxduNFSbjExWvFT1w07AMGw7PeHyPyjz&language=pt-br"
    var accuweatherAPIKey = "FxduNFSbjExWvFT1w07AMGw7PeHyPyjz";

        function pegarTempoAtual(localCode){

            $.ajax({
                url: "http://dataservice.accuweather.com/currentconditions/v1/"+localCode+"?apikey="+accuweatherAPIKey+"&language=pt-br",
                type:"GET",
                dataType:"json",
                success: function(data){
                    console.log(data)
                },
                error: function(){
                    console.log("Error")
                }
            });
        }

        function pegarLocalUsuario(lat,long){
            $.ajax({
                url:"http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey="+accuweatherAPIKey+"&q="+lat+"%2C"+long+"&language=pt-br",
                type:"GET",
                dataType:"json",
                success: function(data){
                    var localCode = data.Key;
                    pegarTempoAtual(localCode);
                },
                error: function(){
                    console.log("Error")
                }
            });
        }

        pegarLocalUsuario(-23.620471827313796,-46.503847302605195)
    });
