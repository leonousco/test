

(function () {
    'use strict';

    Nis.View.CCMPreview = Uic.LayoutView.extend({
        entityMap:new Nis.Map(),
        qualifierMap:new Nis.Map(),
        modifierMap:new Nis.Map(),
        valueSetMap:new Nis.Map(),
        regions: {
            accordionView: "#accordionView",
        },        
        initialize: function(options) {
            console.log('initialize:', options);
            Uic.LayoutView.prototype.initialize.call(this, options);
            var model = new Nis.Model.CCMObj.MultiModelLoad();
            var options = {
                modelId:options.model.id,
                success:this.onSuccessMultiModel.bind(this),
                error:this.onErrorMultiModel.bind(this),
            };
            model.getByModelId(options);
        },
        onSuccessMultiModel:function(resp){
            console.log('onSuccessMultModel:', resp);
            var model = resp.body;
            this.showModel(model);
            this.trigger('onSuccessMultiModel', model);
        },
        onErrorMultiModel:function(resp){
            console.log('onErrorMultModel:', resp);
        },
        makeEntityView:function(attributes){
            var view = new Uic.List({
                tagName:'ul',
                itemRaw:'<li>{{title}} : {{text}}</li>',
                items:[
                {
                    title: 'Code',
                    text:attributes.entityConceptId,
                },
                {
                    title: 'CodeSystemName',
                    text:attributes.entityMappingCodeSystem,
                },
                {
                    title: 'DisplayName',
                    text:attributes.entitySnomedTerm,
                },
                ],
            });
            return view;
        },
        makeQualifierView:function(attributes){
            var view = new Uic.List({
                tagName:'ul',
                itemRaw:'<li>{{title}} : {{text}}</li>',
                items:[
                {
                    title: 'Id',
                    text:attributes.qualifierId,
                },
                {
                    title: 'Cardinality',
                    text:attributes.qualifierCardinality,
                },
                {
                    title: 'ConceptId',
                    text:attributes.qualifierConceptId,
                },
                {                                                   
                    title: 'MappingCodeSystem',
                    text:attributes.qualifierMappingCodeSystem,
                },
                {
                    title: 'Term',
                    text:attributes.qualifierSnomedTerm,
                },
                ],
            });
            return view;
        },
        makeValueSetView:function(attributes){
            var view = new Uic.List({
                tagName:'ul',
                itemRaw:'<li>{{title}} : {{text}}</li>',
                items:[
                {
                    title: 'Id',
                    text:attributes.valueSetId,
                },
                {
                    title: 'Cardinality',
                    text:attributes.valueSetCardinality,
                },
                {
                    title: 'ConceptId',
                    text:attributes.valueSetConceptId,
                },
                {                                                   
                    title: 'MappingCodeSystem',
                    text:attributes.valueSetMappingCodeSystem,
                },
                {
                    title: 'Term',
                    text:attributes.valueSetSnomedTerm,
                },
                ],
            });
            return view;
        },
        showValueTable:function(attributes) {
            var view = new Uic.List({
                tagName:'ul',
                itemRaw:'<li>{{title}} : {{text}}</li>',
                items:[
                {
                    title:'Value',
                    text:attributes.value,
                },
                {
                    title:'Value ConceptId',
                    text:attributes.valueConceptId,
                },
                {
                    title:'Value MappingCodeSystem',
                    text:attributes.valueMappingCodeSystem,
                },
                {
                    title:'Value SnomedTerm',
                    text:attributes.valueSnomedTerm,
                },
                ],
            });
            return view;
        },
        showModel:function(model) {
            var view = new Uic.AccordionPanelView({id:model.id});
            this.accordionView.show(view);

            var e = model.entity;
            var q = model.qualifiers;
            var v = model.value;

            var entity = view.addItem({
                title:'Entity : ' + e.entity,
                body:this.makeEntityView(e),
            });
            for (var i=0; i<q.length; i++){
                var qualifiers = view.addItem({
                    title:'Qualifier : ' + q[i].qualifier,
                    body:this.makeQualifierView(q[i]),    
                });
                for (var j=i; j<q[i].valueSets.length; j++){
                    var valueSets = view.addItem({
                        title:'ValueSet : ' + q[i].valueSets[j].valueSet,
                        body:this.makeValueSetView(q[i].valueSets[j]),    
                    });
                    for (var k=j; k<q[i].valueSets[j].values.length; k++){
                        var values = view.addItem({
                            title:'Value : ' + q[i].valueSets[j].values[k].value,
                            body:this.showValueTable(q[i].valueSets[j].values[k]),    
                        });
                        valueSets.setBodyView(values);
                    }
                    qualifiers.setBodyView(valueSets);
                }
                entity.setBodyView(qualifiers);
            }
        },
        getDefaultTemplate:function(options) {
            var raw = ''
            +'<div id="accordionView">'
            +'</div>';
            return raw;
        },


    });

})();

