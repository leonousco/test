window.Router = Backbone.Router.extend({

    routes: {
    	"": "home",
        "accounts": "accountsList",
        "account/add": "addAccount",
        "accounts/page/:page": "accountsList",
        "account/:id": "accountDetails",
    },
    
    headerLabels: {
    	"title":"공통코드 관리",
    	"list_menu":"코드 목록",
    	"add_menu":"코드 추가",
    },
    
    list_view_title:"코 목록",

    initialize: function () {
        this.headerView = new HeaderView();
    	$('.header').html(this.headerView.render(this.headerLabels).el);
    	this.footerView = new FooterView();		
    	$('.footer').html(this.footerView.render().el);
    	
        // Close the search dropdown on click anywhere in the UI
        $('body').click(function () {        	
        	$('.dropdown').removeClass("open");
        });
    },

    home: function () {
        //Since the home view never changes, we instantiate it and render it only once    	
        if (!this.homeView) {        	        	
            this.homeView = new HomeView();        	
            this.homeView.render();
        } else {
            this.homeView.delegateEvents(); // delegate events when the view is recycled
        }                
        $("#content").html(this.homeView.el);
        this.headerView.select('home-menu');                                
    },
    
    accountsList: function(page) {
    	//$('#loadingModal').modal('show');
    	var model = this;
    	$('#loadingimage').show();
    	var p = page ? parseInt(page, 10) : 1;
        var accountsList = new AccountsCollection();
        console.log("accountsList: before fetch ");
        accountsList.fetch({success: function(){
        	console.log("accountsList: fetch success");
            $("#content").html(new ListView({model: accountsList, page: p, title: model.list_view_title}).el);
            //$('#loadingModal').modal('hide');
            $('#loadingimage').hide();
        }});
        this.headerView.select('accounts-menu');        
    },
    
    accountDetails: function (id) {
        var account = new Account({id: id});
        account.fetch({success: function(){        	
            $("#content").html(new DetailsView({model: account}).el);
            $('#lastUpdate').text(convertDate(account.get('modifyDate')));            
        }});
        
        //this.headerView.selectMenuItem();
    },
    
    addAccount: function() {
        var account = new Account();
        $('#content').html(new DetailsView({model: account}).el);
        //$('#deleteAccountButton').prop('disabled', true);
        $('#deleteAccountButton').hide();  
        this.headerView.select('add-menu');
	},
    
});

var startClient = function (envInfo) {
	//var obj = eval(envInfo);
	//var obj = eval("("+envInfo+")");
	var obj = JSON.parse(envInfo);
	utils.envInfos=obj;
	console.log("startClient: envInf:"+obj.serverInfos);
	console.log("startClient: envInf:"+utils.envInfos["serverInfos"]);
	templateLoader.load(templateInfo.load(),
			function () {
				app = new Router();
				Backbone.history.start();
			});	
}

launcher.run();
