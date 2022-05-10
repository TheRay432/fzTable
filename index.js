$(document).ready(function () {
  $(".frzTable.default").frzTable({
    count: {
      slide: 1, // [number]

      show: 2, // [number]
    },

    speed: 0.3, // [number]

    whenClick: function ($element) {
      $element.addClass("whenclick");
    },
  });
});
