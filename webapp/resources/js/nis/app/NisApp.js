
NisMVC.appInterface = {
	loadInitialData:function(options) {
		//console.log("loadInitialData:");
		var deferred = $.Deferred();

		this.loadTemplate().done(function() {
			//console.log("loadInitialData: loadTemplate().done");
			NisMVC.evnMaganger.loadEnv().done(function() {
				//console.log("loadInitialData: loadEnv().done");
				deferred.resolve("loaded inital data");
			}).fail(function() {
				deferred.reject("fail to load env");
			});			
		});
		return deferred.promise();
	},
	loadTemplate:function() {
		//console.log("loadTemplate:");		
		var deferred = $.Deferred();

		var data = NisMVC.templateInfo.load();	

		if(NisMVC.evnMaganger.isNormalRunMode()) {
			NisMVC.templateManager.load(data, function() {
				deferred.resolve();
			});			
		}
		else {
			deferred.resolve();
		}
		return deferred.promise();		
	},
};

NisMVC.templateInfo = {
		
	basePath: "resources/tpl/",
	defaultPath: "nis/",
	appPath: "vs/",

	//var deferred = $.Deferred();
	
	load: function() {
		return [
	       this.make(this.appPath, "HeaderView"), 
	       this.make(this.appPath, "HomeView"),
	       this.make(this.defaultPath, "FooterView"),
	       this.make(this.appPath, "ListView"),
	       this.make(this.appPath, "ListItemView"),
	       this.make(this.appPath, "DetailsView"),
	       this.make(this.defaultPath, "SearchResultItemView"),
       ];
	},
	make: function(dPath, templateId) {
		return {
			"path":this.basePath + dPath,
			"templateId":templateId};   
	},
};

