$(document).ready(function () {
  //   let containerWidth = $(".tbody-container").outerWidth();
  //   let leftWidth = Math.floor(containerWidth / 8);
  //   let rightWidth = containerWidth - leftWidth;
  //   $(".tbody-container-right").css("width", `${rightWidth}`);
  //   $(".tbody-container-left").css("width", `${leftWidth}`);
  if ($(window).width() <= 980) {
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
    $("#next-column").click(function (event) {
      event.preventDefault();
      counter += minwidth;
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
    $("#previous-column").click(function (event) {
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
  }
});