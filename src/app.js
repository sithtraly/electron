var app = angular.module('myApp', ['ngRoute'])

const config = ['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', { templateUrl: './views/home.html', controller: 'HomeController' })
    .when('/customers', { templateUrl: './views/customer.html', controller: 'CustomerController' })
    .when('/newCustomer', { templateUrl: './views/customer.new.html', controller: 'NewCustomerController' })
    .when('/products', { templateUrl: './views/product.html', controller: 'ProductController' })
    .when('/newProduct', { templateUrl: './views/product.new.html', controller: 'NewProductController' })
    .when('/orders', { templateUrl: './views/order.html', controller: 'OrderController' })
    .when('/newOrder', { templateUrl: './views/order.new.html', controller: 'NewOrderController' })
    .when('/reports', { templateUrl: './views/report.html', controller: 'ReportController' })
    .when('/invoice', { templateUrl: './views/invoice.html', controller: 'InvoiceController' })
    .when('/settings', { templateUrl: './views/setting.html', controller: 'SettingController' })
    .otherwise({ redirectTo: '/' })
}]

app.config(config)
app.factory('ShareData', () => {
  const data = {}
  return {
    get: (key) => data[key],
    set: (key, value) => data[key] = value
  }
})

function success(text, fn) {
  Swal.fire({ title: 'ជោគជ័យ', text, icon: 'success', showCloseButton: true, confirmButtonText: "បិទ", didClose: () => { fn() } })
}
function fail(text, fn) {
  Swal.fire({ title: 'បរាជ័យ', text, icon: 'error', showCloseButton: true, confirmButtonText: "បិទ", didClose: () => { fn() } })
}
function warning(text, fn) {
  Swal.fire({ title: 'បម្រាម', text, icon: 'warning', showCloseButton: true, confirmButtonText: "បិទ", didClose: () => { fn() } })
}
function question(text, fn) {
  Swal.fire({ title: 'សំណួរ', text, icon: 'question', showCloseButton: true, confirmButtonText: "បិទ", didClose: () => { fn() } })
}
