var myApp = angular.module('myApp', []);
myApp.controller('myController', function ($scope, $http) {   

    loadRepos = () => {
        $http.get('https://api.github.com/orgs/protirus/repos')
        .then(function(response) {
            $scope.repos = response.data; //.map(r => r.name);
            console.log($scope.repos);
        });
    }
    
    $scope.init = () => {
        loadRepos();
    };

    $scope.OpenRepository = (index) => {
        var repo = $scope.repos[index];
        window.open(repo.html_url);
    }
});