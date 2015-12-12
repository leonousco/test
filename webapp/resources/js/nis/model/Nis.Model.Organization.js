
(function () {
	'use strict';

	Nis.Model.NHPServer = "nmpi";

	Nis.Model.Organization = Nis.Model.extend({
	    defaults: {
	        id: null,
	        oid: "",
	        locationCode: "",
	        classCode: "",
	        serialNumber: "",
	        email: "",
	        state: "",
	        phoneNumber: "",
	        address: "",
	        name: "",
	        language: "",
	        mrDeliveryEmail: "",
	        electronicServiceUri: "",
	        link: "",

	        requestStatus: Nis.Code.ReqStatus.request,
	        requestType: Nis.Code.RequestType.create,

	    },
		initialize: function (options) {
			//console.log("initialize: OrgRequest " + options);
			this.validators = {};
            var newOptions = _.extend({
                entityName:Nis.Model.Organization.entityName,
                serverName:Nis.Model.NHPServer,
            }, options);
            return Nis.Model.prototype.initialize.call(this, newOptions);
		},
		toJSON: function(options) {
			return _.clone(this.attributes);
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
	}); // end of

    //Nis.Model.Organization.serverName = "nhp";
    Nis.Model.Organization.entityName = "Organization";


	// ---------------
	Nis.Model.OrganizationList = Nis.Collection.extend({
		model: Nis.Model.Organization,
		url: function() {
			if(this.reqStatusType) {
				var ret = 'http://192.168.0.169:8080/nhp_server/api/v1' + '/' + 'OrgRequest' + "/query?requestType="+this.reqStatusType;
				ret += "&requestStatus=";
				ret += "REQUEST";
				return ret;
			}
			return  'http://192.168.0.169:8080/nhp_server/api/v1' + '/' + 'OrgRequest' + "/list";
		},
	    initialize: function(options){
	        //console.log("initialized", this.url);
            var newOptions = _.extend({
                entityName:Nis.Model.Organization.entityName,
                serverName:Nis.Model.NHPServer,
            }, options);
            this.setItemUtil(Nis.Model.OrganizationColumns);
            return Nis.Model.prototype.initialize.call(this, newOptions);
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
		parse: function (response) {
			console.log("Inside Parse");
			var values = response.body;
			if(values) {
				for (var i = 0, length = values.length; i < length; i++) {
					var currentValues = values[i];
					this.push(currentValues);
				}
			}
			console.log(this.toJSON());
			return this.models;
		},
		findByName:function (key) {
			var url = entityUrl.url() + "/query?displayName="+key;
			console.log('findByName: ' + url);
			console.log('findByName: ' + key);
			var self = this;
		    $.ajax({
		        url:url,
		        dataType:"json",
		        success:function (data) {
		            console.log("search success: " + data.body.length);
		            self.reset(data.body);
		        }
		    });
		},
	    getByOid: function (options) {
	    		var queryOptions = {
	    			queryParam: {
	    				oid:options.oid,
	    			},
				success:options.success,
				error:options.error,
	    		};
	    		this.query(queryOptions);
	    		//http://192.168.0.169:8080/nmpi_server/api/v1/token/ea8c02b4-692d-49f4-adb0-107f5a657f70/Organization/query?oid=2.16.410.123456.1.22451123
	    },

	}); // end of Nis.Model.OrganizationList

	Nis.Model.OrganizationColumns = [
                {
                    label:"일련번호",
                    dbid:"id",
                },
                {
                    label:"OID",
                    dbid:"oid",
                },
                {
                    label:"의료기관명",
                    dbid: "name",
                    placeholder:"의료기관 이름",
                    required:true,
                },
                {
                    label:"메일주소",
                    dbid: "email",
                    type:"email",
                    required:true,
                },
                {
                    label:"국가",
                    dbid: "state",
                },
                {
                    labelTitle:"전화번호",
                    dbid: "phoneNumber",
                    type:"tel",
                    minlength:6,
                    required:true,
                },
                {
                    label:"주소",
                    dbid:"address",
                },
                {
                    labelTitle:"언어",
                    dbid: "language",
                },
                {
                    labelTitle:"지역구분",
                    dbid: "locationCode",
                    type: 'select',
                    conceptId:'HospitalArea',
                    controlLabel:'지역 선택',
                },
                {
                    labelTitle:"요양기관종별구분",
                    dbid: "classCode",
                    type: 'select',
                    conceptId:'HospitalType',
                    controlLabel:'요양기관종별구분 선택',                    
                },
                {
                    labelTitle:"요양기관 등록번호",
                    dbid: "serialNumber",
                     placeholder:"요양기관 등록번호",
                    required:true,
                },
                {
                    labelTitle:"electronic service uri",
                    dbid: "electronicServiceUri",
                },
	]; // end of Nis.Model.OrganizationColumns


})();
