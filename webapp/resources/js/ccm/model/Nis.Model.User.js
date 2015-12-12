
/*global Backbone, NisMVC:true */

var Nis = Nis || {};

(function () {
	'use strict';

	// Todo Model
	// ----------
	Nis.Model.User = Nis.Model.extend({
	    defaults: {
	    		userId:"",
	    	    no :"",	    	    
	        id: "",
	        userName:"",
	        passWord:"",
	        oid:"",	       	        
	        countryCode:"KO",
	        phoneNumber: "",
	        phoneNumber1: "010",
	        phoneNumber2: "",
	        phoneNumber3: "",
	        eMail: "",
	        email1: "",
	        email2: "",
	        enable: "1",
	        city: "",
	        province: ""	,
	        address: "",
	        postalCode:"",
	        createDate:"",
	        modifyDate:"",
	        requestType:"",
	        requestStatus:"",
	        roleName:"ROLE_CCM_USER"	        

	    },	 
		url : function() {
			var link = this.attributes.link;
			console.log("url(): link:", link);
			if(link) {
				return link;						
			}			
			return entityUrl.url(this.id,"user",this.server.serverName);
			//return "http://localhost:8080/admin_server/nmpi/v1/admin/user";
		  },	
		
		initialize: function (options, server, attr) {
	        //map key/value for validation 
			this.validators = {
								check:"중복체크를 해주세요"
								,id:"아이디를 입력해주세요"
								,userName:"이름을 입력해주세요"
								,passWord:"비밀번호를 입력해주세요"
								,phoneNumber:"핸드폰번호를 입력해주세요"
								,eMail:"Email을 입력해주세요"
								,postalCode:"주소를 입력해주세요"
								,city:""
								,address:"상세주소를 입력해주세요"
								};
			this.server = server;
			if(attr){
				this.attributes = attr;
				this.id = attr.userId;
			}
			var newOptions = _.extend({
			    entityName:Nis.Model.CCMModel.EntityName,
			    serverName:Nis.Model.CCMModel.Server,
			}, options);
			return Nis.Model.prototype.initialize.call(this, newOptions);
	        //this.validators.displayName = function (value) {
	        //    return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter an displayName"};	            
	        //};
	    }, 
	    
	    validateItem: function (key) {
	        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
	    },
	    
	    fetch:function(options,id) {	    		
	    		console.log("fetch: url():", entityUrl.url(id,"user",this.server["serverName"]));
	    		var model = this;
			    $.ajax({
			        url: entityUrl.url(id,"user",this.server["serverName"]),
			        dataType:"json",
		    		   success:function (response) {
		         		   console.log("fetch success: " + response.body );
		            	   var value = response.body;			            	   
		            	   model.set(value);
		            	   
		            	   return Backbone.Model.prototype.fetch.call(model,options) ;
		        }	    	
		    });
	    },
	    parseModel:function(response){
	    		console.log("Inside Parse");
			var value = response;
			
			if(response.body)
				value = response.body;					

			this.set(value);			
			console.log(this.toJSON());
			
			return this;
	    },
		parse: function (response) {			
			console.log("Inside Parse");
			var value = response;
			
			if(response.body)
				value = response.body;					

			//this.set(value);			
			console.log(this.toJSON());
			
			return value;
		},    		
		
		validateAll: function () {
		    console.log("validation All");
	        var messages = {};	        
	        var check ;
	        var num_check=/^[0-9]*$/;
	        this.attributes.phoneNumber = "";
	        this.attributes.eMail = "";

	        if(this.get("phoneNumber2") != "" && this.get("phoneNumber3") !="" ){
	        		if ( num_check.test(this.get("phoneNumber2")) && num_check.test(this.get("phoneNumber3")) ){
	        			console.log("regex");
	        			this.attributes.phoneNumber = this.attributes.phoneNumber1 +"-" +this.attributes.phoneNumber2+ "-"+ this.attributes.phoneNumber3;
	       		}
	       	}
	        	        
	        // 주소와 이메일 전화번호 병합 추가
	        // other model remove 	        
	         if(this.attributes.email1 != "" &&this.attributes.email2 != "" )
	        		this.attributes.eMail = this.attributes.email1+ "@" +this.attributes.email2;
	         

	        for (var key in this.validators) {
	            if(this.validators.hasOwnProperty(key)) {
	                //var check = this.validators[key](this.get(key));
	                  if (key =="check" )	                
	                  	check = ( this.get(key) != null ) ?{isValid : this.get(key) } : {isValid: false};	                	                	               
	                  else 
	                		check = this.get(key).length > 0 ? {isValid: true} : {isValid: false};	            

	                  if (check.isValid === false) {
	                  	messages[key] = this.validators[key];
	                	}
	            }
	        }	        	        	        	        
	        //return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
	        return messages;
	    },
	});

	Nis.Model.User.Server = "admin";
	Nis.Model.User.EntityName = "ccm/user";
})();

