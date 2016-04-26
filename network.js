  
var app = angular.module('networks', []);

app.controller('NetworksController', ['$http', function($http) {

    this.networks = [];
    var _this = this;

    $http.get('js/network.json')
        .success(function(data) {
            console.log(data);
            console.log(this);
            _this.share = data;
        })
        .error(function(msg) {
            console.log("This request failed.\n" + msg);
        });
    
}]);