(function () {
  'use strict';

  function createElement(tag, children) {
      return {
          tag: tag,
          children: children,
      };
  }
  function render(vn) {
      var txtNode = document.createTextNode(vn["children"]);
      return document.createElement("div").appendChild(txtNode);
  }
  function mount(el, node) {
      el.append(node);
  }
  var vn = createElement('div', 'foobarbaz');
  var $app = document.getElementById('app');
  mount($app, render(vn));

}());
