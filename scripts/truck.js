(function (window) {
  'use strict';
  var App = window.App || {};

  function Truck(truckId, db) {
    this.truckId = truckId;
    this.db = db;
  }

  Truck.prototype.createOrder = function (order) {
    this.db.add(order.emailAddress, order);
    var showAchievement = order.size === 'trenta' && order.strength >= 50 && order.flavor !== '';
    if (showAchievement) this.showAchievement();
  };

  Truck.prototype.showAchievement = function () {
    $('.modal').modal('show');
    $('.modal .btn-default').on('click', function () {
      $('#emailInput').on('blur', function () {
        if (this.value) $('.power-up').removeClass('hide');
      });
    });
  };

  Truck.prototype.deliverOrder = function (customerId) {
    this.db.remove(customerId);
  };

  Truck.prototype.printOrders = function () {
    var customerIdArray = Object.keys(this.db.getAll());

    console.log('Truck #' + this.truckId + ' has pending orders:');
    customerIdArray.forEach(
      function (id) {
        console.log(this.db.get(id));
      }.bind(this)
    );
  };

  App.Truck = Truck;
  window.App = App;
})(window);
