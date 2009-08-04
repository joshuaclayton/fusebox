(function($) {
  $.fn.fusebox = function(selector) {
    if($(this).length === 0) { return; }
    var options = arguments[1] || {};
    $.fusebox.container.initialize();
    $(".fusebox-target").live("click", $.fusebox.bindings.click);

    return this.each(function(index) {
      var $element = $(this), $fuseboxContent, fuseboxSelector;

      if($element.data("fuseboxTargetSelector")) { return; }
      $.each($element.attr("class").split(/ /), function(idx, cssClass) {
        fuseboxSelector = ".fusebox-" + cssClass;
        if($(fuseboxSelector).length == 1) {
          $element.data("fuseboxTargetSelector", fuseboxSelector);
          $fuseboxContent = $(fuseboxSelector);

          if(selector && $element.attr("href")) {
            $fuseboxContent.data("fuseboxData", $element.attr("href") + " " + selector);
            $fuseboxContent.data("fuseboxDataCache", options.cache || false);
          }
          return false;
        }
      });

      if(typeof($fuseboxContent) == "undefined") { return; }

      $.fusebox.container.append($fuseboxContent);
      $element.addClass("fusebox-target");
    });
  };
})(jQuery);
