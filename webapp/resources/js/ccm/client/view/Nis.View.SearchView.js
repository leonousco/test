(function () {
    'use strict';


    Nis.View.SearchView = Uic.LayoutView.extend({
        regions: {
            comboBox: '#comboBox',
            inputBox: '#inputBox',
            searchButton: '#searchButton',
        },
        initialize: function (param) {
            this.param = param;
            Uic.LayoutView.prototype.initialize.call(this, this.param);
        },
        onSearchButtonClick:function(buttons, inputBox){
            // var ss = $(this.el).find('input');
            var input = document.getElementById('inputBox');
            this.trigger('click.searchButton', buttons, input);
        },
        getDefaultTemplate:function(data) {
            console.log("template: data:");
            var raw =
                '<div id="nis_button-list" class="nis-button-list col-sm-12">'
                    +'<input type="text" id="inputBox"/>'
                    +'<button id="search" type="button" class="btn btn-default searchButton">검색</button>'
                    +'<a href="#detail">상세검색</a>'
                +'</div>';
                return raw;
        },    
    });
})();
