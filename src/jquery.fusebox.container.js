(function($) {
  var displayFuseboxContents = function(selector) {
    $(".fusebox-container")
      .children(".fusebox").hide().end()                    // hide all children
      .find(".fusebox:has(" + selector + ")").show().end()  // display current selector
      .fadeIn("slow")                                       // display .fusebox-container
      .css("left", $(window).width()/2 - ($(".fusebox-container").width()/2)); // position correctly
    correctShadow();
  };
  
  var correctShadow = function() {
    var sumAttributeValues = function(attributeArray) {
      var sum = 0;
      $.each(attributeArray, function(idx, attribute) {
        sum += parseFloat(currentFusebox.css(attribute));
      });
      return sum;
    };
    
    var currentFusebox = $(".fusebox-container .fusebox:visible"),
        transformWidth = currentFusebox.width() + sumAttributeValues(["border-left-width", "border-right-width", "padding-left", "padding-right"]),
        transformHeight = currentFusebox.height() + sumAttributeValues(["border-top-width", "border-bottom-width", "padding-top", "padding-bottom"]);
    
    $(".fusebox-container .ui-widget-shadow").css({width: transformWidth, height: transformHeight});
  };
  
  $.fusebox.container = {
    initialize: function() {
      if($(".fusebox-container").length > 0) { return; }
      $("body").append($("<div>").addClass("fusebox-container").css({display: "none"}).append($("<div>").addClass("ui-widget-shadow")));
    },
    append: function(element) {
      var transform = arguments[1] || function(element) { 
        return $("<div>")
          .addClass("fusebox ui-widget-content")
          .append(element);
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