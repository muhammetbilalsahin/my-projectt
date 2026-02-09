(function ($) {
  "use strict";

  //Hide Loading Box (Preloader)
  function handlePreloader() {
    if ($(".preloader").length) {
      $(".preloader").delay(200).fadeOut(500);
    }
  }

  //Update Scroll to Top
  function headerStyle() {
    if ($(".main-header").length) {
      var mainHeader = $(".main-header").height();
      var windowpos = $(window).scrollTop();
      if (windowpos >= mainHeader) {
        $(".main-header").addClass("fixed-header");
        $(".scroll-to-top").fadeIn(300);
      } else {
        $(".main-header").removeClass("fixed-header");
        $(".scroll-to-top").fadeOut(300);
      }
    }
  }

  headerStyle();

  //Submenu Dropdown Toggle
  if ($(".main-header li.dropdown ul").length) {
    $(".main-header li.dropdown").append('<div class="dropdown-btn"></div>');

    //Dropdown Button
    $(".main-header li.dropdown .dropdown-btn").on("click", function () {
      $(this).prev("ul").slideToggle(500);
    });
  }

  //Search Popup / Hide Show
  if ($("#search-popup").length) {
    //Show Popup
    $(".search-box-btn").on("click", function (e) {
      e.preventDefault();
      $("#search-popup").addClass("popup-visible");
    });

    //Hide Popup
    $(".close-search").on("click", function () {
      $("#search-popup").removeClass("popup-visible");
    });
  }

  //Revolution Slider Style One
  if ($(".main-slider.style-one .tp-banner").length) {
    jQuery(".main-slider.style-one .tp-banner")
      .show()
      .revolution({
        delay: 10000,
        startwidth: 1200,
        startheight: 580,
        hideThumbs: 600,

        thumbWidth: 80,
        thumbHeight: 50,
        thumbAmount: 5,

        navigationType: "bullet",
        navigationArrows: "0",
        navigationStyle: "preview3",

        touchenabled: "on",
        onHoverStop: "off",

        swipe_velocity: 0.7,
        swipe_min_touches: 1,
        swipe_max_touches: 1,
        drag_block_vertical: false,

        parallax: "mouse",
        parallaxBgFreeze: "on",
        parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],

        keyboardNavigation: "off",

        navigationHAlign: "center",
        navigationVAlign: "bottom",
        navigationHOffset: 0,
        navigationVOffset: 20,

        soloArrowLeftHalign: "left",
        soloArrowLeftValign: "center",
        soloArrowLeftHOffset: 20,
        soloArrowLeftVOffset: 0,

        soloArrowRightHalign: "right",
        soloArrowRightValign: "center",
        soloArrowRightHOffset: 20,
        soloArrowRightVOffset: 0,

        shadow: 0,
        fullWidth: "on",
        fullScreen: "off",

        spinner: "spinner4",

        stopLoop: "off",
        stopAfterLoops: -1,
        stopAtSlide: -1,

        shuffle: "off",

        autoHeight: "off",
        forceFullWidth: "on",

        hideThumbsOnMobile: "on",
        hideNavDelayOnMobile: 1500,
        hideBulletsOnMobile: "on",
        hideArrowsOnMobile: "on",
        hideThumbsUnderResolution: 0,

        hideSliderAtLimit: 0,
        hideCaptionAtLimit: 0,
        hideAllCaptionAtLilmit: 0,
        startWithSlide: 0,
        videoJsPath: "",
        fullScreenOffsetContainer: "",
      });
  }

  //Revolution Slider Style Two
  if ($(".main-slider.style-two .tp-banner").length) {
    jQuery(".main-slider.style-two .tp-banner")
      .show()
      .revolution({
        delay: 10000,
        startwidth: 1200,
        startheight: 740,
        hideThumbs: 600,

        thumbWidth: 80,
        thumbHeight: 50,
        thumbAmount: 5,

        navigationType: "bullet",
        navigationArrows: "0",
        navigationStyle: "preview4",

        touchenabled: "on",
        onHoverStop: "off",

        swipe_velocity: 0.7,
        swipe_min_touches: 1,
        swipe_max_touches: 1,
        drag_block_vertical: false,

        parallax: "mouse",
        parallaxBgFreeze: "on",
        parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],

        keyboardNavigation: "off",

        navigationHAlign: "center",
        navigationVAlign: "bottom",
        navigationHOffset: 0,
        navigationVOffset: 25,

        soloArrowLeftHalign: "left",
        soloArrowLeftValign: "center",
        soloArrowLeftHOffset: 20,
        soloArrowLeftVOffset: 0,

        soloArrowRightHalign: "right",
        soloArrowRightValign: "center",
        soloArrowRightHOffset: 20,
        soloArrowRightVOffset: 0,

        shadow: 0,
        fullWidth: "on",
        fullScreen: "off",

        spinner: "spinner4",

        stopLoop: "off",
        stopAfterLoops: -1,
        stopAtSlide: -1,

        shuffle: "off",

        autoHeight: "off",
        forceFullWidth: "on",

        hideThumbsOnMobile: "on",
        hideNavDelayOnMobile: 1500,
        hideBulletsOnMobile: "on",
        hideArrowsOnMobile: "on",
        hideThumbsUnderResolution: 0,

        hideSliderAtLimit: 0,
        hideCaptionAtLimit: 0,
        hideAllCaptionAtLilmit: 0,
        startWithSlide: 0,
        videoJsPath: "",
        fullScreenOffsetContainer: "",
      });
  }

  //Latest Works Carousel
  if ($(".work-carousel").length) {
    $(".work-carousel").owlCarousel({
      loop: true,
      margin: 0,
      nav: true,
      smartSpeed: 500,
      autoplay: 7000,
      navText: [
        '<span class="fa fa-angle-left"></span>',
        '<span class="fa fa-angle-right"></span>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        750: {
          items: 2,
        },
        1000: {
          items: 2,
        },
        1200: {
          items: 3,
        },
        1400: {
          items: 4,
        },
        1900: {
          items: 5,
        },
      },
    });
  }

  //Testimonials Carousel
  if ($(".testimonials-carousel").length) {
    $(".testimonials-carousel").owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      smartSpeed: 500,
      autoplay: 7000,
      navText: [
        '<span class="flaticon-arrows-18"></span>',
        '<span class="flaticon-arrows-1"></span>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 1,
        },
        1024: {
          items: 2,
        },
        1200: {
          items: 2,
        },
      },
    });
  }

  //Sponsors Carousel
  if ($(".sponsors-carousel").length) {
    $(".sponsors-carousel").owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      smartSpeed: 500,
      autoplay: 5000,
      navText: [
        '<span class="fa fa-angle-left"></span>',
        '<span class="fa fa-angle-right"></span>',
      ],
      responsive: {
        0: {
          items: 2,
        },
        600: {
          items: 3,
        },
        800: {
          items: 4,
        },
        1024: {
          items: 5,
        },
        1200: {
          items: 6,
        },
      },
    });
  }

  // Fact Counter
  function factCounter() {
    if ($(".fact-counter").length) {
      $(".fact-counter .counter-column.animated").each(function () {
        var $t = $(this),
          n = $t.find(".count-text").attr("data-stop"),
          r = parseInt($t.find(".count-text").attr("data-speed"), 10);

        if (!$t.hasClass("counted")) {
          $t.addClass("counted");
          $({
            countNum: $t.find(".count-text").text(),
          }).animate(
            {
              countNum: n,
            },
            {
              duration: r,
              easing: "linear",
              step: function () {
                $t.find(".count-text").text(Math.floor(this.countNum));
              },
              complete: function () {
                $t.find(".count-text").text(this.countNum);
              },
            },
          );
        }
      });
    }
  }

  //Tabs / Jquery Tabs
  if ($(".tabs-box").length) {
    //Tabs
    $(".tabs-box .tab-buttons .tab-btn").on("click", function (e) {
      e.preventDefault();
      var target = $($(this).attr("data-tab"));
      $(".tabs-box .tab-buttons .tab-btn").removeClass("active-btn");
      $(this).addClass("active-btn");
      $(".tabs-box .tabs-content .tab").hide(0);
      $(".tabs-box .tabs-content .tab").removeClass("active-tab");
      $(target).fadeIn(200);
      $(target).addClass("active-tab");
      var windowWidth = $(window).width();
      if (windowWidth < 767) {
        $("html, body").animate(
          {
            scrollTop: $(".tabs-content").offset().top,
          },
          1000,
        );
      }
    });
  }

  //LightBox / Fancybox
  if ($(".lightbox-image").length) {
    $(".lightbox-image").fancybox({
      openEffect: "elastic",
      closeEffect: "elastic",
      helpers: {
        media: {},
      },
    });
  }

  //Sortable Masonary with Filters
  function enableMasonry() {
    if ($(".sortable-masonry").length) {
      var winDow = $(window);
      // Needed variables
      var $container = $(".sortable-masonry .items-container");
      var $filter = $(".filter-btns");

      $container.isotope({
        filter: "*",
        masonry: {
          columnWidth: 1,
        },
        animationOptions: {
          duration: 500,
          easing: "linear",
        },
      });

      // Isotope Filter
      $filter.find("li").on("click", function () {
        var selector = $(this).attr("data-filter");

        try {
          $container.isotope({
            filter: selector,
            animationOptions: {
              duration: 500,
              easing: "linear",
              queue: false,
            },
          });
        } catch (err) {}
        return false;
      });

      winDow.bind("resize", function () {
        var selector = $filter.find("li.active").attr("data-filter");

        $container.isotope({
          filter: selector,
          animationOptions: {
            duration: 500,
            easing: "linear",
            queue: false,
          },
        });
      });

      var filterItemA = $(".filter-btns li");

      filterItemA.on("click", function () {
        var $this = $(this);
        if (!$this.hasClass("active")) {
          filterItemA.removeClass("active");
          $this.addClass("active");
        }
      });
    }
  }

  enableMasonry();

  //Contact Form Validation
  if ($("#contact-form").length && typeof $.fn.validate === "function") {
    $("#contact-form").validate({
      rules: {
        username: { required: true },
        email: { required: true, email: true },
        phone: { required: true },
        subject: { required: true },
        message: { required: true },
      },
    });
  }

  // Scroll to a Specific Div
  if ($(".scroll-to-target").length) {
    $(".scroll-to-target").on("click", function () {
      var target = $(this).attr("data-target");
      // animate
      $("html, body").animate(
        {
          scrollTop: $(target).offset().top,
        },
        1000,
      );
    });
  }

  // Elements Animation
  if ($(".wow").length) {
    var wow = new WOW({
      boxClass: "wow", // animated element css class (default is wow)
      animateClass: "animated", // animation css class (default is animated)
      offset: 0, // distance to the element when triggering the animation (default is 0)
      mobile: true, // trigger animations on mobile devices (default is true)
      live: true, // act on asynchronously loaded content (default is true)
    });
    wow.init();
  }

  /* ==========================================================================
   When document is Ready, do
   ========================================================================== */

  $(document).on("ready", function () {
    enableMasonry();
  });

  /* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */

  $(window).on("scroll", function () {
    headerStyle();
    factCounter();
  });

  /* ==========================================================================
   When document is loading, do
   ========================================================================== */

  $(window).on("load", function () {
    handlePreloader();
    enableMasonry();
  });
})(window.jQuery);
