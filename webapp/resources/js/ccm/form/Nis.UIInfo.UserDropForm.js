/*global Backbone, NisMVC:true */

var Nis = Nis || {};

(function () {
    'use strict';

    Nis.Model.UserDropFormUi = Nis.UiInfo.extend ({
        initialize: function (options) {
            console.log("initialize: options:", options);
            this.setItems(this.getItems());
        },
        getInfo:function(options) {
            var ret = {
                    currentPage:'#requestDrop',
                    tagName:'div',
                    className:'form-group',
                    formTitle:{
                        tagName:'h1',
                        className:null,
                        renderOnInit:true,
                        replaceToParent:false,
                        data:{
                            title:'탈퇴 요청',
                            subTitle:'',
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
                                    buttonId:"dropUser",
                                    buttonClass:"btn btn-info",
                                    buttonTitle:"탈퇴",
                                },
                                raw : '<button id="{{buttonId}}" type="button" class="{{buttonClass}}"> {{buttonTitle}} </button>',
                            },
                            {
                                data: {
                                    buttonId:"cancel",
                                    buttonClass:"btn btn-info cancel",
                                    buttonTitle:"취소",
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
                +         '<label for="id" class="col-sm-1 control-label">아이디</label>'
                +           '<div class="col-sm-2"><input id="id" type="text" class="form-control" readonly></div>'           
                +           '<div class="col-sm-5"><label id="idCheck" class="col-sm-5 control-label"></label></div>'
                +      '</div>'
                +     '<div id="<%= formGroupId %>" class="form-group">'
                +         '<label for="userName" class="col-sm-1 control-label">이름</label>'
                +           '<div class="col-sm-4"><input id="userName" type="text" class="form-control"></div>'                
                +           '<div class="col-sm-5"><label id="userNameCheck" class="col-sm-5 control-label" readonly></input></div>'
                +      '</div>'
                +     '<div id="<%= formGroupId %>" class="form-group">'
                +         '<label for="password" class="col-sm-1 control-label">비밀번호</label>'
                +           '<div class="col-sm-4"><input id="passWord" type="password" class="form-control"></div>'                
                +           '<div class="col-sm-5"><label id="passWordCheck" class="col-sm-5 control-label" readonly></input></div>'
                +      '</div>'
                +     '<div id="<%= formGroupId %>" class="form-group">'
                +         '<label for="phoneNumber" class="col-sm-1 control-label">휴대폰번호</label> ' 
                +           '<div class="col-sm-2"><input id= "phoneNumber1" name="phoneNumber" class="form-control" readonly></input></div>'                
                +           '<div style="width:1%;float: left;" >-</div>'
                +           '<div class="col-sm-2"><input id="phoneNumber2" type="text" class="form-control" maxlength="4" size="4" readonly></div>'
                +           '<div style="width:1%;float: left;" >-</div>'                
                +           '<div class="col-sm-2"><input id="phoneNumber3" type="text" class="form-control" maxlength="4" size="4" readonly></div>'                
                +           '<div class="col-sm-4"><label id="phoneNumberCheck" class="col-sm-5 control-label"></label></div>'
                +      '</div>'
                +     '<div id="<%= formGroupId %>" class="form-group">'
                +         '<label for="email" class="col-sm-1 control-label">E-MAIL</label>'
                +           '<div class="col-sm-2"><input id="email1" type="text" class="form-control" readonly></div>'
                +           '<div style="width:1%;float: left;" >@</div>'                
                +           '<div class="col-sm-2"><input id="email2" type="text" class="form-control" readonly></div>'         
                +           '<div class="col-sm-4"><label id="eMailCheck" class="col-sm-5 control-label"></label></div>'
                +      '</div>'
                +     '<div id="<%= formGroupId %>" class="form-group">'
                +         '<label for="address" class="col-sm-1 control-label">주소</label>'
                +           '<div class="col-sm-2"><input id="postalCode" type="text" class="form-control" readonly></div>'
                +           '<div class="col-sm-5"><label id="postalCodeCheck" class="col-sm-5 control-label"></label></div>'                     
                +      '</div>'
                +     '<div id="<%= formGroupId %>" class="form-group">'
                +         '<label for="address2" class="col-sm-1 control-label"></label>'
                +           '<div class="col-sm-6"><input id="city" type="text" class="form-control" readonly></div>'                
                +      '</div>'
                +     '<div id="<%= formGroupId %>" class="form-group">'
                +         '<label for="address3" class="col-sm-1 control-label"></label>'
                +           '<div class="col-sm-6"><input id="address" type="text" class="form-control" readonly></div>'                
                +      '</div>'  
                +     '<div id="<%= formGroupId %>" class="form-group">'
                +         '<label for="roleName" class="col-sm-1 control-label">권한</label>'
                +           '<div class="col-sm-2"><input id = "roleName" name="roleName" class="form-control" readonly></input></div>'                
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
