angular.module('sgData', [])

    .service('$sgData', ["$http", function($http){
        this.getClientInfoById = function(id)
        {
            $http.get("/data/clients.json").then(function(response){
                var data = response.data;

                if (data[id] != undefined)
                {
                    return data[id];
                }
                else
                    return {};
            }, function(response) {
                console.log("Erreur de recuperation de fichier.");
            });
        };
    }])
;
