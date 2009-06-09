(function($) {
  $.fusebox = {};
  $.fn.fusebox = function(selector) {
    if($(this).length == 0) { return; }
    
    $.fusebox.container.initialize();
    
    return this.each(function(index) {
      var $anchor = $(this),
          cssClasses = $anchor.attr("class").split(/ /),
          $associatedElement,
          fuseboxSelector;
      
      $.each(cssClasses, function(idx, cssClass) {
        fuseboxSelector = ".fusebox-" + cssClass;
        if($(fuseboxSelector).length == 1) {
          $anchor.data("fusebox-target-selector", fuseboxSelector);
          $associatedElement = $(fuseboxSelector);
          return false;
        }
      });
      
      if(typeof($associatedElement) == undefined) { return; }
      
      $.fusebox.container.append($associatedElement);
      $anchor.click($.fusebox.bindings.click);
    });
  };
})(jQuery);
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
    var sumAttributeValues = function(array) {
      var sum = 0;
      $.each(array, function(idx, attribute) {
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
(function($) {
  $.extend($.fusebox, {
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
        if (event.keyCode == 27) { $.fusebox.close(); }
        return true;
      },
      click: function() {
        $(document).bind("keydown.fusebox", $.fusebox.bindings.keydown);
        $(document).trigger("loading.fusebox");
        
        if(typeof($(this).data("fusebox-target-selector")) == undefined) { return; }
        $.fusebox.container.show($(this).data("fusebox-target-selector"));
        return false;
      }
    }
  });
  $(document).bind("close.fusebox", $.fusebox.bindings.close);
})(jQuery);