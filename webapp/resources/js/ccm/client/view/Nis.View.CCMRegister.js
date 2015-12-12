/*global NisMVC:true, Backbone */

(function () {
    'use strict';

    //var footerTemplate = _.template('<div id="form-footer" class="form-group"> </div>')();

    Nis.View.CCMRegister = Uic.Form.extend({
        model:null,
        param:null,
        itemView: Uic.InputFormGroup, 
        setModel:function(model) {
            console.log("setModel: ", model);
            this.model = model;
        },
        onCancel: function() {
            console.log("onCancel - UserForm: ");
            window.location.href="#";
        },
        beforeSave: function () {
            console.log("beforeSave:");

                var data = new FormData();
                    data.append("#upload", $("input[name=upload]").file);

//            if(! data) {
                $.ajax({
                    url : "http://192.168.0.153:8880/ccm_server/api/v1/token/no-token/SingleModelSave/type/CREATE/status/EVALUATING", 
                    type: "POST",
                    data : JSON.stringify(this.model.attributes),
                    contentType: "plain/text", 
                    success:function(data){
                        alert("success");
                        window.location.href="#evaluate";
                    }, 
                    error: function (request, status, error) {
                        alert("error");
                    }    
                });
//            } else {
/*
                    var data = new FormData();
                    data.append("#upload", $("input[name=upload]").file);

                    $.ajax({
                        url: 'http://192.168.0.153:8880/ccm_server/api/v1/token/no-token/excel',
                        type: "post",
                        data: data,
                processData: false,
                contentType: false,
                success: function(data, textStatus, jqXHR) {
                    alert(data);
                }, error: function(jqXHR, textStatus, errorThrown) {

                }
                });
            }*/
        },
        showSaveConfirm: function(thisView) {
            this.parentView.trigger("closeView", this.parentView);
        },
    });


})();

