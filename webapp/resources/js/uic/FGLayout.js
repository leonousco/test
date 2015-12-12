
(function () {
    'use strict';

	Uic.FGLayout = Uic.LayoutView.extend({
		initialize: function(options) {
			options = this.buildOptions(options);
		    	Uic.LayoutView.prototype.initialize.call(this, options);
		},
		buildOptions:function(options){
			var newOptions = _.extend({
				id:'FGLayout',
				items:[
					{
						regionName:'row1',
						className:'row-fluid',
					},
					{
						regionName:'row2',
						className:'row-fluid',
					},
				],
			}, options);
			newOptions.regions = this.makeRegions(newOptions);
			return newOptions;
		},
		makeRegions:function(options){
			var regions = {};
			for(var i=0; i<options.items.length;i++) {
				regions[options.items[i].regionName] = "#" + this.getLayoutItemId(options, i);
			}
			return regions;
		},
		getDefaultTemplate:function(options) {
			var ret ='';
			for(var i=0; i<options.items.length;i++) {
				ret += this.makeTemplateItem(options, i, options.items[i].className);
			}
			return ret;
		},
		getLayoutItemId:function(options, index){
			return options.id+'_'+options.items[index].regionName;
		},
		makeTemplateItem:function(options, index, className){
			var data = {
				id:this.getLayoutItemId(options, index),
				class:className,
			};
			var html = Handlebars.compile(this.getTemplateItem())(data);
			return html;
		},
		getTemplateItem:function(){
			//return '<div id="alertView"></div> <div id="{{id}}" class="{{class}}"></div>'
			return '<div id="{{id}}" class="{{class}}"></div>'
		},
		alert:function(options) {
			options = {
				type:options.type || 'info',
				title:options.title || '',
				message:options.message || '',
			};
			var html = Handlebars.compile(this.getAlertTemplate())(options);
			$("#alertView").html(html);
		},
		getAlertTemplate:function(){
			var html = ''
			+'<div class="alert alert-{{type}}">'
				+'<a class="close" data-dismiss="alert" aria-label="close">&times;</a>'
				+'<strong> {{title}} </strong><span> {{message}} </span>'
			+'</div>'
			return html;
		},
		makeView:function(regionName, options) {
			if(options instanceof Backbone.View) {
				return options;
			}
			var view = this.createView(options);
			return view;
		},
		showView:function(regionName, options){
		    this.setView(regionName, this.makeView(regionName, options));
		},
		setView:function(regionName, view){
			//console.log('makeView:', view instanceof Backbone.View);
			if(view instanceof Backbone.View) {
				this[regionName].show(view);
			}
			else {
				var newView = this.createView(view);
				if(newView != null) {
					this[regionName].show(newView);
				}
			}
		},
		getView:function(regionName){
			return this[regionName].currentView;
		},
		createView:function(options){
			if(_.isUndefined(options))
				return null;
			var view = new Uic.View();
			if(options instanceof jQuery) {
				view.setElement(options);
			}
			else if(_.isString(options)) {
				view.$el.html(options)
			}
			else if(options && options.title) {
				view = new Uic.View({
					raw:'<h2>'+options.title+'</h2>',
				});
			}
			return view;
		},
	}); // end of Uic.FGLayout

})();
