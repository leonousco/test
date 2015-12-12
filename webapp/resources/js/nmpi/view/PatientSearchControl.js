(function () {
    'use strict';

    Nis.View.PatientSearchControl = Nis.View.SearchControlBase.extend({
        id:'OrgSearchControl',
        items:[
            'gender',
            //'locationCode',
            'patientPhoneNumber',
            'patientFirstRrn',
            'patientLastRrn',
            'patientName',
            'searchButton',
        ],
        initialize: function (options) {
            //console.log("initialize: options:", options);
            Uic.CompositeView.prototype.initialize.call(this, options);
            //var button = this.$el.find("#search");
            //$(button).click(this.onClickButton.bind(this));
        },
        initView:function(){
            this.appendView('gender', this.makeSelect('sex', 'gender'));
            //this.appendView('locationCode', this.makeSelect('HospitalArea', 'locationCode'));
            //this.appendView('requestType', this.makeSelect('RequestType', 'requestType'));
            this.appendView('patientPhoneNumber', this.makeTextInputByDbid('patientPhoneNumber'));
            this.appendView('patientFirstRrn', this.makeTextInputByDbid('patientFirstRrn'));
            this.appendView('patientLastRrn', this.makeTextInputByDbid('patientLastRrn'));
            this.appendView('patientName', this.makeTextInputByDbid('patientName'));
            this.appendView('searchButton', this.makeSearchButton());
        },
    });  //Nis.UiInfo.SearchLayout

})();
