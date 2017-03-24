var $percent = $('.pie__percent');
var $percentText = $('.features__title span');

$percent.each(function(e) {
  var percent = parseFloat($(this).attr('data-percent'));
  if(percent < 0) {
    percent = 0;
  } else if( percent > 100) {
    percent = 100;
  }
  $(this).parent('.pie').attr('style', 'animation-delay: -'+percent+'s');
  $($percentText[e]).text(percent + '%');
});

$(document).ready(function() {
  $('.features__descr').matchHeight();

  $(".toggle-nav").click(function() {
  $(this).toggleClass("on");
  $(".nav__list").slideToggle(300, function() {
    if($(this).css('display') === 'none') {
      $(this).removeAttr('style');
    }
  });
  return false;
});
});
