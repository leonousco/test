/*global Backbone, NisMVC:true */

var Nis = Nis || {};

(function () {
    'use strict';

    Nis.Model.LoginUi = Nis.UiInfo.extend ({
        title:"NHP",
        subTitle:"Organization information",
        param: [
            {
                formGroupId:"formGroupId",
                labelForName:"id",
                labelTitle:"일련번호",
                inputId:"id",
                inputType:"id",
                placeholder:"일련번호",
                inputValue:"",
            },
            {
                formGroupId:"formGroupId",
                labelForName:"oid",
                labelTitle:"OID",
                inputId:"oid",
                inputType:"text",
                placeholder:"OID",
                inputValue:"",
            },
        ],
        constructor: function() {
            console.log("constructor:");
            this.model = new Nis.Model.Login();
        },
        initialize: function () {
            console.log("initialize:");
        },
        getFooter:function() {
            this.btnInfo = new Nis.UiInfo();
            this.btnInfo.addParam({
                buttonId: "btnIdOk",
                buttonClass:"save",
                buttonTitle: "OK",
            });
            this.btnInfo.addParam({
                buttonId: "btnIdCancel",
                buttonClass:"cancel",
                buttonTitle: "Cancel",
            });
            return this.btnInfo;
        },
        getGridInfo:function(options) {            
            var ret = null;
            //var ret = new Nis.Model.UserGridUi();
            
            if (options == "user")            
                ret= new Nis.Model.UserGridUi();
            else if (options =="apiKey")
                ret= new Nis.Model.ApiKeyGridUi();            
            else if (options =="authority")
                ret= new Nis.Model.AuthorityUi();
            
            return ret;
        },
        getBbGridInfo:function(onRowClickCb) {
            var gridInfo = {
                containerId: '#bbGrid',
                rows: 25,
                rowList: [5, 25, 50, 100],
                colModel: [
                    {title: 'Name', index: true, name: 'name', filter: true, filterType: 'input'},
                    {title: ' ', index: true, name: 'links', filter: false, filterType: 'input', width: '110px'}
                ],
                onRowClick: onRowClickCb,
            }
            return gridInfo;
        },
        getHeaderInfo:function(options) {
            var ui = new Nis.Model.AppHeaderUi(options);
            this.appHeaderInfo = ui.getInfo(options);
            return this.appHeaderInfo;
        },
        getFormInfo:function(options) {
            //if(isDefined(this.formInfo))
               //return this.formInfo;
           var ui ;

             if (options =="add")
                ui = new Nis.Model.UserAddFormUi(options);
             else
                ui = new Nis.Model.LoginFormUi(options);   

             this.formInfo = ui.getInfo(options);            
             return this.formInfo;
        },
    });
})();
