/*global NisMVC:true, Backbone */
(function () {
	'use strict';

	//var footerTemplate = _.template('<div id="form-footer" class="form-group"> </div>')();

	Uic.UserForm = Uic.CCMBaseForm.extend({
		model:null,
		param:null,
		url : "http://localhost:8080/admin_server/nmpi/v1/admin/user",
		itemView: Uic.InputFormGroup,	
		initialize: function (param) {
			this.param = param;
            	Uic.CCMBaseForm.prototype.initialize.call(this, param);
		},
		setModel:function(model) {
			console.log("setModel: ", model);
			this.model = model;
			this.setModelAttrs(model);
			model.on('sync', this.onSync, this);
		},
		onSync:function(options) {
			console.log("onSync: ", options);
			this.setModelAttrs(options);
		},
		setModelAttrs:function(model) {
			var phoneNumber = model.get('phoneNumber');			
			model.attributes.phoneNumber1 = phoneNumber.split('-')[0];
			model.attributes.phoneNumber2 = phoneNumber.split('-')[1];
			model.attributes.phoneNumber3 = phoneNumber.split('-')[2];
			var eMail = model.get('eMail');
			model.attributes.email1 = eMail.split('@')[0];
			model.attributes.email2 = eMail.split('@')[1];

			// var view = $(this.el).find(this.content.el);
			// view = $(view).find('label');
			// view.each(function(index, el) {
			// 	var attr = $(el).attr('id');
			// 	var value = model.attributes[attr];
			// 	console.log("setModel: ",  index, ": ", attr, ", value:", value);
			// 	if(value) {
			// 		$(el).text(value);
			// 	}
			// });

			var view = $(this.el).find(this.content.el);
			view = $(view).find('input');
			view.each(function(index, el) {
				var attr = $(el).attr('id');
				var value = model.attributes[attr];
				console.log("setModel: ",  index, ": ", attr, ", value:", value);
				if(value) {
					$(el).val(value);
				}
			});
		},
	    change: function (event) {
	    		console.log("change:");
	    		var target = event.target;
	    		var change = {};

	        	change[target.id] = target.value;	        	
	        	if ( target.id == "selectEmail"){
	         		var view = $(this.el).find(this.content.el);
				view = $(view).find('#email2');
				$(view).val(target.value);
				this.model.attributes.email2  = target.value;
			} else if(target.id == "auth"){
				var val = $(target).val();
	    			if(val === '0')
	    				this.model.attributes.roleName="ROLE_CCM_DEVELOPER";
	    			else
		    			this.model.attributes.roleName="ROLE_CCM_PROFESSIONAL";

			}
			else 
				this.model.set(change);
	        	

	    		//var check = this.model.validateItem(target.id);
	    },
	    addressInput:function(){
	    		console.log("input");	    		
	    		var view = $(this.el).find(this.content.el);	    		
	    		var tempModel = this.model;

	    		new daum.Postcode({               
              	oncomplete: function(data) {              		
              		var postcode = $(view).find('#postalCode');
              		//var pc = data.postcode1 + "-" + data.postcode2              		
              		$(postcode).val(data.zonecode);		              		
              		tempModel.attributes.postalCode =data.zonecode;
              		var address = $(view).find('#city');
					$(address).val(data.address);		
					tempModel.attributes.city = data.address;
                }
            }).open();	    		
	    },
	    beforeDelete : function() {
	    		// this.model.url = entityUrl.url()+"/id/"+this.model.attributes.userId;	    		
	    		this.model.url = entityUrl.url4ccm(this.model.attributes.userId, Nis.Model.User.EntityName,this.model.server["serverName"]);
	    		var model = this.model;
	    		var cthis = this; 		 

	    		var modal = new Backbone.BootstrapModal({
					title:'Delete Confirm',
					content:'deleted ...',
				});				
			modal.open(function(args) {
				//console.log("showTestModal: on modal button clicked, args:", args, ", parentView:", this.parentView);					
				console.log("showTestModal: on modal button clicked, args:",model);					
				//view.main();
				model.destroy( {	    						    				
    					success: function (user) {
        					window.location.href="#userReq/"+cthis.options.currentPage;
    					},
				});
	    		
			})
	    		
	    },
	    beforeSave: function () {
	    		console.log("beforeSave:");
	    		var check = this.model.validateAll();

	    		this.clearLabel();
	    		

	    		//check  clear

	    		if (  Object.keys(check).length  ==0){	    			    		  		
	    			this.beforeSend();
	    			// this.model.url = entityUrl.url("","user",this.model.server["serverName"]);
	    			this.model.url = this.model.getEntityUrl("");
	    			var model = this.model;

	    			var modal = new Backbone.BootstrapModal({
						title:'Save Confirm',
						content:'saved ...',
				});				
	    			var cthis = this;
				modal.open(function(args) {
					//console.log("showTestModal: on modal button clicked, args:", args, ", parentView:", this.parentView);					
					console.log("showTestModal: on modal button clicked, args:",model);					
					//view.main();
					model.save(null, {
    						type:'POST',	    					
   						success: function (user) {
	        					window.location.href=cthis.options.currentPage;
    						},
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
	    beforeModify: function () {
	    		console.log("beforeModify:");

	    		var check = this.model.validateAll();
	    		delete check.check;	    		
			// var check;
	    		this.clearLabel();	    		
	    		

	    		if (!check||Object.keys(check).length  ==0){	    			    		
	    			this.model.url = entityUrl.url4ccm("",Nis.Model.User.EntityName,this.model.server["serverName"]);
	    			this.beforeSend();
	    			var model = this.model;	   
	    			var cthis = this; 		 

	    			var modal = new Backbone.BootstrapModal({
						title:'Modify Confirm',
						content:'modified ...',
				});				
				modal.open(function(args) {
					//console.log("showTestModal: on modal button clicked, args:", args, ", parentView:", this.parentView);					
					console.log("showTestModal: on modal button clicked, args:",model);					
					//view.main();
					model.save(null, {
	    					type:'PUT',
	    					silent:true,	    					
    						success: function (user) {
    							console.log("success");
        						window.location.href=cthis.options.currentPage;
    						}    					
					});
	    		
				})
			}
			else{
				for (var key in check){	    			
					var labelName = labelName = "#"+key+"Check";
					var allView = $(this.el).find(this.content.el);	    				
    					
    					if (key =="check")
    						labelName = "#idCheck";
    					if (key =="address")
	    					labelName = "#postalCodeCheck";

    					var labelView = $(allView).find(labelName);
	    				$(labelView).text(check[key]);	    				    				    		
	    			} 	
			}
	    },
	    checkId : function(){
	    		var allView = $(this.el).find(this.content.el);
			var view = $(allView).find('#id');
			var labelView = $(allView).find('#idCheck');			

			if ( $(view).val() == "") {
				console.log("id undefined");
				$(labelView).text("아이디를 입력해주세요");
			}
			else {
	    			this.model.url = entityUrl.url4ccm($(view).val(),"user/check",this.model.server["serverName"]);
		    		var model = this.model;

		    		$.ajax({
				     url:this.model.url,
				     dataType:"json",
		    			   success:function (response) {
		         			   //console.log("fetch success: " + response.data + ", options:" + options);
		            	   	var values = response.body;		            	   
		            	   	model.attributes.check = values == 0 ? true : false;
		            	   	if (model.attributes.check)
		            	   		$(labelView).text("사용이가능한 아이디입니다");
		            	   	else
		            	   		$(labelView).text("사용이 불가능한 아이디입니다");


		        		}	    	
		    		});
		    	}	    		

	    },
	    onCancel: function() {
	    		console.log("onCancel - UserForm: ");
	    		// window.location.href="#manager";
	    		window.location.href=this.options.currentPage; 		 
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
	    list:function(options){
	    		console.log("click go to list btn");
	    		window.location.href=this.options.currentPage; 
	    },
	    addManager:function(options){
               this.model.server={
               		serverName:"admin"
               };
	    		var val = $("#enable").val();
	    		this.model.attributes.enable = val;
	    		this.model.attributes.roleName = "ROLE_CCM_MANAGER";
	    		this.beforeSave();
	    },
	    modifyManager:function(options){
               this.model.server={
               	serverName:"admin"
               };
	    		var val = $("#enable").val();
	    		this.model.attributes.enable = val;
	    		this.model.attributes.requestStatus = Nis.Code.ReqStatus.confirmed;
	    		this.model.attributes.requestType = Nis.Code.RequestType.modify;
	    		this.model.attributes.roleName = "ROLE_CCM_MANAGER";
	    		this.beforeModify();
	    },
	    deleteManager:function(options){
               console.log("delete btn clicked");
               this.model.server={
               		serverName:"admin"
               };
               this.beforeDelete();
               // var model = this.model; 
               // model.serverName="admin";
               // model.destroy({success:function(){
               // 		console.log("destroy");
               // 		window.href="#manager";
               // }});
	    },
	    approvalUser:function(options){
	    		console.log("click approvalUser btn");
	    		this.model.attributes.requestStatus = Nis.Code.ReqStatus.confirmed;
	    		this.model.attributes.requestType = Nis.Code.RequestType.create;
	    		this.model.attributes.roleName = "ROLE_CCM_DEVELOPER";
	    		this.beforeModify();
	    },
	    rejectUser:function(options){
	    		console.log("click rejectUser btn");
	    		this.model.attributes.requestStatus = Nis.Code.ReqStatus.reject;
	    		this.model.attributes.requestType = Nis.Code.RequestType.create;
	    		this.model.attributes.roleName = "ROLE_CCM_DEVELOPER";
	    		this.beforeModify();
	    },
	    saveUser:function(options){
	    		var val = $("#auth").val();
	    		if(val === '0')
	    			this.model.attributes.roleName="ROLE_CCM_DEVELOPER";
	    		else
	    			this.model.attributes.roleName="ROLE_CCM_PROFESSIONAL";
	    		this.model.attributes.requestStatus = Nis.Code.ReqStatus.confirmed;
	    		this.model.attributes.requestType = Nis.Code.RequestType.create;
	    		this.beforeSave();
	    },
	    modifyUser:function(options){
               console.log("modify user clicked");
	    		this.model.attributes.requestStatus = Nis.Code.ReqStatus.confirmed;
	    		this.model.attributes.requestType = Nis.Code.RequestType.modify;
	    		this.model.attributes.enable="1";
	    		this.model.attributes.countryCode = "KO";
               this.model.server={
               		serverName:"admin"
               };
	    		var val = $("#auth").val();
	    		if(val === '0')
	    			this.model.attributes.roleName="ROLE_CCM_DEVELOPER";
	    		else
	    			this.model.attributes.roleName="ROLE_CCM_PROFESSIONAL";
	    		this.beforeModify();
	    },
	    deleteUser:function(options){
               this.model.server={
               		serverName:"admin"
               };
               this.beforeDelete();
               // var model = this.model; 
               // model.serverName="admin";
               // model.destroy({success:function(){
               // 	console.log("destroy");
               // 	window.href="#userInfo";
               // }});
	    },
	    dropUser:function(options){
               this.model.server={
               		serverName:"admin"
               };
               this.beforeDelete();
               // var model = this.model; 
               // model.serverName="admin";
               // model.destroy({success:function(){
               // 		console.log("destroy");
               // 		window.href="#userInfo";
               // }});
	    },
	});
})();

