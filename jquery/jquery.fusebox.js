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
(function($) {
  $.fn.fusebox = function(selector) {
    if($(this).length === 0) { return; }

    $.fusebox.container.initialize();
    $(".fusebox-target").live("click", $.fusebox.bindings.click);

    return this.each(function(index) {
      var $element = $(this), $fuseboxContent, fuseboxSelector;

      $.each($element.attr("class").split(/ /), function(idx, cssClass) {
        fuseboxSelector = ".fusebox-" + cssClass;
        if($(fuseboxSelector).length == 1) {
          $element.data("fuseboxTargetSelector", fuseboxSelector);
          $fuseboxContent = $(fuseboxSelector);
          return false;
        }
      });

      if(typeof($fuseboxContent) == "undefined") { return; }
      $.fusebox.container.append($fuseboxContent);
      $element.addClass("fusebox-target");
    });
  };
})(jQuery);
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
