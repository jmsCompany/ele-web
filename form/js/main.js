$(function(){
  initializePage();
  $('.carousel').bind('move', function(event){
    if(Math.abs(event.deltaX)<10){
      return;
    }
    if(event.deltaX>0){
      $(this).carousel('prev');
    }
    if(event.deltaX<0){
      $(this).carousel('next');
    }
  });
  
});

/*---------------method---------------*/
//