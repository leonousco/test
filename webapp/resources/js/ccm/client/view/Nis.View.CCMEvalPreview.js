

(function () {
    'use strict';

    Nis.View.CCMEvalPreview = Uic.LayoutView.extend({
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
            this.showModel(options);
        },
        makeEntityView:function(model){
            var view = new Uic.List({
                tagName:'ul',
                itemRaw:'<li>{{title}} : {{text}}</li>',
                items:[
                {
                    title: 'EntityConceptId',
                    text:model.entityConceptId,
                },
                {
                    title: 'EntityMappingCodeSystem',
                    text:model.entityMappingCodeSystem,
                },
                {
                    title: 'EntitySnomedTerm',
                    text:model.entitySnomedTerm,
                },
                ],
            });
            return view;
        },
        makeQualifierView:function(model){
            var view = new Uic.List({
                tagName:'ul',
                itemRaw:'<li>{{title}} : {{text}}</li>',
                items:[
                {
                    title: 'Qualifier Cardinality',
                    text:model.qualifierCardinality,
                },
                {
                    title: 'Qualifier ConceptId',
                    text:model.qualifierConceptId,
                },
                {
                    title: 'Qualifier MappingCodeSystem',
                    text:model.qualifierMappingCodeSystem,
                },
                {
                    title: 'Qualifier SnomedTerm',
                    text:model.qualifierSnomedTerm,
                },
                ],
            });
            return view;
        },
        makeValueSetView:function(model) {
           var view = new Uic.List({
            tagName:'ul',
            itemRaw:'<li>{{title}} : {{text}}</li>',
            items:[
            {
                title: 'ValueSet Cardinality',
                text:model.valueSetCardinality,
            },
            {
                title: 'ValueSet DataType',
                text:model.valueSetDataType,
            },
            {
                title: 'ValueSet ConceptId',
                text:model.valueSetConceptId,
            },
            {
                title: 'ValueSet MappingCodeSystem',
                text:model.valueSetMappingCodeSystem,
            },
            ],
        });
           return view;
       },
       makeValueView:function(model) {
           var view = new Uic.List({
            tagName:'ul',
            itemRaw:'<li>{{title}} : {{text}}</li>',
            items:[
            {
                title: 'Value ConceptId',
                text:model.valueConceptId,
            },
            {
                title: 'Value MappingCodeSystem',
                text:model.valueMappingCodeSystem,
            },
            {
                title: 'Value SnomedTerm',
                text:model.valueSnomedTerm,
            },
            ],
        });
           return view;
       },
       showModel:function(options) {
        var view = new Uic.AccordionPanelView({id:options.model.id});
        this.accordionView.show(view);
        var entity = view.addItem({
            title:'Entity : ' + options.model.entity.entity,
            body:this.makeEntityView(options.model.entity),
        });

        for (var i=0; i<options.model.qualifiers.length; i++) {
            var qual = view.addItem({
                title:'Qualifier : ' + options.model.qualifiers[i].qualifier,
                body:this.makeQualifierView(options.model.qualifiers[i]),
            });

            for (var j=i; j<options.model.qualifiers[i].valueSets.length; j++) {
                var vs = view.addItem({
                    title:'ValueSet : ' + options.model.qualifiers[i].valueSets[j].valueSet,
                    body:this.makeValueSetView(options.model.qualifiers[i].valueSets[j]),
                });

                for (var k=j; k<options.model.qualifiers[i].valueSets[j].values.length; k++) {
                    var v = view.addItem({
                        title:'Value : ' + options.model.qualifiers[i].valueSets[j].values[k].value,
                        body:this.makeValueView(options.model.qualifiers[i].valueSets[j].values[k]),
                    });
                }
                vs.setBodyView(v);
            }
            qual.setBodyView(vs);
        }
        entity.setBodyView(qual);   
    },
    onErrorModelIndex:function(resp){
        console.log("onSuccessModelIndex:", resp);
    },
    getDefaultTemplate:function(options) {
        var raw = ''
        +'<div id="accordionView">'
        +'</div>';
        return raw;
    },
});
})();

