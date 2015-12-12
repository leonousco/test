window.templateInfo = {
		
	basePath: "resources/tpl/",
	defaultPath: "nis/",
	appPath: "vs/",
	
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

