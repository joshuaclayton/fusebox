(function($) {
  var fuseboxContainerClass = "fusebox-container",
      displayFuseboxContainer = function(selector) {
        $.fusebox.container()
          .children(".fusebox").hide().end()                    // hide all children
          .find(".fusebox:has(" + selector + ")").show().end(); // display current selector
        $(document).trigger("showContainer.fusebox");           // display fusebox container
      };

  $.fusebox.container = function() {
    return $("." + fuseboxContainerClass);
  };

  $.extend($.fusebox.container, {
    initialize: function() {
      if($.fusebox.container().length > 0) { return; }
      $("body").append(
        $("<div class='" + fuseboxContainerClass + "'>\
            <div class='ui-widget-shadow'></div>\
          </div>")
      );
    },
    append: function(element) {
      $.fusebox.container().append(
        $("<div class='fusebox ui-widget-content'>").append(element)
      );
    },
    fx: {
      show: {fn: "fadeIn",  speed: "slow"},
      hide: {fn: "fadeOut", speed: "slow"}
    },
    show: function(selector) {
      $(document).trigger("beforeShow.fusebox");
      if($.fusebox.container().is(":visible")) {
        $(document).trigger("hideContainer.fusebox", {
          callback: function() { displayFuseboxContainer(selector); }
        });
      } else {
        $.fusebox.container().hide();
        displayFuseboxContainer(selector);
      }
      $(document).trigger("show.fusebox").trigger("afterShow.fusebox");
    },
    hide: function() {
      $(document)
        .trigger("beforeHide.fusebox")
        .trigger("hideContainer.fusebox")
        .trigger("hide.fusebox").trigger("afterHide.fusebox");
    }
  });
})(jQuery);
