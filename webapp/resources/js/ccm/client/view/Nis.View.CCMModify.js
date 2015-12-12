

(function () {
    'use strict';

    Nis.View.CCMModify = Uic.LayoutView.extend({
        initialize: function(options) {
            console.log('initialize:', options);
            Uic.LayoutView.prototype.initialize.call(this, options);
            var model = new Nis.Model.CCMObj.MultiModelLoad();
            var options = {
                modelId:options.model.id,
                success:this.onSuccessCCMModi.bind(this),
                error:this.onErrorCCMModi.bind(this),
            };
            model.getByModelId(options);
        },
        onSuccessCCMModi:function(resp) {
            console.log('onSuccessCCMModi:', resp);
            var model = resp.body;
            this.showModify(model);
        },
        onErrorCCMModi:function(resp) {
            console.log('onErrorCCMModi:', resp);
        },
        showModify:function(model) {
            console.log("showModify : ", model);

            var util = new Nis.UiInfo.ItemUtil({items:Nis.Model.CCMModify.columns});
 /*           var formItems = util.select(['dateCreated', 'userCreated','modelName','modelType', 'processType', 'valueRepresentaion', 'clinicalDomain','entity','entityConceptId','entityMappingCodeSystem','entitySnomedTerm','qualifier','qualifierConceptId','qualifierMappingCodeSystem','qualifierSnomedTerm','valueSet','valueSetCardinality','valueSetDataType','valueSetConceptId','valueSetMappingCodeSystem','valueSetSnomedTerm', 'value', 'valueConceptId', 'valueMappingCodeSystem', 'valueSnomedTerm']);*/

            var formItems = util.select(['dateCreated', 'userCreated','modelName','modelType','processType','valueRepresentaion','clinicalDomain']);
            var modelForm = new Uic.FormView({ items:formItems});

            /*formItems = util.select(['entity', 'entityConceptId', 'entityMappingCodeSystem','entitySnomedTerm']);
            var entityForm = new Uic.FormView({ items:formItems});

            formItems = util.select(['qualifier','qualifierConceptId', 'qualifierMappingCodeSystem','qualifierSnomedTerm']);
            var qualifierForm = new Uic.FormView({ items:formItems});

            formItems = util.select(['valueSet','valueSetCardinality','valueSetDataType','valueSetConceptId','valueSetMappingCodeSystem','valueSetSnomedTerm']);
            var valueSetForm = new Uic.FormView({ items:formItems});

            formItems = util.select(['value', 'valueConceptId', 'valueMappingCodeSystem', 'valueSnomedTerm']);
            var valueForm = new Uic.FormView({ items:formItems});
*/
            var formLayout = new Uic.FormLayout();
            formLayout.setGroups({
                groups:[
                    {
                        title:'Model',
                        body:modelForm,
                        collapse:false,
                    },
                   /* {
                        title:'Entity',
                        body:entityForm,
                    },
                    {
                        title:'Qualifier',
                        body:qualifierForm,
                    },
                    {
                        title:'ValueSet',
                        body:valueSetForm,
                    },
                    {
                        title:'Value',
                        body:valueForm,
                    },*/
                ],
            });
            formLayout.setTitle("model");
            return formLayout;
        },
        saveModify:function(){
            var model = new Nis.Model.CCMModify();
            var option = {
                modelId:options.model.id,
                success:this.onSuccessCCMModi.bind(this),
                error:this.onErrorCCMModi.bind(this),
            };
            model.getByModelId(option);
        },
        onErrorModelIndex:function(resp){
            console.log("onSuccessModelIndex:", resp);
        },
    });

})();

