/*global Backbone, NisMVC:true */

var Nis = Nis || {};

(function () {
    'use strict';

    Nis.Model.UserAddFormUi = Nis.UiInfo.extend ({
        initialize: function (options) {
            console.log("initialize: options:", options);
            this.setItems(this.getItems());
        },
        getInfo:function(options) {
            var ret = {
                    currentPage:'#userInfo',
                    tagName:'div',
                    className:'form-group',
                    formTitle:{
                        tagName:'h1',
                        className:null,
                        renderOnInit:true,
                        replaceToParent:false,
                        data:{
                            title:'User 추가',
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
                                    buttonId:"saveUser",
                                    buttonClass:"btn btn-info",
                                    buttonTitle:"추가",
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
                +         '<label for="id" class="col-sm-1 control-label">*아이디</label>'
                +           '<div class="col-sm-2"><input id="id" type="text" class="form-control" placeholder="ID"></div>'
                +           '<div class="col-sm-1"><button id="check" type="button" class="btn btn-info">중복체크</button></div>'            
                +           '<div class="col-sm-5"><label id="idCheck" class="col-sm-5 control-label"></label></div>'
                +      '</div>'
                +     '<div id="<%= formGroupId %>" class="form-group">'
                +         '<label for="userName" class="col-sm-1 control-label">*이름</label>'
                +           '<div class="col-sm-4"><input id="userName" type="text" class="form-control" placeholder="이름"></div>'                
                +           '<div class="col-sm-5"><label id="userNameCheck" class="col-sm-5 control-label"></label></div>'
                +      '</div>'
                +     '<div id="<%= formGroupId %>" class="form-group">'
                +         '<label for="password" class="col-sm-1 control-label">*비밀번호</label>'
                +           '<div class="col-sm-4"><input id="passWord" type="password" class="form-control" placeholder="비밀번호"></div>'                
                +           '<div class="col-sm-5"><label id="passWordCheck" class="col-sm-5 control-label"></label></div>'
                +      '</div>'
                +     '<div id="<%= formGroupId %>" class="form-group">'
                +         '<label for="phoneNumber" class="col-sm-1 control-label">*휴대폰번호</label> ' 
                +           '<div class="col-sm-2"><select id= "phoneNumber1" name="phoneNumber" class="form-control"><option value="010" selected>010</option><option value="011">011</option></select></div>'                
                +           '<div style="width:1%;float: left;" >-</div>'
                +           '<div class="col-sm-1"><input id="phoneNumber2" type="text" class="form-control" maxlength="4" size="4"></div>'
                +           '<div style="width:1%;float: left;" >-</div>'                
                +           '<div class="col-sm-1"><input id="phoneNumber3" type="text" class="form-control" maxlength="4" size="4"></div>'                
                +           '<div class="col-sm-4"><label id="phoneNumberCheck" class="col-sm-5 control-label"></label></div>'
                +      '</div>'
                +     '<div id="<%= formGroupId %>" class="form-group">'
                +         '<label for="email" class="col-sm-1 control-label">*E-MAIL</label>'
                +           '<div class="col-sm-2"><input id="email1" type="text" class="form-control" placeholder="EMAIL"></div>'
                +           '<div style="width:1%;float: left;" >@</div>'                
                +           '<div class="col-sm-2"><input id="email2" type="text" class="form-control" placeholder="EMAIL"></div>'                
                +           '<div class="col-sm-2">'
                +                  '<select id = "selectEmail" name="selectEmail" class="form-control">'
                +                  '<option value="">직접입력</option><option value="naver.com">naver.com</option><option value="gmail.com">gmail.com</option>'
                +                  '<option value="hanmail.net">hanmail.net</option><option value="nate.com">nate.com</option></select>'
                +           '</div>'                
                +           '<div class="col-sm-4"><label id="eMailCheck" class="col-sm-5 control-label"></label></div>'
                +      '</div>'
                +     '<div id="<%= formGroupId %>" class="form-group">'
                +         '<label for="address" class="col-sm-1 control-label">*주소</label>'
                +           '<div class="col-sm-2"><input id="postalCode" type="text" class="form-control" placeholder="우편번호" readonly></div>'
                +           '<div class="col-sm-2"><button id ="addressInput" type="button" class="btn btn-info">주소찾기</button></div>'
                +           '<div class="col-sm-5"><label id="postalCodeCheck" class="col-sm-5 control-label"></label></div>'                     
                +      '</div>'
                +     '<div id="<%= formGroupId %>" class="form-group">'
                +         '<label for="address2" class="col-sm-1 control-label"></label>'
                +           '<div class="col-sm-6"><input id="city" type="text" class="form-control" placeholder="주소" readonly></div>'                
                +      '</div>'
                +     '<div id="<%= formGroupId %>" class="form-group">'
                +         '<label for="address3" class="col-sm-1 control-label"></label>'
                +           '<div class="col-sm-6"><input id="address" type="text" class="form-control" placeholder="상세주소"></div>'                
                +      '</div>'  
                +     '<div id="<%= formGroupId %>" class="form-group">'
                +         '<label for="enabled" class="col-sm-1 control-label">권한</label>'
                +           '<div class="col-sm-2"><select id = "auth" name="auth" class="form-control"><option value="0" selected>개발자</option><option value="1">전문가</option></select></div>'                
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
