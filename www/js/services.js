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

    .factory('$localstorage', ['$window', function($window) {
        return {
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }
    }])
;
