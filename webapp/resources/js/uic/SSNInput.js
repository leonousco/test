
(function () {
	'use strict';


	Uic.SSNInput = Uic.View.extend({
		className:'form-group raw form-control',
		events: {
			"change"        : "onChange",
		},
		initialize:function(options) {
			Uic.View.prototype.initialize.call(this, options);
			this.initView(options);
		},
		initView:function(options){
			this.inputMap = {};
			var inputId = 'patientFirstRrn';
			var input1 = this.makeInput({size:6, dbid:inputId});
			this.inputMap[inputId] = input1;

			var inputId = 'patientLastRrn';
			var input2 = this.makeInput({size:7, dbid:inputId});
			this.inputMap[inputId] = input2;

			this.$el.append(input1.el);
			this.$el.append($('<span> -</span>'));
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
					if(key === 'patientFirstRrn') {
						this.inputMap[key].setValue(changed[key]);
						console.log(key, changed[key]);
					}
					else if(key === 'patientLastRrn') {
						this.inputMap[key].setValue(changed[key]);
						console.log(key, changed[key]);
					}		            
				}
			}            
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
			view.$el.attr('dbid', options.dbid);
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
		getInput:function(dbid) {

		},
		setValue:function(value){
			console.log('setValue:', value);
			//this.$el.val(value);
		},
		getValue:function(dbid){
			console.log('getValue:', dbid);
			if(dbid === 'patientFirstRrn') {
				return this.inputMap[dbid].getValue();
			}
			else if(dbid === 'patientLastRrn') {
				return this.inputMap[dbid].getValue();
			}		            

			//return this.$el.val();
		},
		setValidatedUi:function(flag, dbid, msg) {
			return true;
		}

	}); // end of Uic.Input.Phone


	Uic.SSNInputGroup = Uic.InputFormGroup.extend({
		initialize: function (options) {
			console.log('initialize:', options);
			options.data.label = '환자주민등록번호';
			options.data.labelTitle = options.data.label;
			Uic.InputFormGroup.prototype.initialize.call(this, options);
		},
		makeInput:function(options) {
			this.inputView = new Uic.SSNInput(options);
			return this.inputView;
		},
		setModel:function(model){
			this.inputView.setModel(model);
		}
	}); // end of Uic.SSNInputGroup



})();

