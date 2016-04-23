  
var app = angular.module('share', []);

app.controller('SharesController', ['$http', function($http) {

    this.share = [];
    var _this = this;

    $http.get('js/share.csv')
        .success(function(data) {
            console.log(data);
            console.log(this);
            _this.share = data;
        })
        .error(function(msg) {
            console.log("This request failed.\n" + msg);
        });

    
}]);