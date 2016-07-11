// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider){

  $ionicConfigProvider.tabs.position("botton");
  $ionicConfigProvider.navBar.alignTitle("center");

  $stateProvider
      
      .state('tab', {
        url: '/tab',
        abstract : true,
        templateUrl: 'templates/tab.html'
      })

      .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'templates/home.html'
          }
        }
      })
      .state('tab.sucursales', {
        url: '/sucursales',
        views: {
          'tab-sucursales': {
            templateUrl: 'templates/sucursales.html',
            controller: 'SucursalesCtrl'
          }
        }
      })
      .state('tab.servicios', {
        url: '/servicios',
        views: {
          'tab-servicios': {
            templateUrl: 'templates/servicios.html',
            controller: 'ServiciosCtrl'
          }
        }
      })
      .state('tab.detalleservicio', {
        url: '/detalleservicio/:id',
        views: {
          'tab-detalleservicio': {
            templateUrl: 'templates/detalleservicio.html',
            controller: 'DetalleServiciosCtrl'
          }
        }
      })
      .state('tab.contactanos', {
        url: '/contactanos',
        views: {
          'tab-contactanos': {
            templateUrl: 'templates/contactanos.html'
          }
        }
      })
      
  $urlRouterProvider.otherwise('/tab/home');    
})


.controller('ServiciosCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){
  $http.get('js/data.json')
  .success(function(data){
    $scope.servicios = data.servicios;
  });
}])

.controller('DetalleServiciosCtrl', ['$scope', '$http', '$state', function($scope, $http, $state){
  $http.get('js/data.json')
  .success(function(data){
    $scope.data = data.servicios[$state.params.id];
  });
}])

.controller('SucursalesCtrl', function($scope){
  $scope.getPosicion = function(){
    var form = this;
    navigator.geolocation.getCurrentPosition(function(posicion){
      form.posicion = posicion.coords.latitude + " -- " + posicion.coords.longitude
    });
  }
})