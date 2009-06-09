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
      
      if(typeof($associatedElement) == "undefined") { return; }
      
      $.fusebox.container.append($associatedElement);
      $anchor.click($.fusebox.bindings.click);
    });
  };
})(jQuery);