var myApp = angular.module('myApp', []);
myApp.controller('myController', function ($scope, $http, $filter) {   

    $scope.init = () => {
        loadRepos();

        $scope.topicOptions = $scope.topicOptions || {};
        //$scope.$watch(() => $scope.topicOptions, filterTickets, true);
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
            console.log('data', response.data);
            var topics = [...new Set([].concat.apply([], response.data.map(r => r.topics)))];
            
            $scope.topics = topics.map(t => ({name: t}));
            console.log('topics', $scope.topics);
            
            topics.forEach(t => {
                $scope.topicOptions[t] = true;
            });
            console.log('topicsOptions', $scope.topicOptions);
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

    // $scope.filterRepos = (repo) => {
    //     console.log('repo', repo);
    //     // $scope.repos = $scope.repos.$filter(
    //     //     t => $scope.topicOptions[t.topics]
    //     // );
    //     return $scope.topicOptions[repo.topics];
    // }

    // $scope.toggleOptions = (options, event, item) => {
    //     if (event.ctrlKey) {
    //         var count = 0;
    //         Object.keys(options).forEach(function(option){
    //             console.log('option', option);
    //             console.log('options[option]', options[option]);
    //             count += options[option] ? 1 : 0;
    //         });

    //         if (count === 1) {
    //             Object.keys(options).forEach(k => options[k] = true);
    //         } else {
    //             Object.keys(options).forEach(k => options[k] = false);
    //             options[item] = true;
    //         }
    //     } else {
    //         options[item] = !options[item];
    //     }
    // };

    $scope.orderOptions = [
        { name:'name' }, 
        { name:'updated_at' }, 
        { name:'created_at' }
    ];

    $scope.orderProp = 'name';
    $scope.setOrder = function (orderProp) {
        console.log(orderProp);
        $scope.orderProp = orderProp;
    };

    $scope.OpenRepository = (repo) => {
        window.open(repo.html_url);
    }
});