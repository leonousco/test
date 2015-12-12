
(function () {
    'use strict';

    Nis.Model = Backbone.Model.extend({
        defaults: {
        },
        initialize: function (options) {
            //console.log("initialize: ", options);
            this.initOptions(options);
        },
        url : function() {
            if(this.attributes.link) {
                console.log("url(): link:", this.attributes.link);
                return this.attributes.link;
            }
            return this.getEntityUrl(this.id);
        },
        validateAll:function() {
            return false;
        },
        toJSON: function(options) {
            var ret =  _.clone(this.attributes);
            console.log("toJSON: ", ret);
            return ret;
        },
        requestCreate: function(onSuccessCb, onErrorCb) {
            console.log("requestCreate:");
            this.save(this.attributes, {success:onSuccessCb, error:onErrorCb, wait:true});
        },        
        fetch:function(options, successCb, failCb) {
            console.log("fetch: url():", this.url());
            var model = this;
            $.ajax({
                url:this.url(),
                dataType:"json",
                success:function (response) {
                    console.log("fetch success: " + response.body + ", options:" + options);
                    var values = model.parse(response);
                    //if(successCb) {
                    //    successCb();
                    //}
                    return Backbone.Model.prototype.fetch.call(model, options) ;
                }
            });
        },
        parse: function (response, options) {
            console.log("parse: Inside Parse ", response.statusCode);           
            if(response.statusCode != Nis.Code.ResponseOk) {
                return null;
            }
            var value = response;
            if(response.body)
                value = response.body;
            //console.log(this.toJSON());
            return value;
        },        
    }); // end of Uic.Model

    Nis.Model.Mixin = {
        initOptions:function(options) {
            this.options = _.extend({
                pageSize:10,
            }, options);
        },
        getEntityName:function() {
            if(this.options.entityName)
                return this.options.entityName;
            return '';
        },
        getServerName:function() {
            if(this.options.serverName)
                return this.options.serverName;
            return '';
        },        
        getEntityUrl:function(id) {
            //var token = localStorage.getItem("token") || "no-token";
            var token = NisMVC.App.getToken() || "no-token";
            var url = entityUrl.url(id, this.getEntityName(), this.getServerName(), token);
            //console.log("getEntityUrl:", " url:", url, token);
            return url;
        },
        showTbd: function(contents) {
            Uic.showModal("Not Implemented !!!", "[[ Model ]]   " + contents);
        },
        showProgress: function(message, options) {
           if (typeof options === 'undefined') {
                options = {};
            }
            if (typeof message === 'undefined') {
                message = 'sending';
            }
            var settings = $.extend({
                dialogSize: 'sm',
            }, options);
            if(this.progressDlg) {
                this.hideProgress.hide();
            }
            this.progressDlg = new Uic.WaitingDialog($);
            this.progressDlg.show(message, settings);
        },
        hideProgress:function() {
            if(this.progressDlg) {
                this.progressDlg.hide();
                this.progressDlg = null;
            }
        },
        setItemUtil:function(columns){
            this.itemUtil = new Nis.UiInfo.ItemUtil({items:columns});
        },
        getItemUtil:function(){
            return this.itemUtil;
        },
    }

    _.extend(Nis.Model.prototype, Nis.Model.Mixin);



    Nis.Model.HasNisRequest = {
        requestCreate:function(options) {
            console.log("requestCreate");
            var attrs = {requestStatus:Nis.Code.ReqStatus.request, requestType:Nis.Code.RequestType.create};
            $.extend(this.attributes, attrs);
            this.save(this.attributes, {success:options.success, error:options.error});
        },
        requestModify:function(options) {
            console.log("requestModify");
            var attrs = {requestStatus:Nis.Code.ReqStatus.request, requestType:Nis.Code.RequestType.modify};
            $.extend(this.attributes, attrs);
            this.save(this.attributes, {success:options.success, error:options.error});
        },
        requestDelete:function(options) {
            console.log("requestDelete");
            var attrs = {requestStatus:Nis.Code.ReqStatus.request, requestType:Nis.Code.RequestType.delete};
            $.extend(this.attributes, attrs);
            this.save(this.attributes, {success:options.success, error:options.error});
        },              
    }





})();
