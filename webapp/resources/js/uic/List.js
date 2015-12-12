
(function () {
	'use strict';

	Uic.List = Uic.View.extend({
		initialize: function (options) {
			Uic.View.prototype.initialize.call(this, options);
			var items = options.items;
			for(var i=0; i<items.length; i++){
				if(_.isFunction(items[i])) {
					this.$el.append(items[i](i));
				}
				else {
					var html = this.getItemHtml(options.itemRaw, items[i]);
					this.$el.append($(html));					
				}
			}			
		},
		getItemHtml:function(raw, data){
			var options = {
				raw:raw,
				data:data,
			};
			var html = this.compileTemplate(options);
			return html;
		},
	});


})();

