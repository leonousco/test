
(function () {
	'use strict';

	NisMVC.HeaderView = Uic.LayoutView.extend({
		id:'nis_header',
		tagName:'div',
		className:'navbar navbar-inverse navbar-fixed-top',
		regions: {
			header: ".navbar-header",
			collapse: ".navbar-collapse",
		},
		initialize: function (options) {
			Uic.LayoutView.prototype.initialize.call(this, options);
			if(_.isUndefined(options.hasLogout))
				options.hasLogout = true;
			//options.subTitle = options.subTitle || '';
			this.renderView();
			var headerOption = new Uic.View({
				raw:this.getNavHeaderTemplate(),
			});
			this.header.show(headerOption);
			this.makeCollapseView(options);
			//this.makeLogoutView();
			if(options.isClient) {
				this.$el.css({
					'background':'url(resources/images/nis/mg_header.png)',
					'background-size': 'cover',
				});
				var style = $(this.getHeaderStyle());
				this.$el.append(style);
			}
		},
		getHeaderStyle:function() {
			var ret = '<style>'
			+ '.navbar-inverse .navbar-nav > .active > a,'
			+ '.navbar-inverse .navbar-nav > .active > a:focus,'
			+ '.navbar-inverse .navbar-nav > .active > a:hover {'
			+     'color:#fff;'
			+     'background-color: transparent;'
			+ '} </style>';
			return ret;
		},
		makeCollapseView:function(options){
			var items = [];
			for(var i=0; i<options.items.length; i++) {
				var item = options.items[i];
				if(_.isUndefined(item.href)) {
					item.href = '#'+item.id;
				}
				if(_.isUndefined(item.className)) {
					item.className = item.id;
				}
				items.push(item);
			}
			var view = new Uic.List({
				tagName:'ul',
				className:'nav navbar-nav',
				itemRaw:this.getNavCollapseTemplate(),
				items:items,
			});
			this.collapse.show(view);
			if(options.hasLogout || options.hasLogin) {
				this.collapse.currentView.$el.parent().append(this.onMakeLogoutButton(options));
				this.makeLogoutCb(options);
			}

		},
		onMakeLogoutButton:function(options){
			//console.log("onMakeLoutButton:", options);
			var html = this.getLogoutTemplate(options);
			var e = $(html);
			return $(html);
		},
		makeLogoutCb:function(options) {
			var view = this.$el.find('#logout_button');
			//console.log('makeLogoutCb:', options, view);
			if(view.length >= 1) {
				if(options.hasLogout) {
					view.on('click', this.onClickLogout.bind(this));
				}
				else if(options.hasLogin){
					view.on('click', this.onClickLogin.bind(this));
					//view.on('click', options.onClickLogin);
				}
			}
		},
		onClickLogout:function(){
			//console.log('onClickLogout:');
			this.trigger('onClickLogout');
			return false;
		},
		onClickLogin:function(event){
			//console.log('onClickLogin:');
			this.trigger('onClickLogin');
			return false;
		},
		makeChildView:function(childParam, region) {
			var view = new Uic.HBView(childParam);
			var view3 = this.$el.find(region);
			$(view3).replaceWith(view.el);
		},
		render: function () {
		    return this;
		},
		select: function(menuItem) {
		    $('.nav li').removeClass('active');
		    $('.' + menuItem).addClass('active');
		},
		getTitleHtml:function(options){
			if(options.titleHtml)
				return options.titleHtml;
			var params = _.extend({
				title: 'NIS',
				subTitle:options.subTitle || '',
			}, options);
			return '<h2 style="color:#778899"> '+params.title+'   <small class="text-info">   '+params.subTitle+' </small> </h2>' ;
		},
		getDefaultTemplate:function(options) {
			var raw = '<div class="container">'
				+ this.getTitleHtml(options)
				+'  <div class="navbar-header"> </div>'
				+'  <div class="navbar-collapse collapse"> </div>'
				+'</div>';
			return raw;
		},
		getNavHeaderTemplate:function(options) {
               var raw =  '  <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">'
                +'    <span class="icon-bar"></span>'
                +'    <span class="icon-bar"></span>'
                +'    <span class="icon-bar"></span>'
                +'  </button>';
			return raw;
		},
		getNavCollapseTemplate:function(options) {
			return '<li class={{className}}><a href={{href}}><i class="icon-edit icon-white"></i>{{title}}</a></li>';
		},
		getLogoutTemplate:function(options) {
			var userId = NisMVC.App.getUserId();
			var userIdH = '  : ' + userId;
			var raw = ''
                +'<form class="navbar-form navbar-right">';
                if(options.isClient)
                	raw += '            <button id="logout_button" class="btn btn-default form-control" style="background-color: transparent;">';
                else
                	raw += '            <button id="logout_button" class="btn btn-default form-control" style="background-color: transparent;color:#5F9EA0;">';
                if(options.hasLogout) {
                	raw += '<span class="glyphicon glyphicon-log-out"></span>  Logout' + userIdH;
                }
                else if(options.hasLogin) {
                	raw +=  '<span class="glyphicon glyphicon-log-out"></span>  Login';
                }
                            raw += '</button>'
                +'        <div class="dropdown"></div>'
                +'</form>';
                return raw;
		},

	}); // end of NisMVC.HeaderView

})();

