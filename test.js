$(document).ready(function () {
  (function ($) {
    "use strict";
    let ModuleName = "frzTable";
    let Module = function (ele, options) {
      this.ele = ele;
      this.$ele = $(ele);
      this.option = options;
    };

    Module.prototype.test = function (opt) {
      if ($(window).width() <= 980) {
        $(".tbody-container-right").animate({ scrollLeft: "0" }, "slow");
        let txt = $(".tbody-container-right").outerWidth();
        let minwidth = Math.round(txt / `${opt.count.show}`);
        let slideMany = Math.round(minwidth * `${opt.count.slide}`);
        let counter = minwidth * `${opt.count.show}`;
        let speed = opt.speed * 1000;
        let slideWidth = Math.round(minwidth * 7);
        let arrowMargin = txt - 15;
        $("#previous-column").css("display", "none");
        $("#next-column").css("display", "flex");
        $(".date").css("min-width", `${minwidth}px`);
        $(".sliding-window").css("width", `${slideWidth}px`);
        $("#next-column").css("margin-left", `${arrowMargin}px`);

        $("#next-column")
          .unbind("click")
          .click(function (event) {
            event.preventDefault();

            counter += slideMany;

            if (counter >= slideWidth) {
              $("#next-column").css("display", "none");
            }
            if (counter !== minwidth * `${opt.count.show}`) {
              $("#previous-column").css("display", "flex");
            }
            $(".tbody-container-right").animate(
              { scrollLeft: `+=${slideMany}` },
              speed
            );
          });
        $("#previous-column")
          .unbind("click")
          .click(function (event) {
            event.preventDefault();
            counter -= slideMany;
            if (counter <= slideWidth) {
              $("#next-column").css("display", "flex");
            }
            if (counter == minwidth * `${opt.count.show}`) {
              $("#previous-column").css("display", "none");
            }
            $(".tbody-container-right").animate(
              { scrollLeft: `-=${slideMany}` },
              speed
            );
          });
      } else {
        // $(".tbody-container-right").animate({ scrollLeft: "0" }, "slow");
        let txt = $(".tbody-container-right").outerWidth();
        let minwidth = txt / 7;
        $(".date").css("min-width", `${minwidth}px`);
        $(".sliding-window").css("width", `${txt}px`);
        $("#next-column").css("display", "none");
        $("#previous-column").css("display", "none");
      }
    };
    Module.prototype.testClick = function (opt) {
      $(".date > div:not('.date-time')").click(function (e) {
        e.preventDefault();
        let $this = $(this);
        $(".date > div").removeClass("whenclick");
        opt.whenClick($this);
      });
    };
    Module.prototype.reSize = function (module, opt) {
      let waitForFinalEvent = (function () {
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
            module.test(opt);
          },
          500,
          "some unique string"
        );
      });
    };

    $.fn[ModuleName] = function (method, options) {
      return this.each(function () {
        let module = new Module(this, method);
        module.test(method);
        module.testClick(method);
        module.reSize(module, method);
      });
    };
  })(jQuery);
});
