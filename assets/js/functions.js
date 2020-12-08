jQuery(function(){"use strict";var screen_has_mouse=false,$body=jQuery("body"),$top_nav=jQuery("#top .navbar"),$featured=jQuery("#featured"),$featured_media=jQuery("#featured-media");function themeMouseMove(){screen_has_mouse=true}function themeTouchStart(){jQuery(window).off("mousemove.anii");screen_has_mouse=false;setTimeout(function(){jQuery(window).on("mousemove.anii",themeMouseMove)},250)}if(!navigator.userAgent.match(/(iPad|iPhone|iPod)/g)){jQuery(window).on("touchstart.anii",themeTouchStart).on("mousemove.anii",themeMouseMove);if(window.navigator.msPointerEnabled){document.addEventListener("MSPointerDown",themeTouchStart,false)}}jQuery("#top .site-menu-toggle a").on("click.anii",function(e){$body.toggleClass("mobile-menu-opened");e.stopPropagation();e.preventDefault()});jQuery("#site-menu .menu-expand").on("click.anii",function(e){var $parent=jQuery(this).parent();if(jQuery(".site-menu-toggle").is(":visible")){$parent.toggleClass("collapse")}e.preventDefault()});jQuery("#site-menu .current-menu-parent").addClass("collapse");jQuery(document).on({mouseenter:function(){if(screen_has_mouse){jQuery(this).addClass("hover")}},mouseleave:function(){if(screen_has_mouse){jQuery(this).removeClass("hover")}}},"#site-menu li");if(jQuery("html").hasClass("touchevents")){jQuery("#site-menu li.menu-item-has-children > a:not(.menu-expand)").on("click.anii",function(e){if(!screen_has_mouse&&!window.navigator.msPointerEnabled&&!jQuery(".site-menu-toggle").is(":visible")){var $parent=jQuery(this).parent();if(!$parent.parents(".hover").length){jQuery("#site-menu li.menu-item-has-children").not($parent).removeClass("hover")}$parent.toggleClass("hover");e.preventDefault()}})}else{jQuery("#site-menu li > a:not(.menu-expand), #top .site-title a, #social-links-menu a:first").on("focus.anii blur.anii",function(e){if(screen_has_mouse&&!jQuery("#top .site-menu-toggle").is(":visible")){var $parent=jQuery(this).parent();if(!$parent.parents(".hover").length){jQuery("#site-menu .menu-item-has-children.hover").not($parent).removeClass("hover")}if($parent.hasClass("menu-item-has-children")){$parent.addClass("hover")}e.preventDefault()}})}jQuery(document).on("click.anii",function(e){if(jQuery(e.target).parents("#site-menu").length>0){return}jQuery("#site-menu li.menu-item-has-children").removeClass("hover")});if($top_nav.hasClass("navbar-sticky")&&$top_nav.length>0&&$featured.length>0){var top_nav_height,featured_height;var update_sticky_nav_variables=function(){top_nav_height=$top_nav.outerHeight();featured_height=$featured.outerHeight()+top_nav_height};update_sticky_nav_variables();jQuery(window).on("resize.anii",function(){if(window.innerWidth>=992){var isFixed=$body.hasClass("navbar-is-sticky");$body.removeClass("navbar-is-sticky");update_sticky_nav_variables();if(isFixed){$body.addClass("navbar-is-sticky")}if(!$top_nav.hasClass("navbar-sticky-watching")){$top_nav.addClass("navbar-sticky-watching");jQuery(window).on("scroll.anii",function(){var isFixed=$body.hasClass("navbar-is-sticky");if(1>(featured_height-window.pageYOffset)){if(!isFixed){$body.addClass("navbar-is-sticky");if(parseInt($featured.css("margin-top"),10)!=top_nav_height){$featured.css("margin-top",top_nav_height)}}}else{if(isFixed){$body.removeClass("navbar-is-sticky");$featured.css("margin-top","")}}}).scroll()}}else{if($top_nav.hasClass("navbar-sticky-watching")){$top_nav.removeClass("navbar-sticky-watching");jQuery(window).unbind("scroll.anii");$body.removeClass("navbar-is-sticky");$featured.css("margin-top","")}}}).resize()}if($body.hasClass("footer-sticky")){jQuery(window).on("resize.castilo",function(){var footer_height=jQuery("#footer").outerHeight();if(footer_height>window.innerHeight-jQuery("#wpadminbar").outerHeight()-jQuery(".navbar-is-sticky #top").outerHeight()){$body.removeClass("footer-sticky");jQuery("#footer").prev().css("margin-bottom","")}else{$body.addClass("footer-sticky");jQuery("#footer").prev().css("margin-bottom",footer_height)}}).resize()}if(jQuery.fn.masonry){var $grid=jQuery(".post-listing .masonry-grid").masonry({itemSelector:".grid-item",columnWidth:".grid-sizer",percentPosition:true,transitionDuration:0});$grid.imagesLoaded().progress(function(){$grid.masonry("layout")})}jQuery(".tabs a").on("click.anii",function(e){var $parent=jQuery(this).parent();e.preventDefault();if($parent.hasClass("active")){return}$parent.siblings("li").each(function(){jQuery(this).removeClass("active");jQuery(jQuery(this).find("a").attr("href")).removeClass("active")});$parent.addClass("active");var hash=$parent.find("a").attr("href");jQuery(hash).addClass("active")});if(jQuery("html").hasClass("custom-cursor")&&!jQuery("html").hasClass("touchevents")){var clientX=-200,clientY=-200,$cursor=jQuery("#magic-cursor");document.addEventListener("mousemove",function(e){clientX=e.clientX;clientY=e.clientY});function renderCursor(){$cursor.css("transform","translate("+clientX+"px, "+clientY+"px)");requestAnimationFrame(renderCursor)}requestAnimationFrame(renderCursor);jQuery(".hide-cursor, .site-title a, #site-menu li, .social-navigation a").on({mouseenter:function(){$cursor.addClass("hide")},mouseleave:function(){$cursor.removeClass("hide")}});jQuery(".scale-cursor, .button, .podcast-episode-player").on({mouseenter:function(){$cursor.addClass("scale")},mouseleave:function(){$cursor.removeClass("scale")}})}});
(function($) {

    'use strict';
  
  // Prefix helper
    function getCss3Prop(prefixProp) {
  
      var element = document.documentElement;
      var prefix = ['-o-', '-webkit-', '-moz-', ''];
  
      function camelCase(str) {
        return str.replace(/\-([a-z])/gi, function(match, $1) {
          return $1.toUpperCase();
        });
      }
  
      for (var i = prefix.length - 1; i >= 0; i--) {
        var prefixProp = camelCase(prefix[i] + prefixProp);
        if(prefixProp in element.style) {
          return prefixProp;
        }
      }
  
      return false;
    }
  
  
    var transform = getCss3Prop('transform');
    var transitionDuration =  getCss3Prop('transition-duration');
  
    var PLUGINNAME = 'WDCarusel';
  
     $.fn[PLUGINNAME] = function(options) {
  
      if(!transform) {
        throw new Error('Your browser does not support transform');
      }
  
      var arrowLeftIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">' +
                            '<path d="M736.4 11.4c-3.4 1.3-436.6 418.2-484.2 466-14 13.8-15 15.3-15 23 0 7.3 1.2 9.2 12 20 11 11 466 450.4 480.3 463.8 13 12 33.2 4 33.2-13.4 0-9 10.3 1.4-260.8-260.4C383 596 286 501.6 285.5 500.8c-.2-.8 105-103.2 233.7-227.6C648.3 148.7 755.6 44.4 758 41.5c12.4-14.6-4.3-37.4-21.6-30z"/>' +
                          '</svg>';
      var arrowRightIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">' +
                            '<path d="M249.7 11.8c-6.5 2.6-12.3 11.3-12.3 18.7 0 8.7-13.8-5 257 256.3C615 403.4 713.7 499.4 713.7 500.4s-106.6 105-237 230.8c-130.3 126-237.5 230.4-238 232.3-2.7 7-1.4 14.4 4 20.4 4.4 4.8 7 6 13.6 6 7 0 9.4-1.2 17-8.6C333 924.4 742 529.7 751 520.7c10.7-11 12-12.8 12-20 0-7.6-1-9.3-14-22-52-52-482-465.6-485.7-467-5.6-2.2-8-2.2-13.3 0z"/>' +
                          '</svg>';
      var options = $.extend({
        itemPadding : 5,
        arrowLeft : arrowLeftIcon,
        arrowRight : arrowRightIcon,
        infinite : false,
        autoplay : false,
        autoplayDelay : 3000,
        stopInHover : false,
        containerNav : '',
        itemsCount : '',
        responsive : [
          {
            breakpoint: 1170,
            items: 5
          },
          {
            breakpoint: 960,
            items: 4
          },
          {
            breakpoint: 768,
            items: 3
          },
          {
            breakpoint: 480,
            items: 2
          },
          {
            breakpoint: 320,
            items: 1
          }
        ]
      }, options);
  
      return this.each(function(){
  
        var $container = $(this);
        var $items = $container.find('.wd-carusel__item');
        var itemsCount = $items.length;
        var arrowsTemplate =  '<span class="wd-carusel__nav--icon wd-carusel__nav--left">' + options.arrowLeft + '</span>' +
                              '<span class="wd-carusel__nav--icon wd-carusel__nav--right">' + options.arrowRight + '</span>';
        var containerWidth;
        var itemsWidth;
        var wrapWidth;
        var $wrap;
        var _items;
        var position = 0;
        var interval = null;
  
        $items.wrapAll('<div class="wd-carusel__wrap"></div>');
        $wrap = $container.find('.wd-carusel__wrap');
  
        //inner arrows
        if(typeof options.containerNav === 'string' && options.containerNav.trim() !== '') {
          options.containerNav = $(options.containerNav);
        }
        else {
          options.containerNav = $container;
        }
  
        options.containerNav.append(arrowsTemplate);
        var $arrows = options.containerNav.find('.wd-carusel__nav--icon');
  
        if(options.autoplay) {
  
          if(options.stopInHover) {
            $container.on('mouseenter', function() {
              if(interval) clearInterval(interval);
            });
            $container.on('mouseleave', function() {
              autoplay();
            });
          }
  
          autoplay();
        }
  
        if(itemsCount <= options.items) {
          $arrows.hide();
        }
  
        responsive();
  
       //bind functions
       function responsive() {
  
          containerWidth = $container.width();
  
          for(var i = 0; options.responsive.length > i; i++) {
  
            if(containerWidth >= options.responsive[i].breakpoint) {
              _items = (options.itemsCount !== '')? options.itemsCount : options.responsive[i].items;
              dimensions();
              break;
            }
  
          }
  
        }
  
        function dimensions() {
  
          itemsWidth = containerWidth / _items;
          wrapWidth = (itemsWidth  + (options.itemPadding * 2)) * itemsCount;
  
          $items
          .css({
            width: itemsWidth,
            padding: options.itemPadding
          });
  
          position = 0;
          $wrap.css('width', wrapWidth);
          $wrap[0].style[transitionDuration] = '0s';
          $wrap[0].style[transform] = 'translate(0, 0)';
          setTimeout(function() {
            $wrap[0].style[transitionDuration] = '';
          }, 10);
  
        }
  
        function autoplay() {
          if(interval) clearInterval(interval);
  
          interval = setInterval(function() {
            slideTo('next');
          }, options.autoplayDelay);
  
        }
  
        function slideTo(dir) {
  
          var end = -itemsWidth * (itemsCount - _items);
  
          if(dir === 'prev') {
  
            if(options.infinite && position === 0) {
              position = end;
            } else {
              position = Math.min(position + itemsWidth * _items, 0);
            }
  
          }
          else {
  
            if(options.infinite && position === end) {
              position = 0;
            } else {
              position = Math.max((position - itemsWidth * _items), end);
            }
  
          }
  
          $wrap[0].style[transform] = 'translate(' + position + 'px, 0)';
  
        }
  
        function navigation() {
  
          if($(this).hasClass('wd-carusel__nav--left')) {
            slideTo('prev');
          } else {
            slideTo('next');
          }
  
        }
  
        // Bind events
        $(window).on('resize.' + PLUGINNAME, responsive);
        $arrows.on('click.' + PLUGINNAME, navigation);
  
  
      });
  
     }
  
   })(jQuery);
  
  $('.wd-carusel').WDCarusel({
    infinite : true,
    autoplay : true,
    autoplayDelay : 3000,
    stopInHover : true,
    itemsCount: 5,
  });
  