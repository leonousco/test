(function () {
    'use strict';


    Nis.View.SearchView = Uic.LayoutView.extend({
        cTemplate:null,
        regions: {
            comboBox: '#comboBox',
            // inputBox: '#inputBox',
            searchButtonRegion: '#searchButtonRegion',
            // items: '#right',
            // itemDetail: '#right_south',
            // buttons: '#right_footer',
        },
        events: {
            'click [id="searchButtonRegion"]' : 'onSearchButtonClick',
        },
        initialize: function (param) {
            this.param = param;
            Uic.LayoutView.prototype.initialize.call(this, this.param);
            var buttons = this.makeSearchButton();
            this.searchButtonRegion.show(buttons);
            // var dropDownButton = this.makeComboBox(param.dataList);
            // this.comboBox.show(dropDownButton);
            // this.render();
        },
        makeSearchButton:function(){
            var buttons = [
                {
                    data: {
                        buttonId:"searchButton",
                        buttonClass:"btn btn-default",
                        buttonTitle:"검색",
                    },
                },                
            ];
            var view = this.makeButtons(buttons, this.onSearchButtonClick);
            return view;          
        },
        makeButtons:function(buttons, cbFunc) {
            var view = new Uic.Buttons({
                tagName:'span',
                raw:'<span id="nis-button-list" class="nis-button-list col-sm-1"> </span>',
                buttons:buttons,
            });
            return view;                        
        },
        makeComboBox:function(dataList){
            var view = new Uic.DropDownButton({button:this.getDropDownButtonInfo()});
            for(var i = 0 ; i < dataList.length ; i++){
                view.addItem(dataList[i]);
            }
            view.on(Uic.DropDownButton.triggerSelected, this.onSelectCondition.bind(this));
            return view;          
        },
        onSelectCondition:function(name, options) {
            console.log('onSelectCondition:', name, options);
            this.selectedCondition = name;
        },
        getDefaultTemplate:function(data) {
            console.log("template: data:");
            var raw =
                '<div id="nis_button-list" class="nis-button-list col-sm-12">'
                    +'<span id="comboBox"></span>'
                    +'<input type="text" id="inputBox" class="col-sm-3"/>'
                    +'<span id="searchButtonRegion"></span>'
                    // +'<input type="button" value="검색" class="btn btn-default" id="searchButton"/>'
                +'</div>';
                //return _.template(raw)(data);
                // return Handlebars.compile(raw)(data);
                return raw;
        },
        getDropDownButtonInfo: function() {
            console.log("getDefaultButton: ");
            return {
                raw: ' {{text}} <span class="caret"></span>',
                data:{
                    type:'button',
                    text:'선택',
                },
                attributes: {
                    'data-toggle':'dropdown',
                    'aria-haspopup':'true',
                    'aria-expanded':'false',
                    type:'button',
                },
                class:'btn btn-default dropdown-toggle',
           };
        },
        onSearchButtonClick:function(buttons, inputBox){
            // var ss = $(this.el).find('input');
            var input = document.getElementById('inputBox');
            this.trigger('click.searchButton', buttons, input);
        },
        // render: function (data) {
        //     $(this.el).html(this.template(this.param));
        //     return this;
        // },
    });


})();
