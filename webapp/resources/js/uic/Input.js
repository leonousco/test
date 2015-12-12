
(function () {
	'use strict';

	Uic.Input = Uic.ItemView.extend({
		//className:'col-sm-5',
		tagName:'input',
		initialize: function (options) {
			//console.log("initialize: ", options);
			this.initOptions(options);			
			this.setAttrs(options.data);
			if(options.data.type === 'text' || options.data.type === 'tel' 
				|| options.data.type === 'number' || options.data.type === 'phone') {
				this.setAttr("placeholder", options.data.placeholder);
				this.setAttr("value", options.data.inputValue);
				if(options.data.minlength) {
					this.setAttr("minlength", options.data.minlength);
				}
				if(options.data.maxlength) {
					this.setAttr("maxlength", options.data.maxlength);
					this.setAttr("size", options.data.maxlength);
					//this.$el.maxlength({
					//	threshold:options.data.maxlength,
					//});
				}
			}
			this.renderView();
			if(options.data.type === 'tel' 
				|| options.data.type === 'number' || options.data.type === 'phone') {
				this.$el.keydown(this.onNumberDown.bind(this));
			}
			if(options.data.type === 'phone') {
				this.setAttr("data-format", '(ddd) dddd-dddd');
			}
			else if(options.data.type === 'tel') {
				this.setAttr("data-format", '(ddd) dddd-dddd');
			}
		},		
		getAttrId:function(options) {
			//return 'input_' + options.data.inputId;
			return options.data.inputId;
		},
		setAttrs:function(param) {
			if(param.type == null)
				param.type = param.inputType;
			this.setType(param.type);
			this.setAttr("dbid", param.dbid);
		},
		setType:function(type) {
			this.setAttr("type", type);
		},
		getType:function(type) {
			return this.getAttr("type");
		},
		setParam: function (param) {
			this.setAttr("type", param.type);
			this.setAttr("id", param.id);			
			this.render();
			return this;
		},
		setAttr:function(key, val) {
			if(val) {
				this.$el.attr(key, val);
			}
		},
		getAttr:function(key) {
			return this.$el.attr(key);
		},
		getCheckBoxRaw:function(options) {
			var raw =''
				+'<label class="checkbox-inline">'
				+'<input id="{{inputId}}" dbid="{{dbid}}" type="{{type}}"'
				//+'class="form-control"'
				+' value=""> Option 1</label>';
			return raw;
		},
		onNumberDown:function(e) {
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
			else if(this.options.data.maxlength) {
				if(this.$el.val().length >= this.options.data.maxlength){
					e.preventDefault();					
				}
			}
		},		
		setValue:function(value){
			this.$el.val(value);
		},
		getValue:function(){
			return this.$el.val();
		},
	}); // end of Uic.Input

	Uic.Input.HasAddressSearch = {
		onAddressSearched:function(data){
			//console.log('onAddressSearched:', data);
			this.trigger('onAddressSearched', data);
		},
	} // end of Uic.Input.HasAddressSearch




})();

