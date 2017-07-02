/**
 * Created by slashhuang on 16/4/10.
 */

/**
 * 路由参数设定规则 API
 *
 * setUrl(params,source,callback)
 * @params 为key/value对象
 * @source 为填充的html模板地址
 * @callback 回调函数
 *
 * getParams() 返回对应的option对象
 *
 * ===调用==>
 *
 *  var params = {
 *      pageId:'123456',
 *      type:'edit'
 * }
 *
 * RouterManager.setUrl(params):浏览器地址变为
 * http:192.168.1.112/#/?orderId=123456&type=edit
 *
 * ===获取url参数==>
 * RouterManager.getParams()
 *
 * 返回
 * {
 *      orderId:'123456',
 *      type:'edit'
 * }
 */
window.RouterManager=(function(){
    var refresh = true;
    var hasown = {}.hasOwnProperty;
    //将url参数字符串化
    var stringifyPrimitive = function(v) {
        switch (typeof v) {
            case 'string':
                return v;
            case 'boolean':
                return v ? 'true' : 'false';
            case 'number':
                return isFinite(v) ? v : '';
            default:
                return '';
        }
    };
    var manager =  {
        setUrl:function(routeParams) {
            //调用setUrl则在历史记录插入，否则替换当前历史记录
            refresh =false;

           // var origin=location.origin;
            var origin;
            if(location.origin) {
                origin = location.origin;
            } else {
                origin = location.protocol + '//' + location.hostname;

                if(location.port.length) {
                    origin += ':' + location.port;
                }
            }
            
            var pathName=location.pathname.split('/');
            pathName.pop();
            var subModule=pathName.join('/');
            var prefix = origin+ subModule+'/#/';
            var paramList = [];
            if(Object.keys(routeParams).length>0){
                prefix+='?';
            }
            for(var key in routeParams){
                if(hasown.call(routeParams,key)){
                    var value = encodeURIComponent(stringifyPrimitive(routeParams[key]))
                    paramList.push(key+'='+value);
                }
            }

            var passToState={
                pageId:routeParams.pageId||''
            };
            //history.replaceState(passToState,'企业管理系统', prefix+paramList.join('&'));
            history.pushState(passToState,'企业管理系统', prefix+paramList.join('&'));
        },
        getParams:function(sep,eq){
            var paramString = location.hash.substr(3);
            var sep = sep||'&';//定义分隔符
            var eq = eq||'=';//定义等于号
            var obj = {};//用于返回数据
            if(!paramString){
                //没有查询参数就直接返回
            }else{
                var paramList = paramString.split(sep);
                for(var i=0;i<paramList.length;i++) {
                    //获取等于标示符
                    var eqStrIndex = paramList[i].indexOf(eq);
                    var keyStr = paramList[i].substr(0, eqStrIndex);//key
                    var valStr = paramList[i].substr(eqStrIndex + 1);//value
                    var k = decodeURIComponent(keyStr);
                    var v = decodeURIComponent(valStr);
                    obj[k] =  v;
                }
            }
            return obj;
        }
    };

    if (history.pushState) {
        //仅仅在前进后退的时候触发
        window.onpopstate = function(event) {
            if(!refresh) window.RefreshManager();
            else{
                refresh=false;
            }
        };
    }else{
        alert('请用chrome/firefox/或者IE10打开应用,请升级您的浏览器');
    }
    return manager
})();