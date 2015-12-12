/*global Backbone, NisMVC:true */

var Nis = Nis || {};

(function () {
    'use strict';

    Nis.UiInfo.Concept = {
        columns:[
            {
                dbid: "id",
                label: "No",
            },
            {
                dbid: "conceptId",
                label: "Concept ID",
            },        
            {
                dbid: "displayName",
                label: "Name",
            },        
            {
                dbid: "description",
                label: "Description",
            },        
            {
                dbid: "code",
                label: "Code",
            },        
        ], // end of columns
        allButtons:[
            {
                buttonId:"add",
                buttonClass:"btn btn-default",
                buttonTitle:"Add",
                icon:"print",                    
            },
            {
                buttonId:"modify",
                buttonClass:"btn btn-default",
                buttonTitle:"Modify",
            },
            {
                buttonId:"delete",
                buttonClass:"btn btn-default",
                buttonTitle:"Delete",
            },
            {
                buttonId:"submit",
                buttonClass:"btn btn-default",
                buttonTitle:"Submit",
            },
            {
                buttonId:"cancel",
                buttonClass:"btn btn-default",
                buttonTitle:"Cancel",
            },
        ],
        conceptSetButtons:[
            {
                data: {
                    buttonId:"add",
                    buttonClass:"btn btn-default",
                    buttonTitle:"Add",
                    icon:"print",                    
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
        modifyButtons:[
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
        ], // end of modifyButtons


    }; // end of Nis.UiInfo.Concept


})();
