/*global Backbone, NisMVC:true */

var Nis = Nis || {};

(function () {
    'use strict';

    Nis.Model.NoticeModalFormUi = Nis.UiInfo.extend ({
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
                            title:'공지사항 작성',
                            subTitle:'',
                        },
                    },
                    formItems:this.getItems(),
                    // formFooter:{
                    //     tagName:'div',
                    //     className:'col-sm-8',
                    //     renderOnInit:true,
                    //     regions: {
                    //         add : '#adduser'
                    //     },
                    //     data:{
                    //         list_menu:'list_menu',
                    //         add_menu:'add_menu',
                    //         adduser:{
                    //             href:'#add',
                    //         }
                    //     },
                        // buttons:[
                        //     {
                        //         data: {
                        //             buttonId:"saveNotice",
                        //             buttonClass:"btn btn-info",
                        //             buttonTitle:"등록",
                        //         },
                        //         raw : '<button id="{{buttonId}}" type="button" class="{{buttonClass}}"> {{buttonTitle}} </button>',
                        //     },
                        //     {
                        //         data: {
                        //             buttonId:"cancelNotice",
                        //             buttonClass:"btn btn-info cancel",
                        //             buttonTitle:"취소",
                        //         },
                        //         raw : '<button id="{{buttonId}}" type="button" class="{{buttonClass}}"> {{buttonTitle}} </button>',
                        //     },
                        //     {
                        //         raw : '<div id="form-footer" class="form-group"> </div>',                                
                        //     },
                        // ],
                    // },
            };

            ret.raw =
                '<article class="container">'
                + '<div id="form-title" class="page-header"></div>'
                + ' <form id="form-content" class="form-horizontal">'
                +       '<div>'
                +           '<label for="id" class="col-sm-1 control-label">제목</label>'
                +           '<div class="col-sm-11"><input id="noticeTitle" type="text" class="form-control"></div>'    
                +       '</div>'
                +       '<div>'
                +           '<label for="id" class="col-sm-1 control-label">내용</label>'
                +           '<div class="col-sm-11"><input id="noticeContents" type="textarea" class="form-control ccmTextArea"></div>'    
                +       '</div>'
                + ' </form>'
                + '</article>';
            ret.formTitle.raw = '<h1>{{title}} <small> {{subTitle}} </small></h1>';
            // ret.formFooter.raw =
            //     '  <div id="button-list" class="form-group" style="float:right">'
            //     +' </div>';   

          
                return ret;

        },  //getFormInfo

    });  //Nis.Model.AppInfo


})();
