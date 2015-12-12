
(function () {
    'use strict';

	Uic.PanelLayout = Uic.FGLayout.extend({
		className:'panel panel-default',
		//className:'panel panel-info',		
		buildOptions:function(options){		
			var newOptions = _.extend({
				id:'PanelLayout',
				items:[
				],
			}, options);
			if(options.hasHeader) {
				newOptions.items.push({
					regionName:'header',
					className:'panel-heading',					
				});
			}
			newOptions.items.push({
				regionName:'contents',
				className:'panel-body',
			});
			if(options.hasFooter) {
				newOptions.items.push({
					regionName:'footer',
					className:'panel-footer clearfix',
				});
			}
			newOptions.regions = this.makeRegions(newOptions);
			return newOptions;
		},
		setTitle:function(title){
			this.setHeader(title);
		},
		setHeader:function(view){
			if(this.options.hasHeader) {
				if(_.isString(view)) {
					view = '<h1 class="panel-title">'+view+'</h1>';
				}
				this.setView('header', view);				
			}
			else {
				console.error("setHeader:", "has not haeader");
			}
		},
		getHeader:function(){
			return this.getView('header');
		},
		setContents:function(view){
			this.setView('contents', view);
		},
		getContents:function(){
			return this.getView('contents');
		},
		setFooter:function(view){
			this.setView('footer', view);
		},
		getFooter:function(){
			return this.getView('footer');
		},
		setModel:function(model) {
		    this.getContents().setModel(model);
		},
		getModel:function() {
		    return this.getContents().getModel();
		},		
	}); // end of Uic.FGLayout 

})();
