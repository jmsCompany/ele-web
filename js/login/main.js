$(function(){
	$("input[type='text']").not(".no").each(function(){
		$(this).placeholder();
	});
	$(".tabs").each(function(){
		$(this).tabs();
	});
	resize();
	$(window).resize(function(event) {
		resize();
	});

	setTimeout(function(){
		hideNoti();
	}, 5000);

	$(".pt_navi >ul >li.on >p >a").click(function(event) {
		$(this).parents('li').toggleClass('on');
		return false;
	});

	$(".checkbox, .radio").click(function(event) {
		$(this).toggleClass('on');
		return false;
	});
	$(".select").each(function(index, el) {
		var $obj=$(this);
		$obj.find('.label').click(function(event) {
			$obj.toggleClass('on');
		});
		$obj.find('.value').click(function(event) {
			$obj.find('.label').html($(this).html());
			$obj.removeClass('on');
		});
	});





});

/*main*/
//

/*call*/
//
function resize(){
	var ht=$(window).height();
	$(".flht").height(ht-85);

	var h_s=$(".pt_navi >ul").height();
	if(h_s>ht-85){
		$(".pt_navi").addClass('scroll');
	}else{
		$(".pt_navi").removeClass('scroll');
	}
}

function changeBox(id1, id2){
	$("#"+id1).addClass('backend');
	setTimeout(function(){
		$("#"+id1).addClass('none');
	}, 1000);

	$("#"+id2).removeClass('none');
	$("#"+id2).removeClass('backend');
}
function hideNoti(){
	$(".pt_noti").fadeOut('300');
}