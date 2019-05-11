var myApp = angular.module('myApp', []);
myApp.controller('myController', function ($scope, $http, $filter) {   

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
            $scope.filteredRepos = $scope.repos;
            var topics = [...new Set([].concat.apply([], response.data.map(r => r.topics)))];
            
            $scope.topics = topics.map(t => ({name: t}));
            
            topics.forEach(t => {
                $scope.topicOptions[t] = true;
            });
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

    const optionExists = (topics) => {
        var exists = false;
        angular.forEach(topics, function(value, key) {
            if ($scope.topicOptions[value] === true) {
                exists = true;
            }
        });
        return exists;
    }

    const filterRepos = (repo) => {
        var topics = repo.topics;
        if (topics && topics.length > 0) {
            var exists = optionExists(topics);
            if (exists) {
                return repo;
            }
        }
    }

    $scope.orderOptions = [
        { name:'Name', prop:'name' }, 
        { name:'Updated', prop:'updated_at' }, 
        { name:'Created', prop:'created_at' }
    ];

    $scope.orderProp = 'name';
    $scope.setOrder = function (orderProp) {
        $scope.orderProp = orderProp;
    };

    $scope.OpenRepository = (repo) => {
        window.open(repo.html_url);
    }

    $scope.filterRepos = filterRepos;

    $scope.init = () => {
        loadRepos();

        $scope.topicOptions = $scope.topicOptions || {};
        $scope.$watch(() => $scope.topicOptions, filterRepos, true);
    };
});