(function($) {
  $.fusebox = {
    close: function() {
      $(document).trigger("close.fusebox");
      return false;
    }
  };
})(jQuery);
