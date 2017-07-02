;(function($, window, document,undefined) {

    $.fn.extend({
       
         /**
         * @name populate
         * @desc Populate form with json using jQuery. Resolve nested objects. 
         * @param {Object} json Standard JSON to populate FORM
         * @param {Boolean} [optional] byId find inputs with query by id
         * @returns {jQuery} jQuery
         * @type jQuery
         */
        populate: function(json, byId) {

            var eachElementIsNotObject = function(value) {
                return ( value.every(function(val){
                                        return typeof val != "object"; 
                                    })
                        );
            };

            var self = this;
            (function roam(el, father) {
                for(var property in el) {
                    if(el[property] || el[property] === 0) {
                        var value = el[property];
                        if( typeof value == "object" && !($.isArray(value) && eachElementIsNotObject(value) ) ) {
                            var parent = (!father)? property : father + "\\." + property;
                            if($.isArray(value)) {
                                for(var item in value) {
                                    if(value[item]) {
                                        var parent_arr = parent + "\\["+item+"\\]";
                                        roam(value[item], parent_arr);
                                    }
                                }
                            } else {
                                roam(value, parent);
                            }
                            parent = null;
                        } else {
                            var name = (father)? father + "\\." + property : property;
                            var query = "[name='" + name + "']";
                            if(byId) { query = ("#" + name); }
                            
							var other = self.find(query);
                            
                            if(other.length === 0){
                                var selector = query.replace(/\\\[(\d+)?\\\]/g, "\\[\\]"), 
                                    numChave = name.replace(/[^\\\[(\d+)?\\\]]/g, ""), 
                                    index = numChave.replace(/[^\d+]/g, "");
                                
                                other = self.find(selector).eq(index);
                            }
                            
                            other.val(value);
                        }
                    }
                }
            })(json);
            return this;
        }
       });
	

})(jQuery, window, document);