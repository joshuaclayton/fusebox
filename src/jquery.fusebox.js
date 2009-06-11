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
        if(typeof($(this).data("fuseboxTargetSelector")) == "undefined") { return; }
        $.fusebox.container.show($(this).data("fuseboxTargetSelector"));
        return false;
      }
    }
  };
  
  $.fn.fusebox = function(selector) {
    if($(this).length == 0) { return; }
    
    $.fusebox.container.initialize();
    $("a.fusebox-target").live("click", $.fusebox.bindings.click);
    
    return this.each(function(index) {
      var $anchor = $(this), $associatedElement, fuseboxSelector;
      
      $.each($anchor.attr("class").split(/ /), function(idx, cssClass) {
        fuseboxSelector = ".fusebox-" + cssClass;
        if($(fuseboxSelector).length == 1) {
          $anchor.data("fuseboxTargetSelector", fuseboxSelector);
          $associatedElement = $(fuseboxSelector);
          return false;
        }
      });
      
      if(typeof($associatedElement) == "undefined") { return; }
      $.fusebox.container.append($associatedElement);
      $anchor.addClass("fusebox-target");
    });
  };
  
  $(document).bind("close.fusebox", $.fusebox.bindings.close);
})(jQuery);