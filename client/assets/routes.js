var myApp = angular.module('myApp', ['ngRoute','ngCookies']);

myApp.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
      templateUrl: 'partials/index.html',
      controller: 'usersController as uc'
    })
    .when('/appointments', {
      templateUrl: 'partials/appointments.html',
      controller: 'appointmentsController as ac'
    })
    .when('/newAppointment', {
      templateUrl: 'partials/newAppointment.html',
      controller: 'appointmentsController as ac'
    })
    .otherwise({
      redirectTo: '/'
    });
});
