(function () {
    'use strict';

    Nis.View.OIDSearchControl = Nis.View.SearchControlBase.extend({
        id:'OIDSearchControl',
        items:[
            'requestType',
            'orgName',
            'authorName',
            'searchButton',
        ],
        initialize: function (options) {
            this.collection = options.collection;
            Nis.View.SearchControlBase.prototype.initialize.call(this, options);
        },
        initView:function(){
            this.appendView('requestType', this.makeSelect('RequestType', 'requestType', "요청 종류 선택"));
            this.appendView('orgName', this.makeTextInputByDbid('orgName'));
            this.appendView('authorName', this.makeTextInputByDbid('authorName'));
            this.appendView('searchButton', this.makeSearchButton());   
        },

    });  //Nis.UiInfo.SearchLayout

})();
