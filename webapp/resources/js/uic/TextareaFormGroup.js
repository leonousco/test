/*global NisMVC:true, Backbone */

var Uic = Uic || {};

(function () {
    'use strict';


    Uic.TextareaFormGroup = Backbone.View.extend({
        cTemplate:null,
        param: {
            formGroupId:"",
            labelForName:"" ,
            labelTitle:"" ,
            textareaId:"" ,
            textareaType:"" ,
            placeholder:"" ,
            textareaValue:"" ,
        },

        initialize: function (param) {
            this.param = param;
            this.render();
        },
        template:function(data) {
            var raw =
                '<div id="<%= formGroupId %>" class="form-group">'
                +'  <label for="<%= labelForName %>" class="col-sm-2 control-label"><%= labelTitle %></label>'
                +'  <div class="col-sm-6">'
                +'    <textarea id="<%= textareaId %>" type="<%= textareaType %>" class="form-control" placeholder="<%= placeholder %>" value="<%= textareaValue %>">'
                +'  </div>'
                +'</div>';
                return _.template(raw)(data);
        },
        render: function (data) {
                    $(this.el).html(this.template(this.param));
             return this;
        },
    });


})();

