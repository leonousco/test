
(function () {
	'use strict';

	Uic.AccordionPanel = Uic.CompositeView.extend({
		className:'panel panel-default',
		initialize: function (options) {
			options.data = {
				id:options.id,
				title:options.title,
				aria_controls:options.aria_controls,
				href:options.href || options.id+"_href",
				data_parent:options.data_parent,
				subId:this.getSubRegionName(options),
				headingId:this.getUniqId('heading'),
				panelTitleId:this.getUniqId('panelTitle'),
				//collapse:'collapse',
				collapse:options.collapse,
			};
			if(options.collapse === false)
				options.data.collapse = '';
			else
				options.data.collapse = 'collapse';
			Uic.CompositeView.prototype.initialize.call(this, options);
			var title = this.$el.find('#'+options.data.panelTitleId);
			title.on('click', this.onClickTitle.bind(this));
			if(options.title) {
				this.setTitleView(options.title);
			}
			if(options.body) {
				this.setBodyView(options.body);
			}
		},
		getSubRegionName:function(options){
			return 'sub_'+options.id;
		},
		getDefaultTemplate:function(options) {
			var raw = ''
					+'<div class="panel-heading" role="tab" id="{{headingId}}">'
						+'<div id="{{panelTitleId}}" class="panel-title" role="button" data-toggle="collapse" data-parent="#{{data_parent}}" href="#{{href}}" aria-expanded="true" aria-controls="{{aria_controls}}">'
						+'</div>'
					+'</div>'
					+'<div id="{{href}}" class="panel-collapse {{collapse}}" role="tabpanel" aria-labelledby="{{headingId}}">'
					+'</div>';
			return raw;
		},
		setBodyView:function(view){
			var subView = this.makePanelBody();
			if(_.isString(view)) {
				subView.$el.text(view);				
			}
			else {
				subView.$el.append(view.el);
				this.bodyView = view;
			}			
		},
		setTitleView:function(view) {
			var titleView = this.$el.find('#'+this.options.data.panelTitleId);
			if(_.isString(view)) {
				var title = new Uic.View({id:'h4'});
				title.$el.text(view);
				titleView.append(title.el);
			}
			else {
				titleView.append(view.el);
			}						
		},
		makePanelBody:function() {
			var bodyView = new Uic.View({
				id:this.options.data.subId,
				className:'panel-body',
			});
			var subView = this.$el.find('#'+this.options.data.href);
			subView.append(bodyView.el);
			return bodyView;
		},
		onClickTitle:function(options) {
			console.log("onClickTitle:", options);
		},
		setModelAttrs:function(attributes){
			if(this.bodyView)
				this.bodyView.setModelAttrs(attributes);
		},
		setModel:function(model){
			if(this.bodyView)
				this.bodyView.setModel(model);
		},
		getModel:function() {
			if(this.bodyView)
				return this.bodyView.getModel();
		    return null;
		},

	});

	Uic.AccordionPanelView = Uic.CompositeView.extend({
		className:'panel-group',
		attributes: {
			role:"tablist",
			'aria-multiselectable':"true",
		},
		childPanels:[],
		initialize: function (options) {
			Uic.CompositeView.prototype.initialize.call(this, options);
			if(options.items) {
				for(var i=0;i<options.items.length;i++) {
					this.addItem(options.items[i]);
				}
			}
		},
		addPanelView:function(options) {
			var panel = this.addItem({
				title:options.title,
			});
			var view = new Uic.AccordionPanelView({
				id:this.getUniqId('AccordionPanelView'),
			});
			panel.setBodyView(view);
			if(options.items) {
				for(var i=0; i<options.items.length; i++) {
					view.addItem(options.items[i]);
				}
			}
			return view;
		},
		addItem:function(data) {
			if(data instanceof Uic.AccordionPanel) {
				this.$el.append(data.el);		
				this.childPanels.push(data);
				return data;
			}
			if(_.isUndefined(data.href)) {
				data.href = this.getUniqId('href');
			}
			if(! data.id) {
				data.id = this.getUniqId('AccordionPanel');
			}
			var options = _.extend({
				data_parent:this.options.id,
				href:'#'+data.href,
				aria_controls:data.aria_controls || data.href,
				collapse:data.collapse,
			}, data);
			var panel = new Uic.AccordionPanel(options);
			return this.addItem(panel);
		},
		setModelAttrs:function(attributes){
			for(var i=0; i<this.childPanels.length; i++) {
				this.childPanels[i].setModelAttrs(attributes);
			}
		},
		setModel:function(model){
			for(var i=0; i<this.childPanels.length; i++) {
				this.childPanels[i].setModel(model);
			}
		},
		getModel:function() {
			for(var i=0; i<this.childPanels.length; i++) {
				var model = this.childPanels[i].getModel();
				if(model)
					return model;
			}
		    return null;
		},
	});


})();

