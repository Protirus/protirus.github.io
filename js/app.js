var myApp = angular.module('myApp', []);
myApp.controller('myController', function ($scope, $http) {   

    var req = {
        method: 'GET',
        url: 'https://api.github.com/orgs/protirus/repos',
        headers: {
          'Accept': 'application/vnd.github.mercy-preview+json'
        }
    }

    loadRepos = () => {
        $http(req)
        .then(function(response) {
            $scope.repos = response.data; //.map(r => r.name);
            //console.log($scope.repos);
        });
    }
    
    $scope.init = () => {
        loadRepos();
    };

});