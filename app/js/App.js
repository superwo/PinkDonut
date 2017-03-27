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
    }

  });
}

$(document).ready(function() {

  //smooth scrolling
  $('.nav__link').smoothScroll();
  $('#mainheaderScroll').smoothScroll();

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
  revealItems($('.what__features .features__item'), '65%')


  $('.portfolio__list').magnificPopup({
    delegate: 'a',
    type: 'image'
    // other options
  });

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
