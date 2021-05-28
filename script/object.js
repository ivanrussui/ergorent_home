$(document).ready(function() {

    $('.slider_features').slick({
      infinite: false,
      speed: 200,
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: '<button class="slick-next scrollbut r_scroll_but foto_scroll_but"><img class="arrow_but" src="./icon/keyboard-right-arrow.svg"/></button>',
      prevArrow: '<button class="slick-prev scrollbut l_scroll_but foto_scroll_but"><img class="arrow_but" src="./icon/keyboard-left-arrow.svg"/></button>',
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 520,
          settings: {
            slidesToShow: 2,
          }
        }]
    });

    $('.slider_feedback').slick({
      infinite: false,
      speed: 200,
      slidesToShow: 4,
      slidesToScroll: 1,
      nextArrow: '<button class="slick-next scrollbut r_scroll_but"><img class="arrow_but" src="./icon/keyboard-right-arrow.svg"/></button>',
      prevArrow: '<button class="slick-prev scrollbut l_scroll_but"><img class="arrow_but" src="./icon/keyboard-left-arrow.svg"/></button>',
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 520,
          settings: {
            slidesToShow: 1,
          }
        }]
    });
    


    document.querySelectorAll(".slider-features .slider_item").forEach(function(elem, i){
      elem.dataset.objectId = i;
    });
    document.querySelectorAll(".slider-feedback .slider_item").forEach(function(elem, i){
      elem.dataset.objectId = i;
    });


    document.querySelectorAll(".r_scroll_but").forEach(function(elem, i) {
      elem.dataset.nextSliderBtnId = i;
      document.querySelectorAll(".slider_wrap_wrap")[i].dataset.sliderId = i;
      document.querySelectorAll(".l_scroll_but")[i].style.opacity = '0';
      elem.addEventListener("click", function() {
        if((document.querySelectorAll(".slider_wrap_wrap")[i].querySelector(".slider_item[data-object-id='0']").getBoundingClientRect().left - 
            document.querySelectorAll(".l_scroll_but")[i].getBoundingClientRect().left) < 
            document.querySelectorAll(".slider_wrap_wrap .slider_item")[i].offsetWidth) {
          
          document.querySelectorAll(".l_scroll_but")[i].style.opacity = '1';
        }
        if(document.querySelector(".slider_wrap_wrap[data-slider-id=" + '"' + i + '"' + "]").querySelectorAll(".slider_item")[document.querySelector(".slider_wrap_wrap[data-slider-id=" + '"' + i + '"' + "]").querySelectorAll(".slider_item").length - 2].getBoundingClientRect().left +
           document.querySelectorAll(".slider_wrap_wrap .slider_item")[i].offsetWidth <
           document.querySelectorAll(".r_scroll_but")[i].getBoundingClientRect().left) {
          document.querySelectorAll(".r_scroll_but")[i].style.opacity = '0';
        }
      });
    });

    document.querySelectorAll(".l_scroll_but").forEach(function(elem, i) {
      elem.addEventListener("click", function() {
        if((document.querySelectorAll(".slider_wrap_wrap")[i].querySelector(".slider_item[data-object-id='1']").getBoundingClientRect().left > 
            document.querySelectorAll(".l_scroll_but")[i].getBoundingClientRect().left)) {
          document.querySelectorAll(".l_scroll_but")[i].style.opacity = '0';
        }
        if (document.querySelector(".slider_wrap_wrap[data-slider-id=" + '"' + i + '"' + "]").querySelectorAll(".slider_item")[document.querySelector(".slider_wrap_wrap[data-slider-id=" + '"' + i + '"' + "]").querySelectorAll(".slider_item").length - 1].getBoundingClientRect().left <
           document.querySelectorAll(".r_scroll_but")[i].getBoundingClientRect().left) {
          document.querySelectorAll(".r_scroll_but")[i].style.opacity = '1';
        }
      });
    });

    // выпадающие списки на маленьких экранах в блоке услуг

    if ($(document).width() <= 768) {

      $(".service-block-part").each(function(i, elem) {
        $(elem).click(function() {
          $(elem).children(".service-block-list").slideToggle(300);
          $(elem).children(".service-block-part-heading").toggleClass("service-block-part-heading_slided")
        });
      });
    }

});