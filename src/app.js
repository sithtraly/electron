var app = angular.module('myApp', ['ngRoute'])

const config = ['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', { templateUrl: './views/home.html', controller: 'HomeController' })
    .when('/customers', { templateUrl: './views/customer.html', controller: 'CustomerController' })
    .when('/newCustomer', { templateUrl: './views/customer.new.html', controller: 'NewCustomerController' })
    .otherwise({ redirectTo: '/' })
}]

app.config(config)
app.factory('ShareData', () => {
  let data
  return {
    get: () => data,
    set: (value) => data = value
  }
})

function success(text, fn) {
  Swal.fire({ title: 'ជោគជ័យ', text, icon: 'success', showCloseButton: true, confirmButtonText: "បិទ", didClose: () => {fn()} })
}
function fail(text, fn) {
  Swal.fire({ title: 'បរាជ័យ', text, icon: 'error', showCloseButton: true, confirmButtonText: "បិទ", didClose: () => {fn()} })
}
function warning(text, fn) {
  Swal.fire({ title: 'បម្រាម', text, icon: 'warning', showCloseButton: true, confirmButtonText: "បិទ", didClose: () => {fn()} })
}
function question(text, fn) {
  Swal.fire({ title: 'សំណួរ', text, icon: 'question', showCloseButton: true, confirmButtonText: "បិទ", didClose: () => {fn()} })
}