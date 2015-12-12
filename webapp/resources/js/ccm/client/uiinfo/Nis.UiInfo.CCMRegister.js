/*global Backbone, NisMVC:true */

var Nis = Nis || {};

(function () {
    'use strict';

    Nis.UiInfo.CCMRegister = Nis.UiInfo.extend ({
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
                            title:'CCM Editor',
                        },
                    },
                    formItems:this.getItems(),
                    formFooter:{
                        tagName:'div',
                        className:'col-sm-8',
                        renderOnInit:true,
                        data:{
                            list_menu:'list_menu',
                            add_menu:'add_menu',
                        },
                        buttons:[
                            {
                                data: {
                                    buttonId:"save",
                                    buttonClass:"btn btn-default",
                                    buttonTitle:"저장",
                                },
                                raw : '<button id="{{buttonId}}" type="button" class="{{buttonClass}}"> {{buttonTitle}} </button>',
                            },
                            {
                                data: {
                                    buttonId:"cancel",
                                    buttonClass:"btn btn-danger",
                                    buttonTitle:"취소",
                                },
                                raw : '<button id="{{buttonId}}" type="button" class="{{buttonClass}}"> {{buttonTitle}} </button>',
                            },
                            {
                                data: {
                                    buttonId:"upload",
                                    buttonName:"upload",
                                    buttonClass:"file-loading",
                                },
                                raw : '<input id="{{buttonId}}" type="file" class="{{buttonClass}}">',
                            },
                            
                        ],
                    },
            };
            ret.raw =
                '<article class="container">'
                + '<div id="form-title" class="page-header"></div>'
                + ' <form id="form-content" class="form-horizontal">'
                //+ '     <div id="form-footer" class="form-group"> </div>'
                + ' </from>'
                + '</article>';
            ret.formTitle.raw = '<h1>{{title}}</h1>';
            ret.formFooter.raw =
                ' <div id="button-list", class="form-group">'
                +' </div>';
                return ret;

        },  //getFormInfo
        getItems:function() {
            var ret = [
                {
                    labelForName:"dateCreated",
                    labelTitle:"DateCreated",
                    inputId:"dateCreated",
                    dbid:"dateCreated",
                    inputType:"text",
                },
                {
                    labelForName:"userCreated",
                    labelTitle:"UserCreated",
                    inputId:"userCreated",
                    dbid:"userCreated",
                    inputType:"text",
                },
                {
                    labelForName:"modelName",
                    labelTitle:"ModelName",
                    inputId:"modelName",
                    dbid:"modelName",
                    inputType:"text",
                },
                {
                    labelForName:"modelType",
                    labelTitle:"ModelType",
                    inputId:"modelType",
                    dbid:"modelType",
                    inputType:"text",
                },
                {
                    labelForName:"processType",
                    labelTitle:"ProcessType",
                    inputId:"processType",
                    dbid:"processType",
                    inputType:"text",
                },
                {
                    labelForName:"valueRepresentaion",
                    labelTitle:"ValueRepresentaion",
                    inputId:"valueRepresentaion",
                    dbid:"valueRepresentaion",
                    inputType:"text",
                },
                {
                    labelForName:"clinicalDomain",
                    labelTitle:"ClinicalDomain",
                    inputId:"clinicalDomain",
                    dbid:"clinicalDomain",
                    inputType:"text",
                },
                {
                    labelForName:"entity",
                    labelTitle:"Entity",
                    inputId:"entity",
                    dbid:"entity",
                    inputType:"text",
                },
                {
                    labelForName:"entityConceptId",
                    labelTitle:"EntityConceptId",
                    inputId:"entityConceptId",
                    dbid : "entityConceptId",
                    inputType:"text",

                },
                {
                    labelForName:"entityMappingCodeSystem",
                    labelTitle:"EntityMappingCodeSystem",
                    inputId:"entityMappingCodeSystem",
                    dbid:"entityMappingCodeSystem",
                    inputType:"text",
                },
                {
                    labelForName:"displayName",
                    labelTitle:"EntitySnomedTerm",
                    inputId:"displayName",
                    dbid : "entitySnomedTerm",
                    inputType:"text",
                },     
                {
                    labelForName:"qualifier",
                    labelTitle:"Qualifier",
                    inputId:"qualifier",
                    dbid:"qualifier",
                    inputType:"text",
                }, 
                {
                    labelTitle:"QualifierCardinality",
                    inputId:"qCardinality",
                    dbid : "qualifierCardinality",
                    inputType:"text",
                },
                {
                    labelForName:"qualifierConceptId",
                    labelTitle:"QualifierConceptId",
                    inputId:"qualifierConceptId",
                    dbid : "qualifierConceptId",
                    inputType:"text",
                },
                {
                    labelForName:"QualifierMappingCodeSystem",
                    labelTitle:"QualifierMappingCodeSystem",
                    inputId:"QualifierMappingCodeSystem",
                    dbid:"qualifierMappingCodeSystem",
                    inputType:"text",
                },
                {
                    labelForName:"qualifierSnomedTerm",
                    labelTitle:"QualifierSnomedTerm",
                    inputId:"qualifierSnomedTerm",
                    dbid : "qualifierSnomedTerm",
                    inputType:"text",
                },     
                {
                    labelForName:"valueSet",
                    labelTitle:"ValueSet",
                    inputId:"valueSet",
                    dbid:"valueSet",
                    inputType:"text",
                },                    
                 {
                    labelForName:"valueSetCardinality",
                    labelTitle:"ValueSetCardinality",
                    inputId:"valueSetCardinality",
                    dbid : "valueSetCardinality",
                    inputType:"text",
                },
                 {
                    labelForName:"valueSetDataType",
                    labelTitle:"ValueSetDataType",
                    inputId:"valueSetDataType",
                    dbid : "valueSetDataType",
                    inputType:"text",
                },
                {
                    labelForName:"ValueSetConceptId",
                    labelTitle:"ValueSetConceptId",
                    inputId:"ValueSetConceptId",
                    dbid : "valueSetConceptId",
                    inputType:"text",
                },
                {
                    labelForName:"valueSetMappingCodeSystem",
                    labelTitle:"ValueSetMappingCodeSystem",
                    inputId:"valueSetMappingCodeSystem",
                    dbid:"valueSetMappingCodeSystem",
                    inputType:"text",
                },
                {
                    labelForName:"valueSetSnomedTerm",
                    labelTitle:"ValueSetSnomedTerm",
                    inputId:"valueSetSnomedTerm",
                    dbid : "valueSetSnomedTerm",
                    inputType:"text",
                },
                  {
                    labelForName:"value",
                    labelTitle:"Value",
                    inputId:"value",
                    dbid:"value",
                    inputType:"text",
                },                    
                {
                    labelTitle:"ValueConceptId",
                    inputId:"valueConceptId",
                    dbid : "valueConceptId",
                    inputType:"text",
                },
                {
                    labelForName:"valueMappingCodeSystem",
                    labelTitle:"ValueMappingCodeSystem",
                    inputId:"valueMappingCodeSystem",
                    dbid:"valueMappingCodeSystem",
                    inputType:"text",
                },
                {
                    labelForName:"valueSnomedTerm",
                    labelTitle:"ValueSnomedTerm",
                    inputId:"valueSnomedTerm",
                    dbid : "valueSnomedTerm",
                    inputType:"text",
                }, 
            ];
            return ret;
        }, //getItems
    });  //Nis.Model.AppInfo


})();
