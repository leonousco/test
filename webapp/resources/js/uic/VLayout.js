
(function () {
    'use strict';

	Uic.VLayout = Uic.FGLayout.extend({
		buildOptions:function(options){		
			var newOptions = _.extend({
				id:'VLayout',
				items:[
					{
						regionName:'header',
						className:'row-fluid',
					},
					{
						regionName:'contents',
						className:'row-fluid',
					},
					{
						regionName:'footer',
						className:'row-fluid',
					},
				],
			}, options);
			newOptions.regions = this.makeRegions(newOptions);
			return newOptions;
		},
		setHeader:function(view){
			this.setView('header', view);
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
	}); // end of Uic.FGLayout 

})();
