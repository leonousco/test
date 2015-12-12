
(function () {
	'use strict';

	Uic.Label = Uic.ItemView.extend({
		initialize: function (options) {
			this.initOptions(options);			
			this.setAttrs(options);
			this.renderView();
			this.setValue(options.value);
			if(options.readOnly) {
				this.$el.css("border-bottom","1px dotted");
			}
			var conceptId = options.conceptId; 
			if(conceptId) {
			    if(_.isUndefined(this.conceptSetUtil)) {
			        this.conceptSetUtil = new Nis.ConceptSetUtil();
			    }
			    this.conceptSetUtil.addConcept(conceptId, options.dbid);
			}			
		},
		setAttrs:function(options) {
			this.setAttr("dbid", options.dbid);
		},
		render: function () {    	
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
		setValue:function(val) {
			if(val) {
				if(this.conceptSetUtil) {
					var val = this.conceptSetUtil.getDisplayName(this.getAttr("dbid"), val);
					this.$el.text(val);
				}
				else {
					this.$el.text(val);
				}
			}
		},
		getValue:function() {
			return this.$el.text();
		},
	});


})();

