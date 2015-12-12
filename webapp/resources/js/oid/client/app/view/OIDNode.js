
(function () {
	'use strict';

	NisMVC.OIDNode = Backbone.Marionette.Object.extend({
		id:null,
		text:'',
		checkChild:false,
		initialize: function(options) {
			console.log('initialize:', options);
			this.id = options.id;
			this.oid = options.oid;
			this.text = options.text;
			this.tree = options.tree;
			this.oidEntity = options.oidEntity;
			this.state = 'open';
			this.data = options.oidEntity;
		},
		onChanged:function(){
			this.startLoadChildren();
		},
		loadChildren:function(options){
			this.tree = options.tree;
			this.startLoadChildren();
		},
		startLoadChildren:function(){
			if(this.checkChild)
				return;
			var collection = new Nis.Collection.OID();
			var options = {
				oid:this.oid,
				success:this.onSuccessLoadChild.bind(this),
				error:this.onErrorLoadChild.bind(this),
			};
			this.checkChild = true;
			collection.getChildren(options);
		},
		onSuccessLoadChild:function(resp){		
			console.log('onSuccessLoadChild:', resp);
			var result = resp;
			if(resp.body)	
				result = resp.body;
			for(var i=0; i<result.length; i++) {
				var oidEntityR = result[i];
				var options = {
					oid: oidEntityR.identifier,
					text: oidEntityR.arc,
					oidEntity: oidEntityR,
					tree:this.tree,
					id:oidEntityR.identifier.split('.').join('-'),
				};
				var node = new NisMVC.OIDNode(options);
				this.tree.createNode({
					parent:this.id,
					childNode:node,
				});
			}			
		},
		onErrorLoadChild:function(resp){			
			console.log('onErrorLoadChild:');
		},
	
	}); // end of NisMVC.OIDNode



})();

