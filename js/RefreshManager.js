/**
 * Created by slashhuang on 16/4/20.
 */


(function(){
    var refreshFunc=function(){
        var params = RouterManager.getParams();
        var viewId='';
        if(params['groupId']){
            //groupId也可以标示页面
            viewId=params['viewId']||params['groupId'];
        }else{
            viewId='welcome'
        }
        var renderUrl = "views/"+viewId+".html?_=" + Math.random();
        $.get(renderUrl,function(data){
                $("#body").html(data);
            var groupId = params['groupId'] || viewId;
            setTimeout(function(){
				$(".menu_left li").each(function(e){
					if($(this).attr("page-name")==groupId){
						$(".child").hide();
						$(this).parent("ul").show();
						$(this).addClass("active").siblings().removeClass("active");
					}
				});
            },0);
        });
    };
    //刷新立即执行
     refreshFunc();
     window['RefreshManager'] = refreshFunc;
}());