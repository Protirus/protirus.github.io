var myApp = angular.module('myApp', []);
myApp.controller('myController', function ($scope, $http) {   

    $scope.init = () => {
        loadRepos();
    };

    loadRepos = () => {
        $http.get('https://api.github.com/orgs/protirus/repos')
        .then(function(response) {
            //$scope.repos = response.data; //.map(r => r.name);
            //console.log($scope.repos);

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

    $scope.OpenRepository = (index) => {
        var repo = $scope.repos[index];
        window.open(repo.html_url);
    }
});

function compare(first, second) {
    if (first.last_nom < second.last_nom)
        return -1;
    if (first.last_nom > second.last_nom)
      return 1;
   return 0;
}