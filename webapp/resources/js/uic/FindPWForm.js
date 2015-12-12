/*global NisMVC:true, Backbone */

var Uic = Uic || {};

(function () {
	'use strict';


	Uic.FindPwForm = Backbone.View.extend({
		cTemplate:null,
		param: {
			findPwFormId:"",
			inputUser:"",
			inputId:"" ,
			inputType:"" ,
			inputPw:"",
			inputEmail:"",
			inputValue:"" ,

		},

		initialize: function (param) {
			this.param = param;
			this.render();
		},
		template:function(data) {
            console.log("template: data:", data.inputId);
			var raw =
                '<div id = "{{findPwFormId}}" class="findPwForm">'
                +'<form>'
    			+ '<label>아이디</label><input id="{{inputUser}}" type="text">'
    			+ '<label>이름</label><input id="{{inputId}}" type="text">'
    			+ '<label>이메일</label><input id="{{inputEmail}}" type="text">'
  				+ '</form>'
                + '<div class="login-help">'
    			+ '<input type="submit" class="btn btn-primary" value="{{inputValue}}">'
  				+ '</div>'
                +'</div>';
                //return _.template(raw)(data);
                return Handlebars.compile(raw)(data);
		},
	    render: function (data) {
	    	    	$(this.el).html(this.template(this.param));
		     return this;
	    },
	});


})();

