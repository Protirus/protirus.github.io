var myApp = angular.module('myApp', []);
myApp.controller('myController', function ($scope, $http) {   

    $scope.init = () => {
        loadRepos();
    };

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
            $scope.repos = sortRepos(response.data);
        });
    }

    sortRepos = (repos) => {

        const index = repos.map(e => e.name).indexOf('protirus.github.io');
        repos.splice(index, 1);

        repos.sort(function(a, b) {
            return new Date(b.date) - new Date(a.date);
        }).reverse();

        return repos;
    }

    $scope.OpenRepository = (repo) => {
        window.open(repo.html_url);
    }
});