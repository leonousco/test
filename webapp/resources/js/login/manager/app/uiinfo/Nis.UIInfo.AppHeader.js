/*global Backbone, NisMVC:true */

var Nis = Nis || {};

(function () {
    'use strict';

    Nis.Model.AppHeaderUi = Nis.UiInfo.extend ({
        initialize: function (options) {
            console.log("initialize: options:", options);
        },
        getInfo:function(options) {
            var ret = {
                HeaderView:{
                    tagName:'div',
                    className:'navbar navbar-inverse navbar-fixed-top',
                    HeaderTitle:{
                        tagName:'div',
                        className:'navbar-header',
                        renderOnInit:true,
                        replaceToParent:true,
                        data:{
                            title:'Login Page',
                        },
                    },
                },
            };     
            ret.HeaderView.raw = 
                '<div class="container">'
                +'  <div class="navbar-header"> </div>'
                +'  <div class="navbar-collapse collapse"> </div>'
                +'</div>';          

            ret.HeaderView.HeaderTitle.raw = 
                '  <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">'
                +'    <span class="icon-bar"></span>'
                +'    <span class="icon-bar"></span>'
                +'    <span class="icon-bar"></span>'
                +'  </button>'
                +'  <a class="navbar-brand" href="#"> {{title}} </a>';

            return ret;
        },
    });
})();
