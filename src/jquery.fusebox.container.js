(function($) {
  var displayFuseboxContents = function(selector) {
    $(".fusebox-container")
      .children(".fusebox").hide().end()                    // hide all children
      .find(".fusebox:has(" + selector + ")").show().end()  // display current selector
      .fadeIn("slow")                                       // display .fusebox-container
      .css("left", $(window).width()/2 - ($(".fusebox-container").width()/2)); // position correctly
  };
  
  $.fusebox.container = {
    initialize: function() {
      if($(".fusebox-container").length > 0) { return; }
      $("body").append($("<div class='fusebox-container'>").append($("<div class='ui-widget-shadow'>")));
    },
    append: function(element) {
      var transform = arguments[1] || function(element) { 
        return $("<div class='fusebox ui-widget-content'>").append(element);
      };
      $(".fusebox-container").append(transform(element));
    },
    show: function(selector) {
      $(document).trigger("beforeShow.fusebox");
      if($(".fusebox-container").is(":visible")) {
        $(".fusebox-container").fadeOut("slow", function() {
          displayFuseboxContents(selector);
        });
      } else {
        $(".fusebox-container").hide();
        displayFuseboxContents(selector);
      }
      $(document).trigger("show.fusebox").trigger("afterShow.fusebox");
    },
    hide: function() {
      $(document).trigger("beforeHide.fusebox");
      $(".fusebox-container").fadeOut("slow");
      $(document).trigger("hide.fusebox").trigger("afterHide.fusebox");
    }
  };
})(jQuery);