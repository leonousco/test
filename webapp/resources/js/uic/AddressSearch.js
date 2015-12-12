
(function () {
	'use strict';
	
	Uic.AddressSearch = Uic.View.extend({
		className:'input-group',		
		initialize: function (options) {
			options = options || {};
			Uic.View.prototype.initialize.call(this, options);
			this.initView(options);
		},		
		initView:function(options){
			this.$el.find('button').on('click', this.onClickButton.bind(this));
			var input = this.getInput();
			input.attr('dbid', options.dbid);
		},		
		getInput:function(){
			return this.$el.find('input');
		},
		onClickButton:function(){
			console.log('onClickButton:');
			new daum.Postcode({
				oncomplete:this.onComplete.bind(this),
			}).open();
	/*
			this.onComplete({
				address:'addr',
				sido:'sido',
				sigungu:'sigungu',
				zonecode:'zonecode',
			});
*/
		},
		onComplete:function(data) {
			console.log('onComplete:', data);
			var addr = {
				address:data.address,
				city:data.sido,
				province:data.sigungu,
				postalCode:data.zonecode,
			}
			this.$el.find('input').val(addr.postalCode);
			this.trigger('onComplete', addr);
		},
		getDefaultTemplate:function(options) {
			var ret = 
				'<input type="text" class="form-control" size="6" placeholder="우편번호">'
				+'<span class="input-group-btn">'
					+'<button class="btn btn-secondary" type="button">우편번호 검색</button>'
				+'</span>';
			return ret;
		},
		setValue:function(value){
		    this.getInput().val(value);
		},
		getValue:function(){
		    return this.getInput().val();
		},        
	});

})();

