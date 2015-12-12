
(function () {
    'use strict';

    Nis.Model.HasNisRequest = {
        requestCreate:function(options) {
            console.log("requestCreate");
            var attrs = {requestStatus:Nis.Code.ReqStatus.request, requestType:Nis.Code.RequestType.create};
            $.extend(this.attributes, attrs);
            this.save(this.attributes, {success:options.success, error:options.error});
        },
        requestModify:function(options) {
            console.log("requestModify");
            if(! _.isUndefined(this.attributes.taskId)){
                delete this.attributes.taskId;
            }            
            var attrs = {requestStatus:Nis.Code.ReqStatus.request, requestType:Nis.Code.RequestType.modify};
            $.extend(this.attributes, attrs);
            this.save(this.attributes, {success:options.success, error:options.error});
        },
        requestDelete:function(options) {
            console.log("requestDelete");
            if(! _.isUndefined(this.attributes.taskId)){
                delete this.attributes.taskId;
            }            
            var attrs = {requestStatus:Nis.Code.ReqStatus.request, requestType:Nis.Code.RequestType.delete};
            $.extend(this.attributes, attrs);
            this.save(this.attributes, {success:options.success, error:options.error});
        },            
        confirmRequest:function(options) {
            console.log("confirmRequest:");
            //this.showProgress('sending ...');
            //this.attributes.requestStatus = Nis.Code.ReqStatus.confirmed;
            var attrs = {requestStatus:Nis.Code.ReqStatus.confirmed};
            this.save(attrs, {
                success: function(model, response) {
                    console.log("confirmRequest:success: "  + response);
                    if(options && options.success) {
                        options.success(model, response);
                    }
                    //model.hideProgress();
                },
                error: function(model, response) {
                    console.log("confirmRequest:error: "  + response);
                    //model.hideProgress();
                    if(options && options.error) {
                        options.error(model, response);
                    }
                },
                wait:true,
            });
            console.log("confirmRequest: after save");
        },
            // [20151107 leo #9800]
        rejectRequest:function(memo, options) {
            console.log("rejectRequest:");
            //this.showProgress('sending ...');
            //this.attributes.requestStatus = Nis.Code.ReqStatus.confirmed;
            var attrs = {requestStatus:Nis.Code.ReqStatus.reject};
            if(memo) {
                $.extend(attrs, {
                    memo:memo,
                });
            }
            this.save(attrs, {
                success: function(model, response) {
                    console.log("rejectRequest:success: "  + response);
                    //model.hideProgress();
                    if(options && options.success) {
                        options.success(model, response);
                    }
                },
                error: function(model, response) {
                    console.log("rejectRequest:error: "  + response);
                    //model.hideProgress();
                    if(options && options.error) {
                        options.error(model, response);
                    }
                },
                wait:true,
            });
            console.log("confirmRequest: after save");
        },      
    } // end of Nis.Model.HasNisRequest


})();
