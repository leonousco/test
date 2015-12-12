

(function () {
	'use strict';


	Nis.Model.OIDBase = Nis.Model.extend({
	    defaults: {
	       id: null,
	        identifier: "",
	        arc: "",
	        parentIdentifier: "",
	        requestStatus: Nis.Code.ReqStatus.request,
	        requestType: Nis.Code.RequestType.create,
	        description: "",
	        information: "",
	        orgName: "",
	        orgAddress: "",
	        country: "",
	        orgEmail: "",
	        orgPhone: "",
	        orgFax: "",
	        orgOid: "",
	        authorName: "",
	        authorEmail: "",
	        authorUserid: "",
	        dateCreated: "",
		   dateVoided: "",       
		   dateModified: "",
		   userCreated: "",
		   userVoided: "",
	        link: "",
	    },
		initialize: function (options) {
			var v = Nis.Code.ReqStatus;
			//console.log("initialize: OrgRequest " + options);
			//map key/value for validation
			this.validators = {};
			var newOptions = _.extend({
			    serverName:Nis.Model.OIDBase.Server,
			}, options);
			return Nis.Model.prototype.initialize.call(this, newOptions);
		},
		validateItem: function (key) {
		    return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
		},
		fetch:function(options) {
			console.log("fetch: url():", this.url());
			var model = this;
		    $.ajax({
		        url:this.url(),
		        dataType:"json",
		        success:function (response) {
		            console.log("fetch success: " + response.body + ", options:" + options);
		            var values = response.body;
		            model.parse(response);
		            return Backbone.Model.prototype.fetch.call(model, options) ;
		        }
		    });
		},
		validateAll: function () {
	        var messages = {};

	        for (var key in this.validators) {
	            if(this.validators.hasOwnProperty(key)) {
	                var check = this.validators[key](this.get(key));
	                if (check.isValid === false) {
	                    messages[key] = check.message;
	                }
	            }
	        }

	        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
	    },	    
	}); //end of Nis.Model.OrgRequest


	//Nis.Model.OIDBase.Server = "oid";
	Nis.Model.OIDBase.Server = "nmpi";

	Nis.Collection.OIDBase = Nis.Collection.extend({
		model: Nis.Model.OIDBase,
		initialize: function(options){
		    //console.log("initialize:");
			var newOptions = _.extend({
				serverName:Nis.Model.OIDBase.Server,
			}, options);
			this.setItemUtil(Nis.Model.OIDBase.columns);
		    return Nis.Collection.prototype.initialize.call(this, newOptions);
		},
	    fetch:function(options) {
			console.log("fetch:", this.url());
			var collection = this;
			$.ajax({
			    url:collection.url(),
			    dataType:"json",
			    success:function (response) {
			        console.log("fetch success: " + response.body + ", options:" + options);
			        var values = response.body;
			        collection.parse(response);
			        return Backbone.Collection.prototype.fetch.call(collection, options) ;
			    }
			});
	    },
	});  // end of Nis.Collection.OIDBase

    Nis.Model.OIDBase.columns = [
        {
            dbid: "id", 
            label: "일련번호", 
        },
        {
            label:"OID",
            dbid: "identifier",
            required:true,
        },
        {
            label:"ARC",
            dbid: "arc",
            required:true,
            minlength:1,
            maxlength:10,
            type:'number',
        },
        {
            label:"Parent OID",
            dbid: "parentIdentifier",
            required:true,
            minlength:3,
        },
        {
            label:"요청형태",
            dbid: "requestType",
            type: 'select',
            conceptId:'RequestType'
        },
        {
            label:"승인상태",
            dbid: "requestStatus",
          	  type: 'select',
            conceptId:'RequestType',
        },                
        {
            label:"OID 설명",
            dbid: "description",
        },
        {
            label:"하위OID 등록방법",
            dbid: "information",
        },     
        {
            label:"생성기관이름",
            dbid: "orgName",
            required:true,
            minlength:2,
        }, 
        {
            label:"생성기관주소",
            dbid: "orgAddress",
        },
        /*
        {
            label:"국가",
            dbid: "country",
        },
		*/
        {
            label:"생성기관e-mail",
            dbid: "orgEmail",
        },
        {
            label:"생성기관전화번호",
            dbid: "orgPhone",            
            type:"tel",    
        },
        {
            label:"생성기관팩스번호",
            dbid: "orgFax",            
        },
        {        
            label:"요청자 이름",                
            dbid: "authorName",
        },
        {
            label:"요청자 email",            
            dbid: "authorEmail",                    
        },
        {                    
            label:"요청자의 사용자 아이디",                  
            dbid: "authorUserid",                    
        },
        {                    
            label:"변경,또는 거절 이유",                 
            dbid: "memo",                
        },
        {                    
            label:"승인자의 사용자 아이디",                 
            dbid: "userReviewer",                    
        },
    ];


})();
