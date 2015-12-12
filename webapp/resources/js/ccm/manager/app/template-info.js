window.templateInfo = {
		
	basePath: "resources/tpl/",
	defaultPath: "nis/",
	appPath: "nhp/",
	
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
	make: function(dPath, view) {
		return {
			"path":this.basePath + dPath,
			"name":view};   
	},
};

/*
window.nhpUrl = {		
		serverName: "nhp",
		
		urlRoot: function() {
			console.log("urlRoot:" + NisMVC.evnMaganger.getServerApiUrl(this.serverName));
			return NisMVC.evnMaganger.getServerApiUrl(this.serverName);
		},
};

window.entityUrl = {
		entityName: "Concept",
		
		urlRoot: function() {
			console.log("urlRoot:" + nhpUrl.urlRoot());
			return nhpUrl.urlRoot()+"/"+this.entityName;
		},
		
		url : function(id) {
			console.log("url:" + this.urlRoot());
			var ret = id ? this.urlRoot()+'/id/' + id : this.urlRoot();
			console.log("url:ret:" + ret);
		    return ret; 
		  },	
};
*/
