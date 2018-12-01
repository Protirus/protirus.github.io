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
        
        var sortedRepos = [];
        repos.forEach(element => {

            if (element.name != "protirus.github.io") {
                sortedRepos.push(element);
            }
        });

        sortedRepos.sort(function(a, b) {
            return new Date(b.date) - new Date(a.date);
        }).reverse();

        return sortedRepos;
    }

    $scope.GetRepositoryImage = (index) => {

        if (index < 0)
        {
            return 
        }
    }

    $scope.OpenRepository = (index) => {
        var repo = $scope.repos[index];
        window.open(repo.html_url);
    }
});