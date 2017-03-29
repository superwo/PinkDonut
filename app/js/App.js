var $percent = $('.pie__percent');
var $percentText = $('.features__title span');

function showChart() {
  $percent.each(function(e) {
    var $this = $(this),
        countTo = parseFloat($(this).attr('data-percent')),
        $theSpan = $($percentText[e]);
    if(countTo < 0) {
      countTo = 0;
    } else if( countTo > 100) {
      countTo = 100;
    }

    var waypoint = new Waypoint({
    element: $this[0],
    handler: handleThis.bind(this),
    offset: '65%'
  });

    function handleThis() {
       $({ countNum: $theSpan.text()}).animate({
        countNum: countTo
      },

      {
        duration: 3000,
        easing:'swing',
        step: function() {
          $theSpan.text(Math.floor(this.countNum) + '%');
          $this.parent('.pie').attr('style', 'animation-delay: -'+this.countNum+'s');
        },
        complete: function() {
          $theSpan.text(this.countNum + '%');
          $this.parent('.pie').attr('style', 'animation-delay: -'+this.countNum+'s');
          //alert('finished');
        }
      });
      waypoint.destroy();
    }
  });
}

$(document).ready(function() {

  //smooth scrolling
  $('.nav__link').smoothScroll();
  $('#mainheaderScroll, .section-link').smoothScroll({
    offset: 70
  });

  // equal heights
  $('.features__descr').matchHeight();

  // navigation
  $(".toggle-nav").click(function() {
    $(this).toggleClass("on");
    $(".nav__list").slideToggle(300, function() {
      if($(this).css('display') === 'none') {
        $(this).removeAttr('style');
      }
    });
    return false;
  });


  //reveal elements on scroll
  revealItems($('.what__features .features__item'), '65%');
  revealItems($('.section-title'), '90%');
  // revealItems($('.section-descr'), '70%');


  // Popup
  $('.portfolio__list').magnificPopup({
    delegate: 'a',
    type: 'image'
    // other options
  });
  $('.btn--banner').magnificPopup({
    type: 'inline'
  });

  // //Carousel
  $('.banner__navigation-item').on('click', function(e) {
    var $this = $(this),
        i = $this.index(),
        $bannerItem = $('.banner__item');
    $('.banner__navigation-item').removeClass('active');
    $this.addClass('active');
    $bannerItem.removeClass('active');
    $($bannerItem[i]).addClass('active');
  });

  // ajax loading
  $('#loadPortfolio').on('click', function(e) {
    e.preventDefault();
    $('.loader').show();
    loadPortfolio();
  });
  // retrieve more portfolio items
  function loadPortfolio() {
     $.getJSON("../portfolio.json", function(data) {
       var container = $('.portfolio__list');
       $.each(data, function(key, value){
           var item = $('<li></li>');
           item.addClass('portfolio__item');
           var html = '<a class="portfolio__view" style="background-image: url('+value.url+');" href="'+value.url+'"><span></span></a>';
           item.html(html);
           container.append(item);
       });
     })
     .done(function() {
        $('#loadPortfolio').parent('.btn-wrap').hide();
      })
     .fail(function() { console.error("error from getJSON!"); })
     .always(function() {
    $('.loader').hide();
  });

   }

   // Pie Charts
   showChart();

  //moving Icons
  // init controller
  var controller = new ScrollMagic.Controller();
  // create a scene
  var scene = new ScrollMagic.Scene({
          duration: 230,    // the scene should last for a scroll distance of 100px
          offset: 150        // start this scene after scrolling for 50px
      })
      .setPin("#mainheaderIc") // pins the element for the the scene's duration
      .addTo(controller); // assign the scene to the controller
      function setSceneDuration() {
        if($(window).width() < 770) {
          scene.duration(90);
        }
        else {
          scene.duration(230);
        }
      }
      setSceneDuration();
      $(window).on('resize', setSceneDuration);

    // Change the href of #mainheaderScroll
    var mainScroll = $('#mainheaderScroll');
    var theLink = new Waypoint({
      element: document.getElementById('what'),
      handler: function(direction) {
        if(direction == "down"){
          mainScroll.attr('href', '#portfolio');
        } else {
          mainScroll.attr('href', '#what');
        }
      }
    });
});


function revealItems(els, percent) {
  hideInitialy();
  createWaypoints();

  function hideInitialy() {
    els.addClass('reveal-item');
  }
  function createWaypoints() {
    els.each(function() {
      var currentItem = this;
      new Waypoint({
        element: currentItem,
        handler: function() {
          $(currentItem).addClass('reveal-item--is-visible');
        },
        offset: percent
      });
    });
  }
}
