/*global NisMVC:true, Backbone */

var Uic = Uic || {};

(function () {
	'use strict';

	//var footerTemplate = _.template('<div id="form-footer" class="form-group"> </div>')();

	Uic.LoginForm = Uic.Form.extend({
		model:null,
		param:null,
		itemView: Uic.InputFormGroup,
		events: {
	        "change"        : "change",
	        "click #login"        : "beforelogin",
	        "click #cancel"       : "cancel",
	        "click #userJoin"   : "userJoin",
	        "keydown"	: "enterKeyPressed",
	    },	
	    change: function (event) {
	    		console.log("change:");
	    		var target = event.target;
	    		var change = {};

	        	change[target.id] = target.value;
	        	this.model.set(change);

	    		//var check = this.model.validateItem(target.id);
	    },
	    	beforelogin : function() {	    		
	    		this.model.url = this.loginUrl(null, "login/apikey", "authentication_server", null);//"http://192.168.0.54:8080/test/login/apikey";	    		

	    		var model = this.model;	    		
	    		var cthis = this;
	    		var modal = new Backbone.BootstrapModal({
					title:'Login Confirm',
					content:'Login ...',
				});				
			modal.open(function(args) {				
				console.log("showTestModal: on modal button clicked, args:",model);	
			localStorage.setItem("id", model.id);		
				
				$.ajax({
        				url :  model.url,
        				type : "POST",
        				data : JSON.stringify( model.attributes ),
        				contentType:"application/json",        
        				success : function(response) {
            				console.log("apikey get success");
            				cthis.getToken(response.body,model.get("username"), model.get("password"));
        				},	
        				error : function(e) {
            				alert('서버 연결 도중 에러가 났습니다. 다시 시도해 주십시오.');
        				}
    				});
	    		
			})	
	    },
	    getToken : function(response , username , password){
	    		var data = response.split("^");
	    		var sendData = {
        			grant_type :"password",
        			client_id : data[0],
        			client_secret : data[1],
        			username : username,
        			password : password

    			}
    			var cthis = this;
    			$.ajax({
        			url : this.loginUrl(null, "oauth/token", "authentication_server"), //"http://192.168.0.54:8080/test/oauth/token",
        			type : "POST",
        			data : sendData,
        			//dataType: "json",
        			success : function(data) {
            			// data는 서버로부터 전송받은 결과(JSON)이므로 바로 사용한다\
            			var token = data.value;
            			//alert(token);
            			localStorage.removeItem("token");
            			localStorage.setItem("token", token);
            			console.log(localStorage.getItem("token"));
            			// location.href="CcmManager.html";
            			cthis.getRole(token);

        			},
        			error : function(e) {
            			alert('서버 연결 도중 에러가 났습니다. 다시 시도해 주십시오.');
        			}
    			});

	    },
	    getRole : function(token){
	    		$.ajax({
        			//url : "http://localhost:8080/test/oauth/token",
        			url : entityUrl.url(null,"token/","authentication_server")+token,
        			type : "GET",        			
        			//dataType: "json",
        			success : function(data) {
            			// data는 서버로부터 전송받은 결과(JSON)이므로 바로 사용한다\
            			var body = data.body;
            			// role save
            			console.log("roleName : " + body.roleName);
            			localStorage.removeItem("roleName");
            			localStorage.setItem("roleName", body.roleName) ;                      
                      if (body.roleName == Nis.Code.PermissionRole.ccmAdmin || 
                        body.roleName==Nis.Code.PermissionRole.ccmManager)
            			     location.href="CcmManager.html";
                      else {
                           alert('로그인 권한이 없습니다 .');  
                      }


        			},
        			error : function(e) {
            			alert('서버 연결 도중 에러가 났습니다. 다시 시도해 주십시오.');
        			}
    			});
	    },
	    userJoin: function () {
	    		// Authority save non Used
	    		console.log("join");
	    		window.location.href="#joinUser";
	    },	   

	    onCancel: function() {
	    		console.log("onCancel");
	    		window.location.href="#apiKeyReq/"+this.options.currentPage; 		 ;
	    },
	    enterKeyPressed: function(event){
	    		var keyCode = event.keyCode || event.which;
	    		if(keyCode == 13 && event.target.id=='password'){
	    			console.log("enterKeyPressed");
	    			this.beforelogin();
	    		}
	    },

	  loginUrl:function(id, entityName, serverName){
		var ret = id ? entityUrl.urlRoot(entityName, serverName, undefined)
			+'/id/' + id : entityUrl.urlRoot(entityName, serverName, undefined);
		console.log("url:ret:" + ret);
	    return ret; 
	  },
	});


})();

