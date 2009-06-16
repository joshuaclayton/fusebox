(function($) {
  $.fn.fusebox = function(selector) {
    if($(this).length === 0) { return; }

    $.fusebox.container.initialize();
    $("a.fusebox-target").live("click", $.fusebox.bindings.click);

    return this.each(function(index) {
      var $anchor = $(this), $fuseboxContent, fuseboxSelector;

      $.each($anchor.attr("class").split(/ /), function(idx, cssClass) {
        fuseboxSelector = ".fusebox-" + cssClass;
        if($(fuseboxSelector).length == 1) {
          $anchor.data("fuseboxTargetSelector", fuseboxSelector);
          $fuseboxContent = $(fuseboxSelector);
          return false;
        }
      });

      if(typeof($fuseboxContent) == "undefined") { return; }
      $.fusebox.container.append($fuseboxContent);
      $anchor.addClass("fusebox-target");
    });
  };
})(jQuery);
