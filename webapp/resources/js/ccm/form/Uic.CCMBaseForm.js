(function () {
	'use strict';

	 Uic.CCMBaseForm = Uic.Form.extend({
		model:null,
		param:null,
		url : "http://localhost:8080/admin_server/nmpi/v1/admin/user",
		itemView: Uic.InputFormGroup,	
		initialize: function (param) {
			this.param = param;
            	Uic.Form.prototype.initialize.call(this, param);
		},
	    events: {
	    	"click #merge"	: "beforeMerge",
	        "change"        : "change",
	        "click #check"        : "checkId",
	        "click #addressInput"   : "addressInput",
	        "click #save"   : "beforeSave",
	        "click #delete" : "beforeDelete",
	        "click #cancel"	: "onCancel",
	        "click #search" : "beforeSearch",
	        "click #list" : "list",
	        "click #addManager" : "addManager",
	        "click #modifyManager" : "modifyManager",
	        "click #deleteManager" : "deleteManager",
	        "click #approvalUser" : "approvalUser",
	        "click #rejectUser" : "rejectUser",
	        "click #saveUser" : "saveUser",
	        "click #modifyUser" : "modifyUser",
	        "click #deleteUser" : "deleteUser",
	        "click #dropUser" : "dropUser",
	        "click #ccmVersionRegister" : "ccmVersionRegister",
	    },
	    list:function(){
	    },
	    addManager:function(){
	    },
	    modifyManager:function(){
	    },
	    deleteManager:function(){
	    },
	    approvalUser:function(){
	    },
	    rejectUser:function(){
	    },
	    saveUser:function(){
	    },
	    modifyUser:function(){
	    },
	    deleteUser:function(){
	    },
	    dropUser:function(){
	    },
	    ccmVersionRegister:function(){
	    },
	}); // end of Uic.Form
})();

