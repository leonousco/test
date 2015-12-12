
(function () {
    'use strict';

	Uic.JsTree = Uic.View.extend({
		initialize: function(options) {
			console.log("initialize:", options);
			Uic.View.prototype.initialize.call(this, options);
			options.core.themes = {
					name:'proton',
					responsive:true,
			};
			this.jstree = this.$el.jstree(options);          
			this.jstree.on('changed.jstree', this.onChanged.bind(this));
			var rootNode = this.$el.find('#root');
			console.log("initialize:", rootNode);
		},        
		onChanged:function(e, data){
			console.log('onChanged:', data.selected, e, data);
			var oidNode = data.node.original;
			console.log('onChanged: oidNode:', oidNode);
			if(oidNode.onChanged)				
				oidNode.onChanged();
			this.trigger('onChanged', oidNode, data.selected, data, e);
		},
		createNode:function(options) {
			var parent = $('#'+options.parent);
			var childNode = options.childNode;
			$(this.jstree).jstree('create_node', parent, childNode, 'inside', false, false);		
		},
	}); // end of Uic.JsTree

})();
