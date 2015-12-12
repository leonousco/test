/*global Backbone, NisMVC:true */

var Nis = Nis || {};

(function () {
    'use strict';

    Nis.UiInfo.Concept = {
        // ccmManagementColumns:[
        //     // {
        //     //     label: '<input modelid="{{id}}" type="checkbox" name="board_checkbox" value="checked"/>',
        //     //     cell: "checkbox",
        //     // },
        //     {
        //         dbid: "no",
        //         label: "번호",
        //     },
        //     {
        //         dbid: "id",
        //         label: "CCM 명",
        //     },        
        //     {
        //         dbid: "userName",
        //         label: "name",
        //     },        
        //     {
        //         dbid: "phoneNumber",
        //         label: "버전",
        //     },        
        //     {
        //         dbid: "no",
        //         label: "리뷰",
        //     },        
        //     {
        //         dbid: "no",
        //         label: "반대",
        //     },        
        //     {
        //         dbid: "roleName",
        //         label: "공개여부",
        //     },        
        //     {
        //         dbid: "versionManagement",
        //         label: "버전관리",
        //         content: '<button modelid="{{userId}}" type="type_button" class="btn btn-default">Version Control</button>',
        //         cell: "button",
        //     },        
        // ], // end of columns
        // ccmVersionControlColumns:[
        //     // {
        //     //     label: '<input modelid="{{id}}" type="checkbox" name="board_checkbox" value="checked"/>',
        //     //     cell: "checkbox",
        //     // },
        //     {
        //         dbid: "no",
        //         label: "버전",
        //     },
        //     {
        //         dbid: "phoneNumber",
        //         label: "생성일자",
        //     },       
        //     {
        //         dbid: "id",
        //         label: "수정 정보",
        //     },       
        //     {
        //         dbid: "acceptVersion",
        //         label: "승인",
        //         content: '<button spec="accept" type="type_button" class="btn btn-default">버전 승인</button>',
        //         cell: "button",
        //     },        
        //     {
        //         dbid: "rejectVersion",
        //         label: "거부",
        //         content: '<button spec="reject" type="type_button" class="btn btn-default">버전 거부</button>',
        //         cell: "button",
        //     },            
        // ], // end of columns
        conceptSetButtons:[
            {
                data: {
                    buttonId:"add",
                    buttonClass:"btn btn-default",
                    buttonTitle:"Add",
                },
            },
            {
                data: {
                    buttonId:"modify",
                    buttonClass:"btn btn-default",
                    buttonTitle:"Modify",
                },
            },
            {
                data: {
                    buttonId:"delete",
                    buttonClass:"btn btn-default",
                    buttonTitle:"Delete",
                },
            },
        ], // end of conceptSetButtons
        submitButtons:[
            {
                data: {
                    buttonId:"submit",
                    buttonClass:"btn btn-default",
                    buttonTitle:"Submit",
                },
            },
            {
                data: {
                    buttonId:"cancel",
                    buttonClass:"btn btn-default",
                    buttonTitle:"Cancel",
                },
            },
        ], // end of conceptSetButtons


    }; // end of Nis.UiInfo.Concept


})();
