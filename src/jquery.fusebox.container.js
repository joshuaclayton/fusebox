(function($) {
  var fuseboxContainerClass = "fusebox-container",
      displayFuseboxContainer = function(selector) {
        $.fusebox.container()
          .children(".fusebox").hide().end()                                     // hide all children
          .find(".fusebox:has(" + selector + ")").show().end()                   // display current selector
          [$.fusebox.container.fx.show.fn]($.fusebox.container.fx.show.speed)    // display .fusebox-container
          .css("left", $(window).width()/2 - ($.fusebox.container().width()/2)); // position correctly
      };

  $.fusebox.container = function() { return $("." + fuseboxContainerClass); };

  $.extend($.fusebox.container, {
    initialize: function() {
      if($.fusebox.container().length > 0) { return; }
      $("body").append($("<div class='" + fuseboxContainerClass + "'><div class='ui-widget-shadow'></div></div>"));
    },
    append: function(element) {
      $.fusebox.container().append($("<div class='fusebox ui-widget-content'>").append(element));
    },
    fx: {
      show: {fn: "fadeIn",  speed: "slow"},
      hide: {fn: "fadeOut", speed: "slow"}
    },
    show: function(selector) {
      $(document).trigger("beforeShow.fusebox");
      if($.fusebox.container().is(":visible")) {
        $.fusebox.container()[$.fusebox.container.fx.hide.fn]($.fusebox.container.fx.hide.speed, function() { 
          displayFuseboxContainer(selector);
        });
      } else {
        $.fusebox.container().hide();
        displayFuseboxContainer(selector);
      }
      $(document).trigger("show.fusebox").trigger("afterShow.fusebox");
    },
    hide: function() {
      $(document).trigger("beforeHide.fusebox");
      $.fusebox.container()[$.fusebox.container.fx.hide.fn]($.fusebox.container.fx.hide.speed);
      $(document).trigger("hide.fusebox").trigger("afterHide.fusebox");
    }
  });
})(jQuery);
