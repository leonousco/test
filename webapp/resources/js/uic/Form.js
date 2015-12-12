var Uic = Uic || {};

(function () {
	'use strict';

	Uic.Form = Marionette.LayoutView.extend({
		model:null,
		param:null,
		itemView: Uic.InputFormGroup,
		regions: {
		    title: "#form-title",
		    content: "#form-content",
		    //footer: "#form-footer",
		},
		tagName: function() {
		    return this.options.tagName;
		},
		className: function() {
		    return this.options.className;
		},
		id:function() {
			return this.options.id;
		},

		initialize: function (param) {
			this.param = param;
			$(this.el).html(this.template(this.param.data));
			//this.render();

			this.makeChildView(this.param.formTitle, this.regions.title);
			this.showContents(this.param.formItems)
			this.makeChildView(this.param.formFooter, this.regions.content);


			//this.uiInfo = uiInfo.uiInfo;
			//this.model = this.uiInfo.getModel();
			//$(this.el).html(this.template());

			//this.showTitle();
			//this.showContents();
			if(this.param.formFooter) {
				this.showFormFooter(this.param.formFooter);
				this.showButtons(this.param.formFooter.buttons);
			}
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
				var attr = $(el).attr('dbid');
				var value = model.attributes[attr];
				console.log("setModel: ",  index, ": ", attr, ", value:", value);
				if(value) {
					$(el).val(value);
				}
			});
		},
		template:function(data) {
			var html = Handlebars.compile(this.param.raw)(this.param.data);
			return html;
		},
	    render: function () {
            return this;
	    },
		makeChildView:function(childParam, region) {
			var view = new Uic.HBView(childParam);
			var view3 = this.$el.find(region);
			if(childParam && childParam.replaceToParent) {
				$(view3).replaceWith(view.el);
			}
			else {
				//$(view3).append(view.$el);
				$(view3).append(view.el);
			}
		},
	    showTitle:function() {
	    		var param = {"h1_title":this.uiInfo.title,
	    			"s_title":this.uiInfo.subTitle};
	    		this.headerView = new Uic.PageHeader(param);
	    		this.title.show(this.headerView);
	    },
	    showContents:function(items) {
	    		var view = $(this.el).find(this.content.el);

	    	if(items) {
				for (var i = 0; i < items.length; i++) {
					var inputView = new Uic.InputFormGroup({data:items[i]});
				    $(view).append(inputView.el);
				}
	    	}
	    		/*
		     for (var i = 0; i < this.uiInfo.getItemCount(); i++) {
		            $(view).append(
		            	new Uic.InputFormGroup(this.uiInfo.getItem(i)
		            		).render().el);
		     }
		     */
	    		console.log("showContents: view:"+view);
	    },
	    showFormFooter:function(param) {
	    	if(param) {
	    		var html = Handlebars.compile(param.raw)(param.data);
	    		var view = $(this.el).find(this.content.el);
	    	}
	    },
	    showButtons:function(param) {
	    	if(param) {
		    	var view = $(this.el).find("#button-list");
		    	for (var i = 0; i < param.length; i++) {
		    		var binfo = param[i];
		    		var html = Handlebars.compile(binfo.raw)(binfo.data);
		    		$(view).append($(html));
		    	}
		    }
		    	//this.buttonsView = new Uic.ButtonGroup(param);

		    	/*
		    		var view = $(this.el).find(this.content.el);
		    		$(view).append($(footerTemplate));
		    		var footerView = this.$("#form-footer");
		    		this.buttonsView = new Uic.ButtonGroup(param);
		    		$(footerView).append($(this.buttonsView.el));
		    		*/
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
	    },
	    beforeMerge : function(event){
	    		console.log("beforeMerge:");
	    //		var check = this.model.validateAll();
	    		if(this.cbMap) {
	    			var cbFunc = this.cbMap.get('#merge');
	    			if(cbFunc) {
	    				cbFunc(this.model, this);
	    				return;
	    			}
	    		}
	    },


	    change: function (event) {
	    		console.log("change:");
	    		var target = event.target;
	    		var change = {};
	    		var dbid = $(target).attr('dbid');
	    		if(dbid) {
		        	change[dbid] = target.value;
		        	this.model.set(change);
		    		var check = this.model.validateItem(dbid);
	    		}
	    		/*
	    		else {
		        	change[target.id] = target.value;
		        	this.model.set(change);
		    		var check = this.model.validateItem(target.id);
	    		}
	    		*/
	        	//change[target.id] = target.value;
	    },
	    //TODO: [20151109 basil #9809]
	    beforeSave: function () {
	    		console.log("beforeSave:");
	    		var check = this.model.validateAll();
	    		if(this.cbMap) {
	    			var cbFunc = this.cbMap.get('#save');
	    			if(cbFunc) {
	    				cbFunc(this.model, this);
	    				return;
	    			}
	    		}
	    		if(check) {
	    			this.model.save();
	    		}
	    },
	    beforeDelete:function() {
	    		this.model.destroy();
	    },
	    onCancel: function() {
	    	console.log("onCancel");
	    },
	    upload: function() {
	    	console.log("upload : ");	
	    },
		setButtonCb:function(name, cbFunc) {
			console.log("setButtonCb:");
			if(_.isUndefined(this.cbMap))
				this.cbMap = new Nis.Map();
			this.cbMap.put(name, cbFunc);
		},

		//search patient
	    beforeSearch: function () {
	    		console.log("beforeSearch:");
	    //		var check = this.model.validateAll();
	    		if(this.cbMap) {
	    			var cbFunc = this.cbMap.get('#search');
	    			if(cbFunc) {
	    				cbFunc(this.model, this);
	    				return;
	    			}
	    		}
	    		this.trigger('click.search', this);
	    },
		setButtonCb:function(name, cbFunc) {
			console.log("setButtonCb:");
			if(_.isUndefined(this.cbMap))
				this.cbMap = new Nis.Map();
			this.cbMap.put(name, cbFunc);
		},
		fetch:function(options, successCb, failCb) {
			this.model.fetch(options, successCb, failCb);
		},
	     clearLabel:function(){
	    		var allView = $(this.el).find(this.content.el);	    		
	    		var clearView = $(allView).find('label');	    		

	    		clearView.each(function(index, el) {
	    			var attr = $(el).attr('id');
	    			if (attr != undefined && (attr.substring(attr.length-5 , attr.length) == "Check"))
	    				$(el).text("");

	    		});
	    },
	}); // end of Uic.Form


})();

