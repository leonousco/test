(function () {
    'use strict';

    Nis.View.OrgSearchControl = Nis.View.SearchControlBase.extend({
        id:'OrgSearchControl',
        items:[
            'classCode',        
            'locationCode',
            'requestType',
            'name',
            'searchButton',
        ],
        initialize: function (options) {
            //console.log("initialize: options:", options);
            Uic.CompositeView.prototype.initialize.call(this, options);
            //var button = this.$el.find("#search");
            //$(button).click(this.onClickButton.bind(this));
        },
        initView:function(){
            this.appendView('classCode', this.makeSelect('HospitalType', 'classCode', "의료기관 선택"));
            this.appendView('locationCode', this.makeSelect('HospitalArea', 'locationCode', "지역 선택"));
            this.appendView('requestType', this.makeSelect('RequestType', 'requestType', "요청 종류 선택"));
            this.appendView('name', this.makeTextInputByDbid('name'));
            this.appendView('searchButton', this.makeSearchButton());   
        },
    });  //Nis.UiInfo.SearchLayout

})();
