$(document).ready(function() {
    $('.carousel-indicators li').click(function() {
      $('.carousel-indicators li.active').removeClass('active');
      $(this).addClass('active');
  
      var targetSlide = $(this).data('slide-to');
      $('.carousel-inner .item.active').removeClass('active');
      $('.carousel-inner .item').eq(targetSlide).addClass('active');
    });
  });
  