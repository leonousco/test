
(function () {
	'use strict';


	Uic.Input.Phone = Uic.View.extend({
		className:'form-group raw form-control',
		events: {
			"change"        : "onChange",
		},
		initialize:function(options) {
			Uic.View.prototype.initialize.call(this, options);
			if(options.type == 'tel')
				this.setModel(new Uic.Input.Phone.Model({
					num0:'02',
				}));
			else 
				this.setModel(new Uic.Input.Phone.Model({
					num0:'010',
				}));
			this.initView(options);
		},
		initView:function(options){
			this.inputMap = {};
			var inputId = 'num0';
			var conceptId = 'mobilePrefix';
			if(options.type == 'tel') {
				conceptId = 'phoneLocal';
			}
			var input0 = this.makeSelectInput({
				conceptId:conceptId,
				inputId:inputId,
			});
			this.inputMap[inputId] = input0;

			var inputId = 'num1';
			var input1 = this.makeInput({size:4, inputId:inputId});
			this.inputMap[inputId] = input1;

			var inputId = 'num2';
			var input2 = this.makeInput({size:4, inputId:inputId});
			this.inputMap[inputId] = input2;

			this.$el.append(input0.el);
			this.$el.append($('<span> -</span>'));
			this.$el.append(input1.el);
			this.$el.append($('<span>-</span>'));
			this.$el.append(input2.el);

			this.$el.attr('dbid', options.dbid);
		},
		setModel:function(model){
			this.model = model;
			this.listenTo(this.model, 'change', this.onModelChange.bind(this));
		},
		onModelChange:function(params) {
			var changed = params.changed;
			for (var key in changed) {
				if (changed.hasOwnProperty(key)) {
					var input = this.getInput(key);
					if(input)
						input.setValue(changed[key]);
		            //console.log(key, params[key]);
		        }
		    }            
		},
		getInput:function(key){
			return this.inputMap[key];
		},
		onChange:function(event){
			var target = event.target;
			var change = {};
			var inputId = $(target).attr('inputId');
			//console.log("onChange:", inputId, target.value);
			if(inputId) {
				this.model.attributes[inputId] = target.value;
				if(this.model.triggerable()) {
					//console.log('onChange:', this.getValue(), event);
					this.$el.trigger('change');
				}
			}
		},
		makeSelectInput:function(options) {
			var viewOptions = {
				conceptId:options.conceptId,
				attributes:{
					inputId:options.inputId,
				},
				//label:options.data.label,
			};
			var inputView = new Uic.SelectPicker(viewOptions);
			return inputView;
		},		
		makeInput:function(options) {
			var inputOpt = {
				attributes:{
					inputId:options.inputId,
					type:'text',
					size:options.size,
					placeholder:'0000',
					maxlength:options.size,
					role:'form',
					style:'text-align:center; border:0px; margin:0px',
					pattern:'[0-9]',
				},
				data: {
					input:'phoneInput',
				},
			};
			var view = new Uic.Input(inputOpt);
			view.$el.keydown(this.onKeyDown.bind(this));
			return view;
		},
		onKeyDown:function(e) {
			// Allow: backspace, delete, tab, escape, enter and .
			if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
			// Allow: Ctrl+A, Command+A
			(e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
			// Allow: home, end, left, right, down, up
			(e.keyCode >= 35 && e.keyCode <= 40)) {
			// let it happen, don't do anything
				return;
			}
			// Ensure that it is a number and stop the keypress
			if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
				e.preventDefault();
			}
		},
		setValue:function(value){
			this.model.setValue(value);
		},
		getValue:function(){			
			return this.model.getValue();
		},		
	}); // end of Uic.Input.Phone

	Uic.Input.Phone.Model =  Backbone.Model.extend({
		defaults: {
			num0:'010',
			num1:null,
			num2:null,
		},		
		triggerable:function(){
			var attr  =this.attributes;
			if(attr.num0 !== null && attr.num1 !== null && attr.num2 !== null) {
				if(attr.num1.length == 4 && attr.num2.length == 4)
					return true;
			}
			return false;
		},
		setValue:function(value){
			if(value === null)
				return;
			var len = value.length;
			if(len < 9 || len > 11) 
				return;
			var v = {};
			var pos = len-8;
			v.num0 = value.substring(0, pos);
			v.num1 = value.substring(pos, pos+4);
			v.num2 = value.substring(pos+4, len);
			//console.log('setValue:', v);			
			this.set(v);
		},
		getValue:function(){
			return this.attributes.num0 + this.attributes.num1 + this.attributes.num2;
		},		
	}); // end of Uic.Input.Phone.Model



})();

