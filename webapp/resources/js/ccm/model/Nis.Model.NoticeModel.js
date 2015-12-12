
(function () {
	'use strict';


	Nis.Model.NoticeModel = Nis.Model.extend({
		defaults: {
		    // id: null,
		    // conceptId:null,
		    // displayName:null,
		    // description:null,
		    // code:null,
		    // link: "",
            id: null,
            dateCreated: null,
            dateVoided: null,
            dateModified: null,
            userCreated: null,
            userVoided: null,
            link: null,
            title: null,
            contents: null,
            createdDate: null,
		},
		initialize: function (options) {
			this.validators = {};
			var newOptions = _.extend({
			    entityName:Nis.Model.NoticeModel.EntityName,
			    serverName:Nis.Model.NoticeModel.Server,
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
		parse: function (response, options) {
			console.log("parse: Inside Parse ", response.statusCode);
			var value = response;
			if(response.statusCode != Nis.Code.ResponseOk) {
				return null;
			}
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
	}); //end of Nis.Model.Concept

	Nis.Model.NoticeModel.Server = "ccm";
	Nis.Model.NoticeModel.EntityName = "CCMNotice";

	Nis.Model.CCMNoticeModelList = Nis.Collection.extend({
		model: Nis.Model.NoticeModel,
		initialize: function(options){
		    console.log("initialize: OrgRequestList");
			var newOptions = _.extend({
				entityName:Nis.Model.NoticeModel.EntityName,
				serverName:Nis.Model.NoticeModel.Server,
			}, options);
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
       	getEntityUrl:function(id) {
          		var url = 'http://192.168.0.153:8880/ccm_server/api/v1/token/no-token/CCMNotice';
            	return url;
        	},
        	deleteNotice:function(options, checkBoxId){
                var cUrl = "http://192.168.0.153:8880/ccm_server/api/v1/token/no-token/remove/CCMNotice/"+checkBoxId;
                $.ajax({
                    url:cUrl,
                    type:'GET',
                    success:options.success,
                });
        	},
	}); // end of Nis.Model.ConceptList


     Nis.Model.NoticeModel.mainPageColumns = [
     		{
                label: '<input modelid="{{id}}" type="checkbox" name="board_checkbox" value="checked"/>',
          		 cell: "checkbox",
          },
          {
                dbid: "id",
                label: "번호",
          },
          {
                dbid: "title",
                label: "제목",
          },        
          {
                dbid: "contents",
                label: "내용",
          }, 
          {
                dbid: "userCreated",
                label: "작성자",
          },           
          {
                dbid: "createdDate",
                label: "작성일",
          },            
     ]; // end of columns

     Nis.Model.NoticeModel.noticeButtons = [
            {
                data: {
                    buttonId:"add",
                    buttonClass:"btn btn-default",
                    buttonTitle:"추가",
                },
            },
            {
                data: {
                    buttonId:"delete",
                    buttonClass:"btn btn-default",
                    buttonTitle:"삭제",
                },
            },
     ]; // end of conceptSetButtons
})();
