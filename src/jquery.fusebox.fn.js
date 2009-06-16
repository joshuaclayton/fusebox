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
