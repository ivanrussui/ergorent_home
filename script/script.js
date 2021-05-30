$(document).ready(function () {
  // Выпадающий список языков
  $('.lang').on('click', function () {
    $('.lang ul').fadeToggle();
  });

  let lang = $('.lang');
  let langList = $('.lang ul');

  $(document).mouseup(function (e) {
    if (
      !lang.is(e.target) &&
      lang.has(e.target).length === 0 &&
      !langList.is(e.target) &&
      langList.has(e.target).length === 0
    ) {
      langList.fadeOut();
    }
  });

  // Меню-бургер на мобильном разрешении
  $('.burger').click(function () {
    if ($('.header__inner').attr('data-slided') == 'false') {
      $('.header__inner').animate({ height: '352px' }, 300);
      $('.header-bar').fadeIn();
      $('.nav').fadeIn();
      $('.header__inner').attr('data-slided', 'true');
    } else {
      $('.header__inner').animate({ height: '64px' }, 300);
      $('.header-bar').fadeOut();
      $('.nav').fadeOut();
      $('.header__inner').attr('data-slided', 'false');
    }
  });
});

// обновление
// счётчик просмотров в выдаче поиска

$(document).ready(function () {
  var block_show = null;
  var wt = $(window).scrollTop();
  var wh = $(window).height();
  var csrftoken = $('[name=csrfmiddlewaretoken]').val();

  $('.noview').each(function () {
    var et = $(this).offset().top;
    var eh = $(this).outerHeight();
    if (wt + wh >= et && wt + wh - eh * 2 <= et + (wh - eh)) {
      if (block_show == null || block_show == false) {
        $.ajax({
          type: 'POST',
          url: '/holding/view_counter_view/',
          headers: { 'X-CSRFToken': csrftoken },
          data: {
            type: 'show',
            obj: $(this).children('.object_id_input').val(),
          },
          success: function (html) {},
        });
        $(this).removeClass('noview');
      }
      block_show = true;
    }
  });
});
$(window).scroll(function () {
  // console.log('scroll');
  var block_show = null;
  var wt = $(window).scrollTop();
  var wh = $(window).height();

  $('.noview').each(function () {
    var et = $(this).offset().top;
    var eh = $(this).outerHeight();
    var csrftoken = $('[name=csrfmiddlewaretoken]').val();
    if (wt + wh >= et && wt + wh - eh * 2 <= et + (wh - eh)) {
      if (block_show == null || block_show == false) {
        $.ajax({
          type: 'POST',
          url: '/holding/view_counter_view/',
          headers: { 'X-CSRFToken': csrftoken },
          data: {
            type: 'show',
            obj: $(this).children('.object_id_input').val(),
          },
          success: function (html) {},
        });
        $(this).removeClass('noview');
      }
      block_show = true;
    }
  });
});
$(document).ready(function () {
  // переключение между вкладками

  $('.search-header__tab-rent').click(function () {
    $('.search-header__tab-rent').addClass('_active');
    $('.search-header__tab-sell').removeClass('_active');
    $('.search-rent').css({ display: 'block' });
    $('.search-sell').css({ display: 'none' });
    $('#needs').val('rent');
  });

  $('.search-header__tab-sell').click(function () {
    $('.search-header__tab-sell').addClass('_active');
    $('.search-header__tab-rent').removeClass('_active');
    $('.search-sell').css({ display: 'block' });
    $('.search-rent').css({ display: 'none' });
    $('#needs').val('sell');
  });

  // обработчик модальных окон в поиске

  document.querySelectorAll('.search-input__modal').forEach(function (elem, i) {
    elem.addEventListener('click', function (event) {
      const guestsField = event.target.closest('.search-input__modal');
      if (guestsField) {
        $($('.search-modal')[i]).slideDown(300);
      }

      if (
        !guestsField ||
        event.target.classList.contains('search-modal-close')
      ) {
        $($('.search-modal')[i]).slideUp(300);
      }
    });
  });

  document.body.addEventListener('keydown', function () {
    if (event.key == 'Escape') {
      $('.search-modal').slideUp(300);
    }
  });

  // модальное окно для кол-ва людей и комнат

  const adultsField = document.querySelector('.guests-field__adults'),
    childsField = document.querySelector('.guests-field__childs'),
    roomsField = document.querySelector('.guests-field__rooms');

  let adultsText = document.querySelector('.guests .adults'),
    childsText = document.querySelector('.guests .childs'),
    roomsText = document.querySelector('.guests .rooms');

  function guestsFieldsHanlder() {
    // поле "взрослые"
    adultsText.textContent =
      adultsField.value > 1 || adultsField.value == 0 ? 'взрослых' : 'взрослый';
    document.querySelector('#adult').value = adultsField.value;

    // поле "дети"
    childsText.textContent =
      childsField.value == 1
        ? 'ребёнок'
        : childsField.value >= 2 && childsField.value <= 4
        ? 'ребёнка'
        : childsField.value > 4 || childsField.value == 0
        ? 'детей'
        : '0';
    document.querySelector('#childs').value = childsField.value;

    // поле "комнаты"
    roomsText.textContent =
      roomsField.value == 1
        ? 'комната'
        : roomsField.value >= 2 && roomsField.value <= 4
        ? 'комнаты'
        : roomsField.value > 4 || roomsField.value == 0
        ? 'комнат'
        : '0';
    document.querySelector('#rooms').value = roomsField.value;
  }

  document.querySelectorAll('.guests-modal-part').forEach(function (elem, i) {
    document.querySelectorAll('.guests-field')[i].dataset.giuestsFieldId = i;

    // клик по минусу
    document
      .querySelectorAll('.guests-modal__minus')
      [i].addEventListener('click', function () {
        if (
          parseInt(
            document.querySelectorAll('.guests-modal__value')[i].textContent
          ) > 0
        ) {
          document.querySelectorAll('.guests-modal__value')[i].textContent =
            parseInt(
              document.querySelectorAll('.guests-modal__value')[i].textContent
            ) - 1;
          if (
            document.querySelectorAll('.guests-field')[i].dataset
              .giuestsFieldId == i
          ) {
            document.querySelectorAll('.guests-field')[i].value =
              document.querySelectorAll('.guests-modal__value')[i].textContent;
          }
        }
        if (
          parseInt(
            document.querySelectorAll('.guests-modal__value')[i].textContent
          ) == 0
        ) {
          document
            .querySelectorAll('.guests-modal__minus')
            [i].classList.add('_blocked');
        }
        guestsFieldsHanlder();
      });

    // клик по плюсу
    document
      .querySelectorAll('.guests-modal__plus')
      [i].addEventListener('click', function () {
        document.querySelectorAll('.guests-modal__value')[i].textContent =
          parseInt(
            document.querySelectorAll('.guests-modal__value')[i].textContent
          ) + 1;
        if (
          parseInt(
            document.querySelectorAll('.guests-modal__value')[i].textContent
          ) > 0
        ) {
          document
            .querySelectorAll('.guests-modal__minus')
            [i].classList.remove('_blocked');
          if (
            document.querySelectorAll('.guests-field')[i].dataset
              .giuestsFieldId == i
          ) {
            document.querySelectorAll('.guests-field')[i].value =
              document.querySelectorAll('.guests-modal__value')[i].textContent;
          }
        }
        guestsFieldsHanlder();
      });
  });

  $('.units-slider-rent__big').slick({
    infinite: false,
    swipe: false,
    adaptiveHeight: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 200,
    prevArrow: '<button class="units-btn units-btn__prev"></button>',
    nextArrow: '<button class="units-btn units-btn__next"></button>',
    responsive: [
      {
        breakpoint: 991,
        settings: {
          swipe: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          speed: 150,
          slidesToShow: 1,
          slidesToScroll: 1,
          swipe: true,
        },
      },
    ],
  });

  $('.units-slider-rent__small').slick({
    infinite: false,
    swipe: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 200,
    prevArrow:
      '<button class="units-btn-small units-btn-small__prev"></button>',
    nextArrow:
      '<button class="units-btn-small units-btn-small__next"></button>',
  });

  let rentCurrentSlide = 0,
    sellCurrentSlide = 0,
    smallRentUnitsArray = Array.prototype.slice.call(
      document.querySelectorAll('.units__rent .unit-small__wrapper')
    ),
    bigRentUnitsArray = Array.prototype.slice.call(
      document.querySelectorAll('.units__rent .unit-big__wrapper')
    ),
    smallSellUnitsArray = Array.prototype.slice.call(
      document.querySelectorAll('.units__sell .unit-small__wrapper')
    ),
    bigSellUnitsArray = Array.prototype.slice.call(
      document.querySelectorAll('.units__sell .unit-big__wrapper')
    );

  $('.units__rent .units-btn__next').click(function () {
    $('.units__rent .units-btn-small__next').trigger('click');

    rentCurrentSlide++;

    if ($(window).width() > 991) {
      if (rentCurrentSlide > smallRentUnitsArray.length - 4) {
        $('.units__rent .units-btn__next').fadeOut(50);
      }
    } else if ($(window).width() > 768 && $(window).width() < 991) {
      if (rentCurrentSlide > bigRentUnitsArray.length - 3) {
        $('.units__rent .units-btn__next').fadeOut(50);
      }
    } else {
      if (rentCurrentSlide > bigRentUnitsArray.length - 2) {
        $('.units__rent .units-btn__next').fadeOut(50);
      }
    }

    $('.units__rent .units-btn__prev').animate({ opacity: '1' }, 50);
    $('.units__rent .units-btn__prev').css({ cursor: 'pointer' });
  });

  $('.units__rent .units-btn__prev').click(function () {
    $('.units__rent .units-btn-small__prev').trigger('click');

    if (rentCurrentSlide !== 0) {
      rentCurrentSlide--;
    }

    if ($(window).width() > 991) {
      if (rentCurrentSlide <= smallRentUnitsArray.length - 4) {
        $('.units__rent .units-btn__next').fadeIn();
      }
    } else if ($(window).width() > 768 && $(window).width() < 991) {
      if (rentCurrentSlide <= bigRentUnitsArray.length - 3) {
        $('.units__rent .units-btn__next').fadeIn();
      }
    } else {
      if (rentCurrentSlide <= bigRentUnitsArray.length - 2) {
        $('.units__rent .units-btn__next').fadeIn();
      }
    }

    if (rentCurrentSlide == 0) {
      $('.units__rent .units-btn__prev').animate({ opacity: '0' }, 50);
      $('.units__rent .units-btn__prev').css({ cursor: 'auto' });
    }
  });

  $('.units__sell .units-btn__next').click(function () {
    $('.units__sell .units-btn-small__next').trigger('click');

    sellCurrentSlide++;

    if ($(window).width() > 991) {
      if (sellCurrentSlide > smallSellUnitsArray.length - 4) {
        $('.units__sell .units-btn__next').fadeOut(50);
      }
    } else if ($(window).width() > 768 && $(window).width() < 991) {
      if (sellCurrentSlide > bigSellUnitsArray.length - 3) {
        $('.units__sell .units-btn__next').fadeOut(50);
      }
    } else {
      if (sellCurrentSlide > bigSellUnitsArray.length - 2) {
        $('.units__sell .units-btn__next').fadeOut(50);
      }
    }

    $('.units__sell .units-btn__prev').animate({ opacity: '1' }, 50);
    $('.units__sell .units-btn__prev').css({ cursor: 'pointer' });
  });

  $('.units__sell .units-btn__prev').click(function () {
    $('.units__sell .units-btn-small__prev').trigger('click');

    if (sellCurrentSlide !== 0) {
      sellCurrentSlide--;
    }

    if ($(window).width() > 991) {
      if (sellCurrentSlide <= smallSellUnitsArray.length - 4) {
        $('.units__sell .units-btn__next').fadeIn();
      }
    } else if ($(window).width() > 768 && $(window).width() < 991) {
      if (sellCurrentSlide <= bigSellUnitsArray.length - 3) {
        $('.units__sell .units-btn__next').fadeIn();
      }
    } else {
      if (sellCurrentSlide <= bigSellUnitsArray.length - 2) {
        $('.units__sell .units-btn__next').fadeIn();
      }
    }

    if (sellCurrentSlide == 0) {
      $('.units__sell .units-btn__prev').animate({ opacity: '0' }, 50);
      $('.units__sell .units-btn__prev').css({ cursor: 'auto' });
    }
  });

  // Переключение вкладок в блоке направлений

  $('#tab-directions').click(function () {
    $('.dir_directions').css({ display: 'block' });
    $('.dir_cities').css({ display: 'none' });
    $('.dir_regions').css({ display: 'none' });

    $('#tab-directions').addClass('dir-bar__tab_active');
    $('#tab-regions').removeClass('dir-bar__tab_active');
    $('#tab-cities').removeClass('dir-bar__tab_active');
  });

  $('#tab-regions').click(function () {
    $('.dir_regions').css({ display: 'block' });
    $('.dir_cities').css({ display: 'none' });
    $('.dir_directions').css({ display: 'none' });

    $('#tab-regions').addClass('dir-bar__tab_active');
    $('#tab-directions').removeClass('dir-bar__tab_active');
    $('#tab-cities').removeClass('dir-bar__tab_active');
  });

  $('#tab-cities').click(function () {
    $('.dir_cities').css({ display: 'block' });
    $('.dir_regions').css({ display: 'none' });
    $('.dir_directions').css({ display: 'none' });

    $('#tab-cities').addClass('dir-bar__tab_active');
    $('#tab-directions').removeClass('dir-bar__tab_active');
    $('#tab-regions').removeClass('dir-bar__tab_active');
  });

  // слайдер отзывов

  $('.feedback-slider').slick({
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: '<button class="feedback-btn feedback-btn__prev"></button>',
    nextArrow: '<button class="feedback-btn feedback-btn__next"></button>',
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  $('.search-form-btn_filter').click(function () {
    $('.modal-filter').fadeIn(300);
    $('body').css({ overflow: 'hidden' }, 0);
  });
  $('.modal-filter-close').click(function () {
    $('.modal-filter').fadeOut(300);
    $('body').css({ overflow: 'scroll' }, 0);
  });

  // мои скрипты
  $('.nobord_inp').click(function () {
    $('.dis_none').hide();
  });

  $('#type_span').click(function () {
    $('.dis_none').hide();
    $('#type_input').slideToggle(500);
  });
  $('#price_span').click(function () {
    $('.dis_none').hide();
    $('#price_inp').slideToggle(500);
  });
  $('#rooms_choise_span').click(function () {
    $('.dis_none').hide();
    $('#rooms_choise_inp').slideToggle(500);
  });

  $('.search_variants').on('click', '#sell_choice', function () {
    // alert('ho');
    $('#needs').val('sell');
    $(this).addClass('current_search_variant');
    $('#rent_choice').removeClass('current_search_variant');
    $('#sell_search_form').show();
    $('#rent_search_form').hide();
  });
  $('.search_variants').on('click', '#rent_choice', function () {
    // alert('ho');
    $('#needs').val('rent');
    $(this).addClass('current_search_variant');
    $('#sell_choice').removeClass('current_search_variant');
    $('#sell_search_form').hide();
    $('#rent_search_form').show();
  });
  $('#sell_search_form').hide();

  $('.search_fields').on('click', '#minus_adult', function () {
    adult = parseInt($('#adult').val());
    adult -= 1;
    $('#adult').val(adult);
    $('.adult').html(adult);
    $('#adult_sp').html(adult);
  });
  $('.search_fields').on('click', '#plus_adult', function () {
    adult = parseInt($('#adult').val());
    adult += 1;
    $('#adult').val(adult);
    $('.adult').html(adult);
    $('#adult_sp').html(adult);
  });

  $('.search_fields').on('click', '#minus_childs', function () {
    childs = parseInt($('#childs').val());
    childs -= 1;
    $('#childs').val(childs);
    $('.childs').html(childs);
    $('#childs_sp').html(childs);
  });
  $('.search_fields').on('click', '#plus_childs', function () {
    childs = parseInt($('#childs').val());
    childs += 1;
    $('#childs').val(childs);
    $('.childs').html(childs);
    $('#childs_sp').html(childs);
  });

  $('.search_fields').on('click', '#minus_rooms', function () {
    rooms = parseInt($('#rooms').val());
    rooms -= 1;
    $('#rooms').val(rooms);
    $('.rooms').html(rooms);
    $('#rooms_sp').html(rooms);
  });
  $('.search_fields').on('click', '#plus_rooms', function () {
    rooms = parseInt($('#rooms').val());
    rooms += 1;
    $('#rooms').val(rooms);
    $('.rooms').html(rooms);
    $('#rooms_sp').html(rooms);
  });

  $('#guests_span').click(function (event) {
    $('.guests_modal').slideToggle(400);
  });

  $('.guests_modal_close_wrapper').click(function () {
    $('.guests_modal').slideUp(400);
  });
});
$(document).ready(function () {
  // функционал галереи

  const objectImgBig = document.querySelector(
      '.object-card-info-photos-wrap_big .object-card-info-photos__img'
    ),
    objectImgBigLink = document.querySelector(
      '.object-card-info-photos-wrap_big a'
    ),
    objectImgsSmall = document.querySelectorAll(
      '.object-card-info-photos-wrap_small .object-card-info-photos__img'
    ),
    objectImgsSmallLink = document.querySelectorAll(
      '.object-card-info-photos-wrap_small a'
    ),
    objectImgs = document.querySelectorAll('.object-card-info-photos__img'),
    reservePopup = document.querySelector('.reserv');

  let fancybox, fancyBoxSlide, fancyBoxContent, fancyBoxBtnClose;

  objectImgsSmall.forEach(function (elem, i) {
    elem.addEventListener('mouseover', function () {
      let srcSmallImg = elem.getAttribute('src'),
        hrefObjectImgsSmallLink = objectImgsSmallLink[i].getAttribute('href');
      objectImgBig.classList.add('fadeIn');
      objectImgBig.setAttribute('src', hrefObjectImgsSmallLink);
      objectImgBigLink.setAttribute('href', hrefObjectImgsSmallLink);
    });
    elem.addEventListener('mouseout', function () {
      objectImgBig.classList.remove('fadeIn');
    });
  });

  $('[data-fancybox="object-gallery"]').fancybox({
    baseClass: 'myFancyBox',
    thumbs: {
      autoStart: true,
      axis: 'x',
    },
  });

  function openReservePoput() {
    setTimeout(() => {
      fancybox = document.querySelector('.myFancyBox');
      fancyBoxBtnClose = fancybox.querySelector('.fancybox-button--close');
      fancyBoxBtnClose.addEventListener('click', closeReservePopup);
      document.addEventListener('keydown', closeReservePopup);
      fancybox.addEventListener('click', closeReservePopup);
    }, 0);
    reservePopup.style.display = 'block';
    reservePopup.classList.add('fadeIn');
  }

  function closeReservePopup(e) {
    if (
      !fancybox.classList.contains('fancybox-is-open') ||
      e.code == 'Escape'
    ) {
      console.log(1);
      reservePopup.style.display = 'none';
      reservePopup.classList.remove('fadeIn');
    }
  }

  objectImgs.forEach(function (elem, i) {
    elem.addEventListener('click', openReservePoput);
  });

  document
    .querySelector('.object-card-info-photos-more')
    .addEventListener('click', openReservePoput);

  $('.slider_features').slick({
    infinite: false,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow:
      '<button type="button" class="slick-next scrollbut r_scroll_but foto_scroll_but"><img class="arrow_but" src="./icon/keyboard-right-arrow.svg"/></button>',
    prevArrow:
      '<button type="button" class="slick-prev scrollbut l_scroll_but foto_scroll_but"><img class="arrow_but" src="./icon/keyboard-left-arrow.svg"/></button>',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  });

  $('.slider_feedback').slick({
    infinite: false,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow:
      '<button class="slick-next scrollbut r_scroll_but"><img class="arrow_but" src="./icon/keyboard-right-arrow.svg"/></button>',
    prevArrow:
      '<button class="slick-prev scrollbut l_scroll_but"><img class="arrow_but" src="./icon/keyboard-left-arrow.svg"/></button>',
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  document
    .querySelectorAll('.slider-features .slider_item')
    .forEach(function (elem, i) {
      elem.dataset.objectId = i;
    });
  document
    .querySelectorAll('.slider-feedback .slider_item')
    .forEach(function (elem, i) {
      elem.dataset.objectId = i;
    });

  document.querySelectorAll('.r_scroll_but').forEach(function (elem, i) {
    elem.dataset.nextSliderBtnId = i;
    document.querySelectorAll('.slider_wrap_wrap')[i].dataset.sliderId = i;
    document.querySelectorAll('.l_scroll_but')[i].style.opacity = '0';
    elem.addEventListener('click', function () {
      if (
        document
          .querySelectorAll('.slider_wrap_wrap')
          [i].querySelector(".slider_item[data-object-id='0']")
          .getBoundingClientRect().left -
          document.querySelectorAll('.l_scroll_but')[i].getBoundingClientRect()
            .left <
        document.querySelectorAll('.slider_wrap_wrap .slider_item')[i]
          .offsetWidth
      ) {
        document.querySelectorAll('.l_scroll_but')[i].style.opacity = '1';
      }
      if (
        document
          .querySelector(
            '.slider_wrap_wrap[data-slider-id=' + '"' + i + '"' + ']'
          )
          .querySelectorAll('.slider_item')
          [
            document
              .querySelector(
                '.slider_wrap_wrap[data-slider-id=' + '"' + i + '"' + ']'
              )
              .querySelectorAll('.slider_item').length - 2
          ].getBoundingClientRect().left +
          document.querySelectorAll('.slider_wrap_wrap .slider_item')[i]
            .offsetWidth <
        document.querySelectorAll('.r_scroll_but')[i].getBoundingClientRect()
          .left
      ) {
        document.querySelectorAll('.r_scroll_but')[i].style.opacity = '0';
      }
    });
  });

  document.querySelectorAll('.l_scroll_but').forEach(function (elem, i) {
    elem.addEventListener('click', function () {
      if (
        document
          .querySelectorAll('.slider_wrap_wrap')
          [i].querySelector(".slider_item[data-object-id='1']")
          .getBoundingClientRect().left >
        document.querySelectorAll('.l_scroll_but')[i].getBoundingClientRect()
          .left
      ) {
        document.querySelectorAll('.l_scroll_but')[i].style.opacity = '0';
      }
      if (
        document
          .querySelector(
            '.slider_wrap_wrap[data-slider-id=' + '"' + i + '"' + ']'
          )
          .querySelectorAll('.slider_item')
          [
            document
              .querySelector(
                '.slider_wrap_wrap[data-slider-id=' + '"' + i + '"' + ']'
              )
              .querySelectorAll('.slider_item').length - 1
          ].getBoundingClientRect().left <
        document.querySelectorAll('.r_scroll_but')[i].getBoundingClientRect()
          .left
      ) {
        document.querySelectorAll('.r_scroll_but')[i].style.opacity = '1';
      }
    });
  });

  // выпадающие списки на маленьких экранах в блоке услуг

  if ($(document).width() <= 768) {
    $('.service-block-part').each(function (i, elem) {
      $(elem).click(function () {
        $(elem).children('.service-block-list').slideToggle(300);
        $(elem)
          .children('.service-block-part-heading')
          .toggleClass('service-block-part-heading_slided');
      });
    });
  }

	// валидация почты




});

$(document).ready(function () {
  function validateForms(form) {
    $(form).validate({
      rules: {
				email: {
					required: true,
					email: true,
				},
      },
      messages: {
				email: {
					required: 'Пожалуйста, введите свою почту',
					email: 'Неправильно введена почта',
				},
      },
    });
  }

  validateForms('#sub-form');
});