

(function () {
	'use strict';

	Uic.SelectOptionModel = Backbone.Model.extend({
		defaults : {
			text:'option',
		}
	});

	Uic.SelectOption = Uic.ItemView.extend({
		tagName: 'option',
		initialize: function (options) {
			//console.log("initialize: ", options);
			this.initOptions(options);
			this.render();
		},
		initOptions:function(options) {
			this.options = _.extend({
				raw:'{{text}}',
				data: {
					text:'',
				},
			}, options);
		},
	});


	Uic.SelectPicker = Uic.CompositeView.extend({
		tagName: 'select',
		className: 'selectpicker show-tick placeholder', // btn btn-primary show-menu-arrow show-tick',
		childView: Uic.SelectOption,
		collection:null,
		attributes: {
			data_attr: 'mydata'
		},
		events: {
			'change ' : 'onChange',
		},
		initialize: function (options) {
			//console.log("initialize: ", options);
			this.initOptions(options);
			this.collection = new Backbone.Collection();
			if(options.label)
				this.addLabel(options);

			if(this.options.conceptId) {
			   var loadOption = {
					success:this.onConceptSet.bind(this),
					error:this.onConceptSetError.bind(this),
				};
				NisMVC.code.getConceptSet(options.conceptId, loadOption);
			}
			else if(this.options.items) {
				self = this;
				$.each(this.options.items, function(index, value) {
					if(_.isString(value))
						self.addItem(true, {text:value});
					else if(value.value && value.text)
						self.addItem(true, {
							text:value.text,
							attributes:{
								value:value.value,
							},
						});
				});
			}
		},
		addLabel:function(options){
			this.addItem(true, {
				text:options.label,
				//text:"",
				attributes: {
					value:"",
					disabled:"",
					selected:"",
					"data-hidden":"true",
				},
			});
		},
		initOptions:function(options) {
			this.options = _.extend({
				raw:'{{text}}',
				data: {
					text:'SelectPicker',
				},
			}, options);
			if(options.class) {
				this.$el.addClass(options.class);
			}
		},
		onConceptSet:function(conseptSet) {
			for(var i=0; i<conseptSet.length; i++) {
				var options = {
					text:conseptSet[i].displayName,
					attributes:{
						value:conseptSet[i].code,
					}
				};
				this.addItem(true, options);
			}
			this.render();
		},
		onConceptSetError:function() {
		},
		childViewOptions: function(model, index) {
			if(model.attributes.attributes) {
				return {
					data: {text:model.attributes.text},
					attributes:model.attributes.attributes,
					//attributes: {
					//	value:model.attributes.attributes.value,
					//},
				};
			}
			return {
				data: {text:model.attributes.text},
				//attributes: {
				//    value:model.attributes.text,
				//},
			};
		},
		addItem:function(isAdd, item) {
			this.collection.add(new Uic.SelectOptionModel(item));
		},
		onChange:function(evnet) {
			//console.log("onChange: ", evnet, this.$el.val());
			this.trigger('onChange', this.$el.val(), evnet);
		},
		getValue:function(){
			return this.$el.val();
		},
		getSelectedLabel:function(){
			var selectedValue = this.getValue();
			var models = this.collection.models;
			for(var i=0; i<models.length; i++) {
				var model = models[i];
				if(model.attributes.attributes.value === selectedValue) {
					return model.attributes.text;
				}
				//console.log("getSelectedLabel:", model);
			}
			return null;
		},
		setValue:function(value){
			this.$el.val(value);
		},
		getValue:function(){
			return this.$el.val();
		},        
	});

})();
