
(function () {
    'use strict';

    Nis.ConceptSetUtil = Backbone.Marionette.Object.extend({
        addConcept:function(conceptId, dbid) {
            if(_.isUndefined(this.conceptIdMap)) {
                this.conceptIdMap = new Nis.Map();
            }
            this.conceptIdMap.put(conceptId, dbid);
            var loadOption = {
                success:this.onConceptSet.bind(this),
                error:this.onConceptSetError.bind(this),
            };
            NisMVC.code.getConceptSet(conceptId, loadOption);
        },
        onConceptSet:function(conceptSet, conceptId) {
            if(_.isUndefined(this.conceptSetMap)) {
                this.conceptSetMap = new Nis.Map();
            }
            var dbid = this.conceptIdMap.get(conceptId);
            this.conceptSetMap.put(dbid, this.makeConceptSetCodeMap(conceptSet)); 
        },
        makeConceptSetCodeMap:function(conceptSet){
            var map = new Nis.Map();
            for(var i=0; i<conceptSet.length; i++) {
                map.put(conceptSet[i].code, conceptSet[i]);
            }
            return map;
        },
        onConceptSetError:function() {
        },        
        getDisplayName:function(dbid, value){
            var map = this.conceptSetMap.get(dbid);
            if(map) {
                var concept = map.get(value);
                if(concept)
                    return concept.displayName;
                else
                    return value;                
            }
            return value;
        },
        getDisplayNames:function(attrs) {
            var newAttrs = {};
            for(var key in attrs) {
                newAttrs[key] = this.getDisplayName(key, attrs[key]);
            }
            return newAttrs;         
        },
    });


})();


