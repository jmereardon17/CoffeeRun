(function (window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;
  var myTruck = new Truck('Galactica', new DataStore());
  window.myTruck = myTruck;
  var formHandler = new FormHandler(FORM_SELECTOR);
  var slider = $('#strengthLevel');
  var sliderLabel = slider.prev();
  var text = sliderLabel.text();

  slider.on('change', function () {
    sliderLabel.text(text + ' ' + '(' + this.value + ')');
    sliderLabel.removeClass();
    if (this.value < 30) {
      sliderLabel.addClass('text-success');
    } else if (this.value < 50) {
      sliderLabel.addClass('text-warning');
    } else sliderLabel.addClass('text-danger');
  });

  formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
  console.log(formHandler);
})(window);
