function initializePage(){
  bindOnResize();
  bindToggleOn();
  
}

/*---------------method---------------*/
//
function bindOnResize(){
  var resize=function(){
    var height=$(window).height();
    $('.full-height').height(height);
  }
  resize();
  $(window).resize(function(event) {
    resize();
  });
}
function bindToggleOn(){
  $('toggle-on').click(function(event) {
    $(this).toggleClass('on');
  });
}