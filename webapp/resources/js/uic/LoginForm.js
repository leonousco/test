/*global NisMVC:true, Backbone */

var Uic = Uic || {};

(function () {
	'use strict';


	Uic.LoginForm = Backbone.View.extend({
		cTemplate:null,
		param: {
			loginFormId:"",
			inputUser:"" ,
			inputPw:"" ,
			inputValue:"" ,

		},

		initialize: function (param) {
			this.param = param;
			this.render();
		},
		template:function(data) {
            console.log("template: data:", data.inputId);
			var raw =
                '<div id = "{{loginFormId}}" class="login-card">'
                + '<h1>Log-in</h1><br>'
                +'<form>'
    			+ '<input id="{{inputUser}}" type="text" placeholder="UserId">'
    			+ '<input id="{{inputPw}}" type="password" placeholder="Password">'
    			+ '<input type="submit" name="login" class="login login-submit" value="{{inputValue}}">'
  				+ '</form>'
                + '<div class="login-help">'
    			+ '<a href="#">Register</a> • <a href="#">Forgot Password</a>;'
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

