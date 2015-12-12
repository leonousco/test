/*global Backbone, NisMVC:true */

var Nis = Nis || {};

(function () {
    'use strict';

    Nis.Model.CCMVersionInfoFormUi = Nis.UiInfo.extend ({
        initialize: function (options) {
            console.log("initialize: options:", options);
            this.setItems(this.getItems());
        },
        getInfo:function(options) {
            var ret = {
                    currentPage:'#ccmVersionControl',
                    tagName:'div',
                    className:'form-group',
                    formTitle:{
                        tagName:'h1',
                        className:null,
                        renderOnInit:true,
                        replaceToParent:false,
                        data:{
                            title:'CCM 버전 정보',
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
                                    buttonId:"ccmVersionRegister",
                                    buttonClass:"btn btn-info",
                                    buttonTitle:"등록",
                                },
                                raw : '<button id="{{buttonId}}" type="button" class="{{buttonClass}}"> {{buttonTitle}} </button>',
                            },
                            {
                                data: {
                                    buttonId:"list",
                                    buttonClass:"btn btn-info",
                                    buttonTitle:"목록",
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
                +       '<div id="<%= formGroupId %>" class="form-group">'
                +           '<div class="col-sm-1"><label class="col-sm-1 control-label"></label></div>'
                +           '<label for="version" class="col-sm-3 control-label">버전</label>'
                +           '<div class="col-sm-7"><input id="version" type="text" class="form-control"></div>'           
                +           '<div class="col-sm-1"><label id="versionCheck" class="col-sm-1 control-label"></label></div>'
                +      '</div>'
                +       '<div id="<%= formGroupId %>" class="form-group">'
                +           '<div class="col-sm-1"><label class="col-sm-1 control-label"></label></div>'
                +           '<label for="organization" class="col-sm-3 control-label">기관</label>'
                +           '<div class="col-sm-7"><input id="organization" type="text" class="form-control"></div>'           
                +           '<div class="col-sm-1"><label id="organizationCheck" class="col-sm-1 control-label"></label></div>'
                +      '</div>'
                +       '<div id="<%= formGroupId %>" class="form-group">'
                +           '<div class="col-sm-1"><label class="col-sm-1 control-label"></label></div>'
                +           '<label for="userCreated" class="col-sm-3 control-label">작성자</label>'
                +           '<div class="col-sm-7"><input id="userCreated" type="text" class="form-control"></div>'           
                +           '<div class="col-sm-1"><label id="userCreatedCheck" class="col-sm-1 control-label"></label></div>'
                +      '</div>'
                +       '<div id="<%= formGroupId %>" class="form-group">'
                +           '<div class="col-sm-1"><label class="col-sm-1 control-label"></label></div>'
                +           '<label for="distributedBy" class="col-sm-3 control-label">distributedBy</label>'
                +           '<div class="col-sm-7"><input id="distributedBy" type="text" class="form-control"></div>'           
                +           '<div class="col-sm-1"><label id="distributedByCheck" class="col-sm-1 control-label"></label></div>'
                +      '</div>'
                +       '<div id="<%= formGroupId %>" class="form-group">'
                +           '<div class="col-sm-1"><label class="col-sm-1 control-label"></label></div>'
                +           '<label for="managedBy" class="col-sm-3 control-label">managedBy</label>'
                +           '<div class="col-sm-7"><input id="managedBy" type="text" class="form-control"></div>'           
                +           '<div class="col-sm-1"><label id="managedByCheck" class="col-sm-1 control-label"></label></div>'
                +      '</div>'
                +       '<div id="<%= formGroupId %>" class="form-group">'
                +           '<div class="col-sm-1"><label class="col-sm-1 control-label"></label></div>'
                +           '<label for="dateCreated" class="col-sm-3 control-label">등록 일자</label>'
                +           '<div class="col-sm-7"><input id="dateCreated" type="text" class="form-control"></div>'           
                +           '<div class="col-sm-1"><label id="dateCreatedCheck" class="col-sm-1 control-label"></label></div>'
                +      '</div>'
                +       '<div id="<%= formGroupId %>" class="form-group">'
                +           '<div class="col-sm-1"><label class="col-sm-1 control-label"></label></div>'
                +           '<label for="purposeOfModel" class="col-sm-3 control-label">모델 목적</label>'
                +           '<div class="col-sm-7"><input id="purposeOfModel" type="text" class="form-control"></div>'           
                +           '<div class="col-sm-1"><label id="purposeOfModelCheck" class="col-sm-1 control-label"></label></div>'
                +      '</div>'
                +       '<div id="<%= formGroupId %>" class="form-group">'
                +           '<div class="col-sm-1"><label class="col-sm-1 control-label"></label></div>'
                +           '<label for="sourceOfReference" class="col-sm-3 control-label">참고문헌</label>'
                +           '<div class="col-sm-7"><input id="sourceOfReference" type="text" class="form-control"></div>'           
                +           '<div class="col-sm-1"><label id="sourceOfReferenceCheck" class="col-sm-1 control-label"></label></div>'
                +      '</div>'
                +       '<div id="<%= formGroupId %>" class="form-group">'
                +           '<div class="col-sm-1"><label class="col-sm-1 control-label"></label></div>'
                +           '<label for="relatedIssues" class="col-sm-3 control-label">참고사항</label>'
                +           '<div class="col-sm-7"><input id="relatedIssues" type="text" class="form-control"></div>'           
                +           '<div class="col-sm-1"><label id="relatedIssuesCheck" class="col-sm-1 control-label"></label></div>'
                +      '</div>'
                +       '<div id="<%= formGroupId %>" class="form-group">'
                +           '<div class="col-sm-1"><label class="col-sm-1 control-label"></label></div>'
                +           '<label for="reviewer" class="col-sm-3 control-label">검토</label>'
                +           '<div class="col-sm-7"><input id="reviewer" type="text" class="form-control"></div>'           
                +           '<div class="col-sm-1"><label id="reviewerCheck" class="col-sm-1 control-label"></label></div>'
                +      '</div>'
                +       '<div id="<%= formGroupId %>" class="form-group">'
                +           '<div class="col-sm-1"><label class="col-sm-1 control-label"></label></div>'
                +           '<label for="modificationInfomation" class="col-sm-3 control-label">수정사항</label>'
                +           '<div class="col-sm-7"><input id="modificationInfomation" type="textarea" class="form-control ccmTextArea"></div>'           
                +           '<div class="col-sm-1"><label id="modificationInfomationCheck" class="col-sm-1 control-label"></label></div>'
                +      '</div>'
                +       '<div id="<%= formGroupId %>" class="form-group">'
                +           '<div class="col-sm-1"><label class="col-sm-1 control-label"></label></div>'
                +           '<label for="modificcationReason" class="col-sm-3 control-label">수정원인</label>'
                +           '<div class="col-sm-7"><input id="modificcationReason" type="textarea" class="form-control ccmTextArea"></div>'           
                +           '<div class="col-sm-1"><label id="modificcationReasonCheck" class="col-sm-1 control-label"></label></div>'
                +      '</div>'
                +       '<div id="<%= formGroupId %>" class="form-group">'
                +           '<div class="col-sm-1"><label class="col-sm-1 control-label"></label></div>'
                +           '<label for="etc" class="col-sm-3 control-label">기타</label>'
                +           '<div class="col-sm-7"><input id="etc" type="text" class="form-control"></div>'           
                +           '<div class="col-sm-1"><label id="etcCheck" class="col-sm-1 control-label"></label></div>'
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
