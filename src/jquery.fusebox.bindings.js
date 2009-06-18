(function($) {
  var handleContainer = function(action) {
    return function(event, data) {
      data = data || {};
      $.fusebox.container()
        [$.fusebox.container.fx[action].fn](    // call the show/hide method
          $.fusebox.container.fx[action].speed, // set speed
          data.callback || function() {}        // optional callback
        )
        .css({
          left: $(window).width()/2 - ($.fusebox.container().width()/2) // center
        });
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

        var fuseboxTargetSelector = $(this).data("fuseboxTargetSelector");

        if(typeof(fuseboxTargetSelector) == "undefined") return true;

        $.fusebox.container.show(fuseboxTargetSelector);
        return false;
      }
    }
  });
  $(document)
    .bind("close.fusebox", $.fusebox.bindings.close)
    .bind("showContainer.fusebox", handleContainer("show"))
    .bind("hideContainer.fusebox", handleContainer("hide"));
})(jQuery);
