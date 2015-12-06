angular.module('md.data.table').directive('mdClickRow', mdClickRow);

function mdClickRow($mdTable) {
  'use strict';
  
  function template(tElement, tAttrs) {
    var ngRepeat = $mdTable.parse(tAttrs.ngRepeat);
    var onSelectClick = tAttrs.onSelectClick;

    if(angular.isDefined(tAttrs.mdAutoSelect)) {
      tAttrs.$set('ngClick', 'toggleRow(' + ngRepeat.item + ', "' + onSelectClick + '", $event )');
    }
  }
  
  function postLink(scope, element, attrs, tableCtrl) {
    var model = {};
    var ngRepeat = $mdTable.parse(attrs.ngRepeat);
    
    if(!angular.isFunction(scope.isDisabled)) {
      scope.isDisabled = function () { return false; };
    }
    
    tableCtrl.isDisabled = function (item) {
      model[ngRepeat.item] = item;
      return scope.isDisabled(model);
    };
  }
  
  return {
    link: postLink,
    priority: 1001,
    require: '^^mdDataTable',
    scope: {
      isDisabled: '&?mdDisableSelect'
    },
    template: template
  };
}

mdClickRow.$inject = ['$mdTable'];
