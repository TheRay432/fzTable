$(document).ready(function () {
  //   let containerWidth = $(".tbody-container").outerWidth();
  //   let leftWidth = Math.floor(containerWidth / 8);
  //   let rightWidth = containerWidth - leftWidth;
  //   $(".tbody-container-right").css("width", `${rightWidth}`);
  //   $(".tbody-container-left").css("width", `${leftWidth}`);
  var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
      if (!uniqueId) {
        uniqueId = "Don't call this twice without a uniqueId";
      }
      if (timers[uniqueId]) {
        clearTimeout(timers[uniqueId]);
      }
      timers[uniqueId] = setTimeout(callback, ms);
    };
  })();
  $(window).resize(function () {
    waitForFinalEvent(
      function () {
        if ($(window).width() <= 980) {
          $(".tbody-container-right").animate({ scrollLeft: "0" }, "slow");
          let txt = $(".tbody-container-right").outerWidth();
          let minwidth = Math.floor(txt / 2);
          let counter = minwidth * 2;
          let slideWidth = minwidth * 7;
          let arrowMargin = txt - 15;
          if (counter === minwidth * 2) {
            $("#previous-column").css("display", "none");
          }
          $(".date").css("min-width", `${minwidth}px`);
          $(".sliding-window").css("width", `${slideWidth}px`);
          $("#next-column").css("margin-left", `${arrowMargin}px`);
          console.log("txt:", txt);
          console.log("counter:", counter);
          console.log("minwidth:", minwidth);
          $("#next-column")
            .unbind("click")
            .click(function (event) {
              event.preventDefault();

              counter += minwidth;
              console.log("+", counter);
              if (counter === minwidth * 7) {
                $("#next-column").css("display", "none");
              }
              if (counter !== minwidth * 2) {
                $("#previous-column").css("display", "flex");
              }
              $(".tbody-container-right").animate(
                { scrollLeft: `+=${minwidth}` },
                "slow"
              );
            });
          $("#previous-column")
            .unbind("click")
            .click(function (event) {
              event.preventDefault();
              counter -= minwidth;
              console.log("counter:", counter);
              console.log("mindth", minwidth * 2);
              if (counter !== minwidth * 7) {
                $("#next-column").css("display", "flex");
              }
              if (counter == minwidth * 2) {
                $("#previous-column").css("display", "none");
              }
              $(".tbody-container-right").animate(
                { scrollLeft: `-=${minwidth}` },
                "slow"
              );
            });
        } else {
          $(".tbody-container-right").animate({ scrollLeft: "0" }, "slow");
        }
      },
      500,
      "some unique string"
    );
  });
  //   let txt = $(".tbody-container-right").outerWidth();
  //     let minwidth = Math.floor(txt / 2);
  //     let counter = minwidth * 2;
  //     console.log(counter);
  //     let slideWidth = minwidth * 7;
  //     let arrowMargin = txt - 15;
  //     if (counter === minwidth * 2) {
  //       $("#previous-column").css("display", "none");
  //     }
  //     $(".date").css("min-width", `${minwidth}px`);
  //     $(".sliding-window").css("width", `${slideWidth}px`);
  //     $("#next-column").css("margin-left", `${arrowMargin}px`);
  //     $("#next-column").click(function (event) {
  //       event.preventDefault();
  //       counter += minwidth;
  //       if (counter === minwidth * 7) {
  //         $("#next-column").css("display", "none");
  //       }
  //       if (counter !== minwidth * 2) {
  //         $("#previous-column").css("display", "flex");
  //       }
  //       $(".tbody-container-right").animate(
  //         { scrollLeft: `+=${minwidth}` },
  //         "slow"
  //       );
  //     });
  //     $("#previous-column").click(function (event) {
  //       event.preventDefault();
  //       counter -= minwidth;
  //       console.log("counter:", counter);
  //       console.log("mindth", minwidth * 2);
  //       if (counter !== minwidth * 7) {
  //         $("#next-column").css("display", "flex");
  //       }
  //       if (counter == minwidth * 2) {
  //         $("#previous-column").css("display", "none");
  //       }
  //       $(".tbody-container-right").animate(
  //         { scrollLeft: `-=${minwidth}` },
  //         "slow"
  //       );
  //     });
});
