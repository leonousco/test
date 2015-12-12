
(function () {
	'use strict';

	Uic.Footer = Uic.View.extend({
		tagName: 'footer',
		className: 'footer',
		id: 'page_footer',
		element:null,
		title:"",
		initialize: function (title) {
			if(title) {
				this.title = title.title;
			}
			this.render();
			this.$el.css({
				'background-color':'#ececec',
				'width': '100%',
				'position': 'relative',
			});
			var style = $(this.getStyle());
			this.$el.append(style);
			this.$el.style.backgroundColor = '#ececec';
		},
		template:function(data) {
			var raw = 
				'<div class="container style="background-color: #ececec;">'
				+'<center>'
				+'  <p class="footer_text"> | 개인정보 취급방침 | 자주 묻는 질문 | </p>'
				+'</center>'
				+'</div>';
			return _.template(raw)(data);
		},        
	    render: function () {    	
			$(this.el).html(this.template());
			return this;
	    },	
	    setTitle: function (title) {    	
	        $(this.element).find("#title").text(title);
	        this.render();
	        return this;
	    },	
		getStyle:function() {
			return 'background-color: #ececec; width: 100%; position: relative;';
		},	    
	});



})();

