
(function () {
	'use strict';

	Nis.View.OIDMain = Uic.FGLayout.extend({
		className:"row no-gutter",
		initialize: function(options) {
			console.log('initialize:', options);
			var layoutInfo = {
				id:'OIDMain',
				items:[
					{
						regionName:'tree',
						className:'col-ld-6',
					},
					{
						regionName:'details',
						className:'col-ld-6',
					},
				],
			};
			Uic.FGLayout.prototype.initialize.call(this, layoutInfo);		
			this.showView('tree');	
		},
		onAfterInit:function(options) {
			this.rootNode.loadChildren(options);
		},
		onChangedTree:function(oidNode, selected, data, e) {
			console.log('onChangedTree:', oidNode, selected, data, e);
			this.showView('details', oidNode);
		},
		onNodeData:function(node, cb) {
			console.log('onNodeData:', node, cb);
			if(node.id === '#') {
				cb([this.rootNode]);
			}
			else {
				cb(['Child']);
			}
			//rootNode.loadChildren();
		},
		makeView:function(regionName, options) {
			if(regionName === 'tree') {
				return this.makeTreeView();
			}
			else if(regionName === 'details') {
				return this.makeDetailView(options);
			}
			return Uic.FGLayout.prototype.makeView.call(this, regionName, regionName);		
		},
		makeTreeView:function(options) {
			var options = {
				core: {
					check_callback:true,
					data:this.onNodeData.bind(this),
				},
			};
			this.rootNode = new NisMVC.OIDNode({
				id: Nis.Model.OID.rootId.split('.').join('-'),
				oid: Nis.Model.OID.rootId,
				text:'root',
			});
			var treePanel = new Uic.PanelLayout({id:'treeViewPanel', hasHeader:true});
			var tree = new Uic.JsTree(options);
			//this.treeView = tree;
			tree.on('onChanged', this.onChangedTree.bind(this));
			treePanel.setHeader('OID 트리');
			treePanel.setContents(tree);
			treePanel.$el.css('min-width', '300px');
			//treePanel.$el.css('max-width', '300px');
			treePanel.$el.css('min-height', '300px');
			treePanel.$el.css('max-height', '600px');
			treePanel.$el.css('overflow', 'auto');
			//this.showView('tree', treePanel);
			setTimeout(this.onAfterInit.bind(this), 1000, {tree:tree});
			return treePanel;
		},
		makeDetailView:function(options) {
			var view = new Uic.PanelLayout({hasHeader:true});
			view.setHeader("OID 상세 정보");
			view.setContents(this.makeDetailForm({
				exclude:[
					'id',
					'country',
					'requestType',
					'requestStatus',
					'memo',
					'userReviewer',
					'authorUserid',
				],
			}));
			if(options.oidEntity) {
				view.getContents().setModelAttrs(options.oidEntity);
			}
			return view;
		},
		makeDetailForm:function(param) {			
			var options = {                
				readOnly:true,
				items:Nis.Model.OIDBase.columns,
			};
			if(param && param.exclude) {
				var itemUtil = new Nis.UiInfo.ItemUtil(options);				
				options.items = itemUtil.exclude(param.exclude);
			}
			var view = new Uic.FormView(options);
			return view;
		},

	}); // end of Nis.View.OIDMain
})();

