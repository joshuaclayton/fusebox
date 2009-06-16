(function($) {
  var fuseboxContainerClass = "fusebox-container";

  $.fusebox.container = function() { return $("." + fuseboxContainerClass); };
  $.extend($.fusebox.container, {
    initialize: function() {
      if($.fusebox.container().length > 0) { return; }
      $("body").append($("<div class='" + fuseboxContainerClass + "'><div class='ui-widget-shadow'></div></div>"));
    },
    append: function(element) {
      $.fusebox.container().append($("<div class='fusebox ui-widget-content'>").append(element));
    },
    show: function(selector) {
      $(document).trigger("beforeShow.fusebox");
      if($.fusebox.container().is(":visible")) {
        $.fusebox.container().fadeOut("slow", function() { 
          $.fusebox.display(selector);
        });
      } else {
        $.fusebox.container().hide();
        $.fusebox.display(selector);
      }
      $(document).trigger("show.fusebox").trigger("afterShow.fusebox");
    },
    hide: function() {
      $(document).trigger("beforeHide.fusebox");
      $.fusebox.container().fadeOut("slow");
      $(document).trigger("hide.fusebox").trigger("afterHide.fusebox");
    }
  });
})(jQuery);
