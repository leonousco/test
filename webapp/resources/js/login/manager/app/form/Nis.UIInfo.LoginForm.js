/*global Backbone, NisMVC:true */

var Nis = Nis || {};

(function () {
    'use strict';

    Nis.Model.LoginFormUi = Nis.UiInfo.extend ({
        initialize: function (options) {
            console.log("initialize: options:", options);
            this.setItems(this.getItems());
        },
        getInfo:function(options) {
            var ret = {
                    tagName:'div',
                    className:'form-group',
                    formTitle:{
                        tagName:'h1',
                        className:null,
                        renderOnInit:true,
                        replaceToParent:false,
                        data:{
                            title:'Admin Page Login',
                            //subTitle:'ApiKey 수정',
                        },
                    },
                    //formItems:this.getItems(),
                    formFooter:{
                        tagName:'div',
                        className:'col-sm-8',
                        renderOnInit:true,
                        regions: {
                            add : '#adduser'
                        },
                        data:{
                            list_menu:'list_menu',
                            add_menu:'add_menu',
                            adduser:{
                                href:'#add',
                            }
                        },
                        buttons:[
                            {
                                data: {
                                    buttonId:"login",
                                    buttonClass:"btn btn-info",
                                    buttonTitle:"로그인",
                                },
                                raw : '<button id="{{buttonId}}" type="button" class="{{buttonClass}}"> {{buttonTitle}} </button>',
                            },           
                            {
                                raw : '<div id="form-footer" class="form-group"> </div>',                                
                            },
                        ],
                    },
            };

            ret.raw =
                '<article class="container">'
                + '<div id="form-title" class="page-header"></div>'
                + ' <form id="form-content" class="form-horizontal">'
                +     '<div id="<%= formGroupId %>" class="form-group">'
                +         '<label for="clientId" class="col-sm-2 control-label">아이디</label>'
                +           '<div class="col-sm-3"><input id="username" type="text" class="form-control"  ></div>'                   
                +      '</div>'
                +     '<div id="<%= formGroupId %>" class="form-group">'
                +         '<label for="clientId" class="col-sm-2 control-label">비밀번호</label>'
                +           '<div class="col-sm-3"><input id="password" type="password" class="form-control"  ></div>'                   
                +      '</div>'                
                + '     <div id="form-footer" class="form-group"> </div>'
                + ' </from>'
                + '</article>';
            ret.formTitle.raw = '<h1>{{title}} <small> {{subTitle}} </small></h1>';
            ret.formFooter.raw =
                '  <div id="button-list" class="form-group" style="float:right">'
                +' </div>';                
                return ret;

        },  //getFormInfo

    });  //Nis.Model.AppInfo


})();
