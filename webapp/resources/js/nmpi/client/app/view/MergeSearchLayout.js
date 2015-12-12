
(function () {
	'use strict';

	NisMVC.MergeSearchLayout = Uic.LayoutView.extend({

        className:'form-group',
        regions: {
            searchInput:'#searchInput',
            searchButton: '#searchButton',
        },
        selectedCondition:"차트 번호",
        initialize:function(options) {
            Uic.LayoutView.prototype.initialize.call(this, options);
            //var view = new Uic.DropDownButton({button:this.getDropDownButtonInfo()});
            //view.on(Uic.DropDownButton.triggerSelected, this.onSelectCondition.bind(this));
            // view.addItem('차트 번호');
            // view.addItem('주민 번호');
            //this.searchSelector.show(view);
            this.showInput();
            //this.showSearchButton();
        },
        getCollection:function(){
            return this.collection;
        },
        getInputVal:function(id) {
        	var inputView = this.searchInput.currentView;
        	var el = inputView.$el.find(id);
        	var value = $(el).val();
        	return value;
        },
        showInput:function() {

            var panelLayout = new Uic.PanelLayout({
                className:'panel panel-info',
                //hasHeader:true,
            });
            var inputView = new NisMVC.PatientSearchControl();
            panelLayout.setContents(inputView);
            //panelLayout.setHeader('aaa');
            //this.searchInput.show(inputView);
            this.searchInput.show(panelLayout);
            inputView.initView();
            inputView.on('onChange', this.onChangeSearch.bind(this));
            inputView.on('onClickButton', this.onClickButtonSearch.bind(this));

            // panelLayout.$el.css({
            //     "width":"550px",
            // });


            //inputView.$el.css('display','block');
        },
        onChangeSearch:function(change){
            console.log("onChangeSearch:", change);
            this.trigger('click.search', change);
        },
        onClickButtonSearch:function() {
            console.log('onClickButtonSearch:');
        },

        getDefaultTemplate:function() {
            var ret = ''
                +'<div id="searchInput">'
	            +'</div>'
                +'<div id="searchButton">'
                +'</div>'
            return ret;
        },

	}); // end of NisMVC.MergeSearchLayout

})();

