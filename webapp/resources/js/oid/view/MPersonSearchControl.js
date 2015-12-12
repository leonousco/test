(function () {
    'use strict';

    Nis.View.MPersonSearchControl = Nis.View.SearchControlBase.extend({
        id:'MPersonSearchControl',
        items:[
            'licenseType',
            'name',
            'oid',
            'searchButton',
        ],
        initialize: function (options) {
            this.collection = options.collection;
            Nis.View.SearchControlBase.prototype.initialize.call(this, options);
            //var button = this.$el.find("#search");
            //$(button).click(this.onClickButton.bind(this));
        },
        initView:function(){
            this.appendView('licenseType', this.makeSelect('DoctoryLicenseType', 'licenseType', '면허종류 선택 '));
            this.appendView('name', this.makeTextInputByDbid('name'));
            this.appendView('oid', this.makeTextInputByDbid('oid'));
            this.appendView('searchButton', this.makeSearchButton());
        },

    });  //Nis.UiInfo.SearchLayout

})();
