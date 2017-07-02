function initializePage(){
  bindOnResize();
  
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