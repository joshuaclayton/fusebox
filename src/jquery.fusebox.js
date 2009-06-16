(function($) {
  $.fusebox = {
    close: function() {
      $(document).trigger("close.fusebox");
      return false;
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
