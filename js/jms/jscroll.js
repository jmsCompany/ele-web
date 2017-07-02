; (function($, window, document, undefined) {
    $.scrollajax = function(options, callback) {
        var nomoreResult = false;
        var divid = options.div_id;
        var page = parseInt($("#page_" + divid).val());
        var size = parseInt($("#size_" + divid).val());
        var pageRequest = {
            page: page,
            size: size
        };
        if ($('#' + divid).length && $('#' + divid).length > 0) {
            $.jmsscroll(options.url, JSON.stringify(pageRequest), store.get('JMS-TOKEN'),
            function(result) {
                callback(result);
                if (Object.keys(result).length == 0) {
                    nomoreResult = true;
                }
            });
        }
       var starttime = new Date().getTime();
       var throldHold = 5000; //两次scroll事件触发之间最小的事件间隔
       $('#body').on("scroll",
         function(event) {
            var load = false;
            var scrollTop, maxScroll, minScroll = 0;
            scrollTop = this.scrollTop;
            maxScroll = this.scrollHeight - this.offsetHeight;
            if (scrollTop >= maxScroll) {
                var thisTime = new Date().getTime();
                  var timediff =thisTime - starttime;
                   if (timediff  < throldHold ) {
                          // alert('thisTime: ' + thisTime  +', starttime: '+starttime +'diff: ' +timediff);
                           starttime = thisTime;
                           load = false;
                            return;
                       }
                    else{ 
                        // alert('thisTime: ' + thisTime  +', starttime: '+starttime +'diff: ' +timediff +'可以滚动了');
                        starttime = thisTime;
                        load = true;
                       }
                    
            }
            if (!load) {
                return;
            }
            if (! ($('#' + divid).length && $('#' + divid).length > 0)) {
                return;
            }
            if (nomoreResult) {
                return;
            }
            page = parseInt($("#page_" + divid).val()) + 1;

            $("#page_" + divid).val('' + page);
            pageRequest = {
                page: page,
                size: size
            };
           // alert('#' + divid + ', scroll: ' + JSON.stringify(pageRequest));
            $.jmsscroll(options.url, JSON.stringify(pageRequest), store.get('JMS-TOKEN'),
            function(result) {
                callback(result);
                if (Object.keys(result).length == 0) {
                    nomoreResult = true;
                }
            });

        });
    }

})(jQuery, window, document);