(function () {
	'use strict';

	var filterChannel = Backbone.Radio.channel('filter');

	NisMVC.Router = Backbone.Marionette.AppRouter.extend({
		appRoutes: {
	    	"": "home",
	        "entitys": "entityList",
	        "entity/add": "entityAdd",
	        "entitys/page/:page": "entityList",
	        "entity/:id": "entityDetails",
		}
	});

	NisMVC.Controller = Backbone.Marionette.Object.extend({
		start: function () {		
			NisMVC.App.buttonStore().addButton(Nis.UiInfo.Concept.allButtons);						
			this.showHeader();
			this.showFooter();
			this.home();			
		},
		showHeader: function () {
			console.log("showHeader:");
			var uiInfo = (new Nis.UiInfo.AppHeader()).getInfo().HeaderView;
			this.headerView = new NisMVC.HeaderView(uiInfo);			
			NisMVC.App.root.showChildView('header', this.headerView);
		},
		showFooter: function () {
			var footer = new View.Footer();
			NisMVC.App.root.showChildView('footer', footer);
		},
		showContent: function (view) {
			//NisMVC.App.root.showChildView('main', view);
		},		
		home: function () {	    
			console.log("home:");
			var view = new Nis.View.ConceptSetLayout();
			NisMVC.App.root.showChildView('contents', view);
		},	    
	    entityList: function(page) {
			console.log("entityList:");
			
			var model = this;
			//$('#loadingimage').show();
			var p = page ? parseInt(page, 10) : 1;
			var entityList = new NisMVC.EntityList();
			console.log("accountsList: before fetch ");
			var router = this;
			entityList.fetch({success: function(){
				console.log("accountsList: fetch success");
				var view = new NisMVC.ListView({model: entityList, page: p, title: model.list_view_title}, entityList);
				$("#content").html(view.el);
				view.render();
				router.showContent(view);
				//$('#loadingimage').hide();
			}});			
		    this.headerView.select('accounts-menu');    
	           
	    },
	    
	    entityDetails: function (id) {
	    	console.log("entityDetails:");	    	
	        var entity = new NisMVC.Entity({id: id});
	        var router = this;
	        entity.fetch({success: function(){
	        	var view = new NisMVC.EntityDetailsView({model: entity});
	            $("#content").html(view.el);
	            $('#lastUpdate').text(convertDate(entity.get('modifyDate')));        
	            router.showContent(view);
	        }});	        
	    },
	    
	    entityAdd: function() {
	    	console.log("entityAdd:");	    	
	        var entity = new NisMVC.Entity();
	        var view = new NisMVC.EntityDetailsView({model: entity});
	        var router = this;
	        $('#content').html(view.el);
	        //$('#deleteAccountButton').prop('disabled', true);
	        $('#deleteAccountButton').hide();
	        router.showContent(view);
	        
	        this.headerView.select('add-menu');	        
		},
	});

})();
