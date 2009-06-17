(function($) {
  var handleContainer = function(action) {
    return function(event, data) {
      data = data || {};
      $.fusebox.container()
        [$.fusebox.container.fx[action].fn]($.fusebox.container.fx[action].speed, data.callback || function() {})
        .css("left", $(window).width()/2 - ($.fusebox.container().width()/2)); // center in the browser
    };
  };
  
  $.extend($.fusebox, {
    bindings: {
      close: function() {
        $(document).unbind("keydown.fusebox");
        $.fusebox.container.hide();
      },
      keydown: function(event) {
        if(event.keyCode == 27) { $.fusebox.close(); }
        return true;
      },
      click: function() {
        $(document)
          .bind("keydown.fusebox", $.fusebox.bindings.keydown)
          .trigger("loading.fusebox");
        if(typeof($(this).data("fuseboxTargetSelector")) == "undefined") { return true; }
        $.fusebox.container.show($(this).data("fuseboxTargetSelector"));
        return false;
      }
    }
  });
  $(document)
    .bind("close.fusebox", $.fusebox.bindings.close)
    .bind("showContainer.fusebox", handleContainer("show"))
    .bind("hideContainer.fusebox", handleContainer("hide"));
})(jQuery);
