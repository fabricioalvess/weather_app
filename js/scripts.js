
$(function(){


// *** APIs ***
// clima, previsão 12 horas e previsão 5 dias: https://developer.accuweather.com/apis
// pegar coordenadas geográficas pelo nome da cidade: https://docs.mapbox.com/api/
// pegar coordenadas do IP: http://www.geoplugin.net
// gerar gráficos em JS: https://www.highcharts.com/demo

//"http://dataservice.accuweather.com/currentconditions/v1/28143?apikey=FxduNFSbjExWvFT1w07AMGw7PeHyPyjz&language=pt-br"
    var accuweatherAPIKey = "FxduNFSbjExWvFT1w07AMGw7PeHyPyjz";

        var weatherObj = {
            cidade:"",
            estado:"",
            pais:"",
            temperatura:"",
            texto_clima:"",
            icone_clima:""
        };

        function preencherClimaAgora(cidade, estado,pais,temperatura,texto_clima,icone_clima){
            var texto_local = cidade + ". " + estado + ". " + pais;

            $("#texto_local").text(texto_local);
            $("#texto_clima").text(texto_clima);
            $("#texto_temperatura").html(String(temperatura)+"&deg");
            $("#icone_clima").css("background-image","url('" + weatherObj.icone_clima + " ')" );

        }

        function pegarTempoAtual(localCode){

            $.ajax({
                url: "http://dataservice.accuweather.com/currentconditions/v1/"+localCode+"?apikey="+accuweatherAPIKey+"&language=pt-br",
                type:"GET",
                dataType:"json",
                success: function(data){
                    console.log("current condition: ",data)

                    weatherObj.temperatura = data[0].Temperature.Metric.Value;

                    weatherObj.texto_clima = data[0].WeatherText;

                    var iconNumber = data[0].WeatherIcon <= 9? "0"+ String(data[0].WeatherIcon) :String(data[0].WeatherIcon)

                    weatherObj.icone_clima="https://developer.accuweather.com/sites/default/files/"+ iconNumber +"-s.png";

                   preencherClimaAgora(weatherObj.cidade,  weatherObj.estado,weatherObj.pais, weatherObj.temperatura, weatherObj.texto_clima, weatherObj.icone_clima);

                   
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
                    console.log("geoposition:",data);

                    try{
                        weatherObj.cidade =data.ParentCity.LocalizedName;
                    }catch{
                        weatherObj.cidade=data.LocalizedName;
                    }

                    weatherObj.estado = data.AdministrativeArea.LocalizedName;
                    weatherObj.pais = data.Country.LocalizedName;


                    var localCode = data.Key;
                    pegarTempoAtual(localCode);


                },
                error: function(){
                    console.log("Error")
                }
            });
        }

        
        

        function pegarCordenadasDoIp(){
           // , 
            var lat_padrao =-24.156619831043763;
            var long_padrao =-46.78810958867326;

            $.ajax({
                url:"http://www.geoplugin.net/json.gp",
                type:"GET",
                dataType:"json",

                success: function(data){
                    if(data.Latitude && data.Longitude ){
                       
                        pegarLocalUsuario(data.Latitude,data.Longitude)
                    }else{
                        pegarLocalUsuario(lat_padrao,long_padrao);
                    }
                },

                error: function(){
                    console.log("Error")
                }
            });
        }
        pegarCordenadasDoIp();


    });