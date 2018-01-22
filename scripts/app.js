var myApp = angular.module('myApp', ['ngMessages', 'ngResource', 'ngRoute']);

myApp.config(function($routeProvider) {

    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/main.html',
        controller: 'mainController'
    })

    .when('/second', {
        templateUrl: 'pages/second.html',
        controller: 'secondController'
    })

    .when('/second/:num', {
        templateUrl: 'pages/second.html',
        controller: 'secondController'
    })

});

myApp.service('nameService', function() {
    var self = this;
    this.name = 'John Doe';
    this.namelength = function() {
        return self.name.length;
    }
})

myApp.controller('mainController', ['$scope', '$filter', '$http', '$log', 'nameService', function($scope, $filter, $http, $log, nameService) {

    $scope.people = [
        {
            name: 'John Doe',
            address: '555 Main St.',
            city: 'New York',
            state: 'NY',
            zip: '11111'
        },
        {
            name: 'Jane Doe',
            address: '333 Second St.',
            city: 'Buffalo',
            state: 'NY',
            zip: '22222'
        },
        {
            name: 'George Doe',
            address: '111 Third St.',
            city: 'Miami',
            state: 'FL',
            zip: '33333'
        }
    ]

    $scope.formattedAddress = function(person) {
        return person.address + ', ' + person.city + ', ' + person.state + ' ' + person.zip;
    };

    $scope.handle = '';
    $scope.name = nameService.name;

    // $log.log(nameService.name);
    // $log.log(nameService.namelength());

    $scope.$watch('name', function() {
        nameService.name = $scope.name;
    });

    $scope.lowercasehandle = function() {
        return $filter('lowercase')($scope.handle);
    };

    $scope.characters = 5;

    $http.get('/data.json')
    .success(function(result) {
        $scope.scenes = result;
    })

    .error(function(data, status) {
        console.log(data);
        console.log(status);
    })

    $scope.newScene = '';
    $scope.addScene = function() {
        $http.post('/data.json', { newScene: $scope.newScene })
        .success(function(result) {
           $scope.scene = result;
           $scope.newScene = '';
        })

        .error(function(data, status) {
            console.log(data);
        });
    }
    $log.main = 'Peoperty from main';
}]);

myApp.controller('secondController', ['$scope', '$routeParams', '$log', 'nameService', function($scope, $routeParams, $log, nameService) {
    $scope.name = nameService.name;
    $scope.num = $routeParams.num || 1;
    $log.second = 'Peoperty from second';
    $scope.$watch('name', function() {
        nameService.name = $scope.name;
    });

}]);

myApp.directive('searchResult', function() {
    return {
        restrict: 'AECM',
        templateUrl: 'directives/searchresult.html',
        replace: true,
        scope: {
            personObject: '=',
            formattedAddressFunction: '&'
        },
        transclude: true
    }
});