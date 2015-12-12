/*global NisMVC:true, Backbone */

var Uic = Uic || {};

(function () {
	'use strict';

	//var footerTemplate = _.template('<div id="form-footer" class="form-group"> </div>')();

	Uic.CCMVersionForm = Uic.CCMBaseForm.extend({
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
			}
			else 
				this.model.set(change);
	    },   
	    list:function(options){
	    		console.log("click go to list btn");
			// javascript:Backbone.history.history.back();
	    		window.location.href=this.options.currentPage; 
	    },
	    onSuccessVersionRegister:function(resp){
	    		console.log('onSuccessVersionRegister:', resp);
	    		window.location.href="#ccm";
	    },
	    onErrorVersionRegister:function(resp){
	    		console.log('onErrorVersionRegister:', resp);
	    },
	    ccmVersionRegister:function(options){
	    		var options = {
	    			success:this.onSuccessVersionRegister.bind(this),
	    			error:this.onErrorVersionRegister.bind(this),
	    		}
	    		// this.model.ccmVersionRegister(options);
	    		var model = new Nis.Model.CCMVersionControlModel(options);
	    		model.attributes = this.model.attributes;
	    		model.ccmVersionRegister(options);
	    		
	    		// var cData = JSON.stringify(this.model.attributes);
       //          var cUrl = "http://192.168.0.153:8880/ccm_server/api/v1/token/no-token/ModelIndex/approval/reqId/"+3;
       //          // var cUrl = "http://192.168.0.64:8080/ccm_server/api/v1/token/no-token/ModelIndex/approval/reqId/"+1;
       //          $.ajax({
       //          	type:'POST',
       //              url:cUrl,
       //              contentType:"plain/text",
       //              data:cData.toString(),
       //          }).done(function(){
       //              console.log("CCM Model is registered");
       //          });

	    },
        // ccmVersionRegister:function(options){
        //         var cData = JSON.stringify(this.attributes);
        //         var cUrl = "http://192.168.0.153:8880/ccm_server/api/v1/token/no-token/ModelIndex/approval/reqId/"+3;
        //         // var cUrl = "http://192.168.0.64:8080/ccm_server/api/v1/token/no-token/ModelIndex/approval/reqId/"+1;
        //         $.ajax({
        //             type:'POST',
        //             url:cUrl,
        //             contentType:"plain/text",
        //             data:cData.toString(),
        //             success:options.success,
        //             error:options.error,
        //         });
        // },
	});


})();

