(function () {
    'use strict';

    Nis.View.UserSearchControl = Nis.View.SearchControlBase.extend({
        id:'UserSearchControl',
        items:[
            'requestType',
            'userName',
            'loginId',
            'searchButton',
        ],
        initialize: function (options) {
            this.collection = options.collection;
            Nis.View.SearchControlBase.prototype.initialize.call(this, options);
            //var button = this.$el.find("#search");
            //$(button).click(this.onClickButton.bind(this));
        },
        initView:function(){
            this.appendView('requestType', this.makeSelect('RequestType', 'requestType'));
            this.appendView('userName', this.makeTextInputByDbid('userName'));
            this.appendView('loginId', this.makeTextInputByDbid('loginId'));
            this.appendView('searchButton', this.makeSearchButton());   
        },

    });  //Nis.UiInfo.SearchLayout

})();
