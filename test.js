$(document).ready(function () {
  (function ($) {
    "use strict";
    let ModuleName = "frzTable";
    let Module = function (ele, options) {
      this.ele = ele;
      this.$ele = $(ele);
      this.option = options;
    };
    Module.DEFAULTS = {
      count: {
        // M版時每次點擊往前往後移動幾格儲存格
        slide: 1, // [number]
        // M版時一個畫面show幾格儲存格
        show: 2, // [number]
      },
      // 設定花多久時間移動完成
      speed: 0.3, // [number]
      // 每次點擊儲存格時會執行此callback，並帶入所點擊的儲存格jquery物件
      whenClick: "1",
    };

    Module.prototype.test = function (opt) {
      if ($(window).width() <= 980) {
        $(".tbody-container-right").animate({ scrollLeft: "0" }, "slow");
        let txt = $(".tbody-container-right").outerWidth();
        let minwidth = Math.round(txt / `${opt.count.show}`);
        let slideMany = Math.round(minwidth * `${opt.count.slide}`);
        let counter = minwidth * `${opt.count.show}`;
        let slideWidth = Math.round(minwidth * 7);
        let arrowMargin = txt - 15;
        if (counter === minwidth * `${opt.count.show}`) {
          $("#previous-column").css("display", "none");
        }
        $("#next-column").css("display", "flex");
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
              { scrollLeft: `+=${slideMany}` },
              "slow"
            );
          });
        $("#previous-column")
          .unbind("click")
          .click(function (event) {
            event.preventDefault();
            counter -= minwidth;
            if (counter !== minwidth * 7) {
              $("#next-column").css("display", "flex");
            }
            if (counter == minwidth * `${opt.count.show}`) {
              $("#previous-column").css("display", "none");
            }
            $(".tbody-container-right").animate(
              { scrollLeft: `-=${slideMany}` },
              "slow"
            );
          });
      } else {
        $(".tbody-container-right").animate({ scrollLeft: "0" }, "slow");
        let txt = $(".tbody-container-right").outerWidth();
        let minwidth = txt / 7;
        $(".date").css("min-width", `${minwidth}px`);
        $(".sliding-window").css("width", `${txt}px`);
        $("#next-column").css("display", "none");
        $("#previous-column").css("display", "none");
      }
    };

    $.fn[ModuleName] = function (method, options) {
      return this.each(function () {
        let module = new Module(this, method);
        let obj = null;
        if (method.count.show > 5) {
          obj = $.extend(true, method, {
            count: {
              slide: 1,
              show: 5,
            },
          });
        } else {
          obj = $.extend({}, method);
        }
        console.log(obj);

        module.test(obj);
      });
    };
  })(jQuery);
});
