
(function () {
    'use strict';

	Uic.TreeView = Uic.View.extend({
		initialize: function(options) {
			options = $.extend({
		          color: "#428bca",
		          expandIcon: 'glyphicon glyphicon-chevron-right',
		          collapseIcon: 'glyphicon glyphicon-chevron-down',
		          nodeIcon: 'glyphicon glyphicon-bookmark',	        					
				onNodeCollapsed:this.onNodeCollapsed.bind(this),
				onNodeExpanded:this.onNodeExpanded.bind(this),
				onNodeSelected:this.onNodeSelected.bind(this),
				onNodeUnselected:this.onNodeUnselected.bind(this),
				onNodeChecked:this.onNodeChecked.bind(this),
				onNodeUnchecked:this.onNodeUnchecked.bind(this),
			}, options)
			console.log("initialize:", options);
			Uic.View.prototype.initialize.call(this, options);
			this.$el.treeview(options);            
		},        
		onNodeCollapsed:function(event, node){
			console.log('onNodeCollapsed:', event, node)
			this.trigger('onNodeCollapsed', node, event);
		},
		onNodeExpanded:function(event, node){
			//console.log('onNodeExpanded:', event, node)
			this.trigger('onNodeExpanded', node, event);
		},
		onNodeSelected:function(event, node){
			//console.log('onNodeSelected:', event, node)
			this.trigger('onNodeSelected', node, event);
		},
		onNodeUnselected:function(event, node){
			//console.log('onNodeUnselected:', event, node)
			this.trigger('onNodeUnselected', node, event);
		},
		onNodeChecked:function(event, node){
			console.log('onNodeChecked:', event, node)
			this.trigger('onNodeChecked', node, event);
		},
		onNodeUnchecked:function(event, node){
			console.log('onNodeUnchecked:', event, node)
			this.trigger('onNodeUnchecked', node, event);
		},
	}); // end of Uic.TreeView

})();
