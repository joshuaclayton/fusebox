(function($) {
  $.fusebox = {
    close: function() {
      $(document).trigger("close.fusebox");
      return false;
    },
    display: function(selector) {
      $.fusebox.container()
        .children(".fusebox").hide().end()                                     // hide all children
        .find(".fusebox:has(" + selector + ")").show().end()                   // display current selector
        .fadeIn("slow")                                                        // display .fusebox-container
        .css("left", $(window).width()/2 - ($.fusebox.container().width()/2)); // position correctly
    },
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
        $(document).bind("keydown.fusebox", $.fusebox.bindings.keydown).trigger("loading.fusebox");
        if(typeof($(this).data("fuseboxTargetSelector")) == "undefined") { return true; }
        $.fusebox.container.show($(this).data("fuseboxTargetSelector"));
        return false;
      }
    }
  };
  $(document).bind("close.fusebox", $.fusebox.bindings.close);
})(jQuery);
