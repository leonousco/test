
(function () {
    'use strict';

	Uic.TreeWidget = Uic.View.extend({
		initialize: function(options) {
			console.log("initialize:", options);
			Uic.View.prototype.initialize.call(this, options);
			this.easytree = this.$el.easytree({
				allowActivate:true,
				building:this.building.bind(this),
				built:this.built.bind(this),
				openLazyNode: this.openLazyNode.bind(this),
				opening:this.opening.bind(this),
				opened:this.opened.bind(this),
				closed:this.closed.bind(this),
				closing:this.closing.bind(this),
			});          
			var sourceNode = {
				text:'test',
				isFolder:true,
				isLazy:true,
				isActive:true,
				children:[],
			};
			this.easytree.addNode(sourceNode , 0);
			//this.easytree.addNode({id:'childNode', text:'child'} , 'rootNode');
			this.easytree.buildNodes([sourceNode]);
			//this.easytree.rebuildTree();
			//this.setElement(this.easytree);
			//this.delegateEvents(this.events);
			//this.$el.find('.easytree-node').on('click', this.onClickNodes.bind(this));
		},        
		onClickNodes:function(param){
			console.log('onClickNodes:', param);
		},
		openLazyNode:function(event, nodes, node, hasChildren){
			console.log('openLazyNode:', event, nodes, node, hasChildren);
		},
		building:function(node){
			console.log('building:', node);
		},
		built:function(node){
			console.log('built:', node);
		},
		opening:function(event, nodes, node, hasChildren){
			console.log('opening:', event, nodes, node, hasChildren);
		},
		opened:function(event, nodes, node, hasChildren){
			console.log('opened:', event, nodes, node, hasChildren);
		},
		closed:function(event, nodes, node, hasChildren){
			console.log('closed:', event, nodes, node, hasChildren);
		},
		closing:function(event, nodes, node, hasChildren){
			console.log('closing:', event, nodes, node, hasChildren);
		},
		getDefaultTemplate:function(options) {
		    var ret =''		    		
		        +'<li class="isLazy isFolder">ROOT</li>';
		    return ret;
		},  

	}); // end of Uic.TreeView

})();
