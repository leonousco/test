
(function () {
    'use strict';

    Nis.Model.CCMObj.CCMModel = Nis.Model.CCMObj.extend({
        defaults: {
            modelId: null,
            modelName:null,
            modelType:null,
            processType:null,
            valueRepresentaion:null,
            clinicalDomain:null,
            isPublic:null,
        },
        ccmEnities:[],
        initialize: function (options) {
            this.validators = {};
            var newOptions = _.extend({
                entityName:Nis.Model.CCMObj.CCMModel.EntityName,
            }, options);
            return Nis.Model.CCMObj.prototype.initialize.call(this, newOptions);
        },
    }); //end of Nis.Model.CCMObj

    Nis.Model.CCMObj.CCMModel.EntityName = "CCMModel";

    Nis.Collection.CCMObj.CCMModel = Nis.Collection.CCMObj.extend({
        model: Nis.Model.CCMObj.CCMModel,
        initialize: function(options){
            //console.log("initialize: CCMList");
            var newOptions = _.extend({
                entityName:Nis.Model.CCMObj.CCMModel.EntityName,
            }, options);
            return Nis.Collection.CCMObj.prototype.initialize.call(this, newOptions);
        },
    }); // end of Nis.Collection.CCMObj

})();
