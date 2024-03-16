(function (window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  CheckList.prototype.addClickHandler = function (fn) {
    var isSingleClick = true;
    this.$element.on(
      'click',
      'input',
      function (event) {
        isSingleClick = true;
        setTimeout(() => {
          if (isSingleClick) {
            $(event.target).parent().parent().css({ background: 'gray', color: 'white' });
            window.setTimeout(function () {
              console.log('deliver order');
              myTruck.deliverOrder(event.target.value);
              checkList.removeRow(event.target.value);
            }, 3000);
          }
        }, 250);
      }.bind(this)
    );

    this.$element.on('dblclick', function (event) {
      isSingleClick = false;
      formHandler.reloadData(myTruck.getOrder(event.target.value));
    });
  };

  CheckList.prototype.addRow = function (coffeeOrder) {
    // Remove any existing rows that match the email address
    this.removeRow(coffeeOrder.emailAddress);
    // Create a new instance of a row, using the coffee order info
    var rowElement = new Row(coffeeOrder);
    // Add the new row instance's $element property to the checklist
    this.$element.append(rowElement.$element);
  };

  CheckList.prototype.removeRow = function (email) {
    this.$element
      .find('[value="' + email + '"]')
      .closest('[data-coffee-order="checkbox"')
      .remove();
  };

  CheckList.prototype.editRow = function (data) {
    var description = ' [' + data.strength + 'x] ';
    description += data.size + ' ';

    if (data.flavor) {
      description += data.flavor + ' ';
    }

    description += data.coffee + ', ';
    description += ' (' + data.emailAddress + ')';

    this.$element
      .find('[value="' + data.emailAddress + '"]')
      .closest('label')
      .contents()
      .last()[0].textContent = description;
  };

  function Row(coffeeOrder) {
    var $div = $('<div></div>', {
      'data-coffee-order': 'checkbox',
      class: 'checkbox'
    });

    if (coffeeOrder.strength < 30) {
      $div.addClass('bg-success');
    } else if (coffeeOrder.strength < 50) {
      $div.addClass('bg-warning');
    } else $div.addClass('bg-danger');

    var $label = $('<label></label>');

    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress
    });

    var description = ' [' + coffeeOrder.strength + 'x] ';
    description += coffeeOrder.size + ' ';
    if (coffeeOrder.flavor) {
      description += coffeeOrder.flavor + ' ';
    }

    description += coffeeOrder.coffee + ', ';
    description += ' (' + coffeeOrder.emailAddress + ')';

    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    this.$element = $div;
  }

  App.CheckList = CheckList;
  window.App = App;
})(window);
