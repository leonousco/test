
(function () {
	'use strict';


	Uic.InputFormGroup = Uic.CompositeView.extend({
		className:'form-group has-feedback',
		initialize: function (options) {
			//console.log("initialize: ", options);
			this.initOptions(options);
			this.renderView();
			if(options.data.conceptId) {
				this.conceptSetUtil = new Nis.ConceptSetUtil();
				this.conceptSetUtil.addConcept(options.data.conceptId);
			}
			var inputView = this.makeInput(options);
			inputView.$el.attr('dbid', options.data.dbid);
			this.setInput(inputView);
			    var label = this.$el.find('.form-label');
			    label.append($('<span > : </span>'));
			    label.css("text-align", "right");
			if(options.readOnly) {
			}
			else {
			    if(options.required || options.data.required || options.mandatory || options.data.mandatory) {
				    //var label = this.$el.find('.form-label');
				    label.append($('<span style="color:red"> *</span>'));
				    this.$el.addClass('has-error');
			    }
			}
		},
		getAttrId:function(options) {
			return 'formGroup_' + options.data.inputId;
		},
		getDefaultTemplate:function(options) {
			//console.log("getDefaultTemplate: ", options);
			if(options.raw)
			    return options.raw;
			var raw =
			    '<label for="{{labelForName}}" class="col-sm-4 control-label form-label">{{labelTitle}}</label>'
			    +'<div id=inputView class="col-sm-8"></div>'
			    +'<div class="help-block with-errors"></div>';
			return raw;
		},
		render:function() {
			return this;
		},
		makeLabelInput:function(options) {
			var viewOptions = {
				id:'itemId_'+options.data.dbid,
				tagName:'p',
				className:'form-control-static nis-input',
				dbid:options.data.dbid,
				readOnly:options.readOnly,
				conceptId:options.data.conceptId,
			};
			var inputView = new Uic.Label(viewOptions);
			return inputView;
		},
		makeTextInput:function(options, type, viewOptions) {
			var inputView = null;
			if(options.readOnly) {
				inputView = this.makeLabelInput(options);
			}
			else {
				inputView = new Uic.Input(viewOptions);
				inputView.$el.addClass("form-control");
				if(type === 'email') {
					inputView.$el.attr('data-error', 'email address is invalid');
				}
				else if(type === 'tel') {
					inputView.$el.attr('data-error', 'phone number is invalid');
				}
			}
			return inputView;
		},
		makeRadioInput:function(options, viewOptions) {
			viewOptions.items = [];
			if(options.data.items)
				viewOptions.items = options.data.items;
			viewOptions.dbid = options.data.dbid;
			var inputView = new Uic.RadioView(viewOptions);
			return inputView;
		},
		makeSelectInput:function(options) {
			var viewOptions = {
				conceptId:options.data.conceptId,
				attributes:{
					dbid:options.data.dbid,
				},
				label:options.data.label,
			};
			if(options.data.controlLabel)
				viewOptions.label = options.data.controlLabel;

			var inputView = new Uic.SelectPicker(viewOptions);
			inputView.$el.addClass("form-control");
			return inputView;
		},
		makePhoneInput:function(options){
			var inputView = new Uic.Input.Phone({
				dbid:options.data.dbid,
				type:options.data.type,
			});			
			return inputView;			
		},
		makeInput:function(options) {
			var viewOptions = {
				data:options.data,
			};
			if(options.data.conceptId)
				viewOptions.conceptId = options.data.conceptId;
			var type = "text";
			if(options.data && options.data.type) {
				type = options.data.type;
			}
			if(type === 'radio') {
				if(options.readOnly)
					this.inputView = this.makeLabelInput(options);
				else
					this.inputView = this.makeRadioInput(options, viewOptions);
				return this.inputView;
			}
			else if(type === 'textarea') {
				this.inputView = new Uic.Textarea(options);
				this.inputView.$el.addClass("form-control");
				return this.inputView;
			}
			else if(type === 'select') {
				if(options.readOnly)
					this.inputView = this.makeLabelInput(options);
				else
					this.inputView = this.makeSelectInput(options);
				return this.inputView;
			}
			//var view;
			if(type === 'text' || type === 'email' || type === 'number') {
				this.inputView = this.makeTextInput(options, type, viewOptions);
			}
			else if(type === 'checkbox') {
				var view = new Uic.Input(viewOptions);
				this.inputView = new Uic.CompositeView({
					tagName:'label',
				});
				this.inputView.$el.append(view.el);
				this.inputView.$el.addClass("checkbox-inline");
				if(options.data.checkText) {
					this.inputView.$el.append(options.data.checkText);
				}
				return this.inputView;
			}
			else if(type === 'postalCode') {
				if(options.readOnly) {
					this.inputView = this.makeLabelInput(options);
				}
				else {
					this.inputView = new Uic.AddressSearch({
						dbid:options.data.dbid,
					});
					this.inputView.on('onComplete', this.onAddressSearched.bind(this));					
				}
				return this.inputView;
			}
			else if(type === 'mobile' || type === 'tel') {
				this.inputView = this.makePhoneInput(options);
				return this.inputView;
			}
			return this.inputView;
		},
		/*
		onAddressSearched:function(data){
			this.trigger('onAddressSearched', data);
		},
		*/
		setInput:function(view) {
			if(_.isUndefined(view))
				return;
			var targetView = $(this.el).find('#inputView');
			this.inputView = view;
			this.$('#inputView').append(view.el);
		},
		getInput:function() {
			return this.inputView;
		},
		setValidatedUi:function(flag, dbid, msg) {
			if(flag) {
				this.$el.removeClass('has-error');
				this.$el.addClass('has-success');
				this.inputView.$el.tooltip('disable');
			}
			else {
				this.$el.addClass('has-error');
				this.inputView.$el.tooltip('enable');
				this.inputView.$el.tooltip({trigger:'focus'}).attr("data-original-title", msg);
			}
		},
		setValue:function(value){
			this.getInput().setValue(value);
		},
		getValue:function(dbid){
			return this.getInput().getValue(dbid);
		},
	});

	_.extend(Uic.InputFormGroup.prototype, Uic.Input.HasAddressSearch);

})();

