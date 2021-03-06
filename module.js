$(document).ready(function () {
  (function ($) {
    "use strict";
    let ModuleName = "frzTable";
    let Module = function (ele, options) {
      this.ele = ele;
      this.$ele = $(ele);
      this.option = options;
      this.item = this.$ele.find(".date > div:not('.date-time')");
      this.txt = this.$ele.find(".tbody-container-right").outerWidth();
      this.minwidth = Math.round(this.txt / `${this.option.count.show}`);
      this.slideMany = Math.round(this.minwidth * `${this.option.count.slide}`);
      this.counter = this.minwidth * `${this.option.count.show}`;
      this.speed = this.option.speed * 1000;
      this.slideWidth = Math.round(this.minwidth * 7);
    };
    Module.DEFAULTS = {
      count: {
        slide: 1, // [number]

        show: 2, // [number]
      },

      speed: 0.3, // [number]

      whenClick: function ($element) {
        $element.addClass("whenclick");
      },
    };

    Module.prototype.init = function (opt, df) {
      this.defaultSize();
      this.itemClick(opt);
      this.reSize(opt, df);
    };

    Module.prototype.defaultSize = function () {
      let self = this;
      let containerRight = this.$ele.find(".tbody-container-right");
      let prevBtn = this.$ele.find(".previous-column");
      let nextBtn = this.$ele.find(".next-column");
      let date = this.$ele.find(".date");
      let slideWindow = this.$ele.find(".sliding-window");
      let arrowMargin = this.txt - 15;
      if ($(window).width() <= 980) {
        containerRight.animate({ scrollLeft: "0" }, this.speed);
        prevBtn.css("display", "none");
        nextBtn.css("display", "flex");
        date.css("min-width", `${this.minwidth}px`);
        slideWindow.css("width", `${this.slideWidth}px`);
        nextBtn.css("margin-left", `${arrowMargin}px`);

        nextBtn.unbind("click").click(function (event) {
          event.preventDefault();
          self.nextBtnClick();
        });
        prevBtn.unbind("click").click(function (event) {
          event.preventDefault();
          self.prevBtnClick();
        });
      } else {
        this.minwidth = this.txt / 7;
        date.css("min-width", `${this.minwidth}px`);
        slideWindow.css("width", `${this.txt}px`);
        nextBtn.css("display", "none");
        prevBtn.css("display", "none");
      }
    };
    Module.prototype.itemClick = function (opt) {
      this.item.click(function (e) {
        e.preventDefault();
        let $this = $(this);
        let index = $this.index();
        $(".date > div").removeClass("whenclick");
        $this.addClass("whenclick");
        $(".sliding-window div").removeClass("interChange");
        $this.parent().addClass("interChange");
        const t = $this.parent().siblings();
        t.each(function (i, el) {
          $(el).children().eq(index).addClass("interChange");
        });
      });
    };
    Module.prototype.nextBtnClick = function () {
      this.counter += this.slideMany;

      if (this.counter >= this.slideWidth) {
        $(".next-column").css("display", "none");
      }
      if (this.counter !== this.minwidth * `${this.option.count.show}`) {
        $(".previous-column").css("display", "flex");
      }
      $(".tbody-container-right").animate(
        { scrollLeft: `+=${this.slideMany}` },
        this.speed
      );
    };
    Module.prototype.prevBtnClick = function () {
      this.counter -= this.slideMany;
      if (this.counter <= this.slideWidth) {
        $(".next-column").css("display", "flex");
      }
      if (this.counter == this.minwidth * `${this.option.count.show}`) {
        $(".previous-column").css("display", "none");
      }
      $(".tbody-container-right").animate(
        { scrollLeft: `-=${this.slideMany}` },
        this.speed
      );
    };
    Module.prototype.reSize = function (opt, df) {
      let self = this;
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
            self = new Module(df, opt);
            self.defaultSize(opt);
          },
          500,
          "some unique string"
        );
      });
    };

    $.fn[ModuleName] = function (method) {
      return this.each(function () {
        let $this = $(this);
        let module = $this.data(ModuleName);
        let opt = null;
        if (!!module) {
        } else {
          opt = $.extend(
            true,
            Module.DEFAULTS,
            typeof method === "object" && method
          );
          module = new Module(this, opt);
          $this.data(ModuleName, module);
          console.log($this.data());
          module.init(opt, this);
        }
      });
    };
  })(jQuery);
});
