/*global NisMVC:true, Backbone */

var Uic = Uic || {};

(function () {
	'use strict';

	//var footerTemplate = _.template('<div id="form-footer" class="form-group"> </div>')();

	Uic.LoginUserForm = Uic.UserForm.extend({
		model:null,
		param:null,
		url : "http://localhost:8080/admin_server/nmpi/v1/admin/user",
		itemView: Uic.InputFormGroup,	
         initialize: function (options) {
            console.log("initialize: options:", options);
            // Nis.Model.prototype.initialize.call(this, newOptions);
            Uic.UserForm.prototype.initialize.call(this, options);
         },
	    beforeSave: function () {
	    		console.log("beforeSave:");
	    		var check = this.model.validateAll();
	    		   			    		
	    		this.clearLabel();
	    		

	    		//check  clear

	    		if (  Object.keys(check).length  ==0){	    			    		  		
	    			this.beforeSend();	    			
	    			this.model.url = entityUrl.url("","user",this.model.server["serverName"]);
	    			var model = this.model;

	    			var modal = new Backbone.BootstrapModal({
						title:'Save Confirm',
						content:'saved ...',
				});				
				modal.open(function(args) {
					//console.log("showTestModal: on modal button clicked, args:", args, ", parentView:", this.parentView);					
					console.log("showTestModal: on modal button clicked, args:",model);					
					//view.main();
					model.save(null, {
    						type:'POST',	    					
   						success: function (user) {
	        					window.location.href="#login";
    						},
    						error:function(xhr, status, error) {
                    			if (xhr.status == 401)
                        			location.href="#login";
                        	}
					});
	    		
				})
			}else{
				for (var key in check){
					var allView = $(this.el).find(this.content.el);	    			
					var labelName = labelName = "#"+key+"Check";
	    				var labelView = "";
    					
    					if (key =="check")
    						labelName = "#idCheck";
    					if (key =="address")
	    					labelName = "#postalCodeCheck";

    					var labelView = $(allView).find(labelName);
	    				$(labelView).text(check[key]);	    				    				    		
	    			} 	
			}

	    },
	    onCancel: function() {
	    		console.log("onCancel: ");
	    		window.location.href="#login";
	    },
	    showSaveConfirm: function(thisView) {
	    		this.parentView.trigger("closeView", this.parentView);
	    },
	    beforeSend:function(){
	    		this.model.unset("phoneNumber1",{silent:true});
	    	    	this.model.unset("phoneNumber2",{silent:true});
	    		this.model.unset("phoneNumber3",{silent:true});
	    		this.model.unset("email1",{silent:true});
	    		this.model.unset("email2",{silent:true});
	    		this.model.unset("check",{silent:true});
	    },	    

	});


})();

