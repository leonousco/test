
(function () {
	'use strict';

    Nis.View.ConceptLayout = Uic.LayoutView.extend({
        className:'div',
        id:'concept_contents',
        regions: {
            conceptList: '#conceptList',
            conceptButtons: '#conceptButtons',
            conceptDetail: '#conceptDetail',            
        },
        initialize:function(options) {
            Uic.LayoutView.prototype.initialize.call(this, options);
            //this.showConceptSetTableForm();
            //this.showConceptSetList();
        },
        setModel:function(model) {
            console.log('setModel:', model);
            this.model = model;
            this.collection = new Nis.Collection.Concept();
            this.showConceptList(this.collection);
            var options = {
                conceptSet:model,
                success:this.onSuccessConceptList.bind(this),
                error:this.onErrorConceptList.bind(this),
            };
            this.collection.getConceptListbyConceptSetId(options);
        },
        onSuccessConceptList:function(response) {
            console.log("onSuccessConceptList:", response);
            var list = response;
            if(response.body)
                list = response.body;
            this.collection.reset(list);
        },
        onErrorConceptList:function() {
            console.log("onErrorConceptList:");
        },
        showConceptList:function(collection) {
            if(this.conceptList.currentView == null) {
                var view = this.makeConceptList(collection);
                this.conceptList.show(view);
            }
            if(this.conceptButtons.currentView == null) {
                var buttons = [
                    {
                        data: {
                            buttonId:"add",
                            buttonClass:"btn btn-default",
                            buttonTitle:"Add",
                        },
                    },                
                ];
                var view = this.makeButtons(buttons, this.onClickAddButton);
                this.conceptButtons.show(view);
            }
        },
        onClickAddButton:function() {
            this.showConceptAddForm();
        },
        showConceptAddForm:function() {
            var view = new Uic.FormLayout();
            view.setTitle("Concept Add");
            var form = this.makeConceptForm();
            view.setForm(form);
            var buttons = this.makeButtons(
                Nis.UiInfo.Concept.submitButtons,
                this.onConceptSubmit);
            view.setFooter(buttons);
            this.conceptDetail.show(view);
        },    
        onConceptSubmit:function(id, text, button) {
            console.log("onConceptSetSubmit:", id, text);
            switch(id) {
                case 'submit': {
                    var options = {
                        conceptSet:this.model,
                        success:this.onSuccessCreate.bind(this),
                        error:this.onErrorCreate.bind(this),
                    };
                    this.getConceptForm().getModel().create(options);
                    //this.conceptDetail.empty();
                    break;
                }
                case 'cancel': {
                    this.conceptDetail.empty();          
                    break;
                }
            };
        },
        onSuccessCreate:function(response) {
            console.log("onSuccessCreate:", response);
            var concept = response;
            if(response.body)
                concept = response.body;
            this.collection.add(concept);
            this.conceptDetail.empty();
        },
        onErrorCreate:function() {
            console.log("onErrorCreate:");
        },
        getConceptForm:function() {
            return this.conceptDetail.currentView.getForm();            
        },
        makeConceptForm:function() {
            var options = {                
                items:Nis.UiInfo.Concept.columns,
            };
            var view = new Uic.FormView(options);
            view.setModel(new Nis.Model.Concept());
            return view;
        },
        makeConceptList:function(collection) {
            var options = {
                collection:collection,
                columns:Nis.UiInfo.Concept.columns,
            };
            var table = new Uic.Table(options);
            table.on(Uic.Table.ItemClick, this.onClickTableItem.bind(this));
            return table;
        },
        onClickTableItem:function(model, view, options) {
            console.log('onClickTableItem:', model);
            this.showConceptDetail(model);
        },
        showConceptDetail:function(model) {
            var view = new Uic.FormLayout();
            view.setTitle("Concept Detail");
            var form = this.makeConceptForm();
            view.setForm(form);
            var buttons = this.makeButtons(
                Nis.UiInfo.Concept.submitButtons,
                this.onConceptSubmit);
            view.setFooter(buttons);
            this.conceptDetail.show(view);
            view.setModel(model);
        },
        makeConceptForm:function() {
            var options = {                
                items:Nis.UiInfo.Concept.columns,
            };
            var view = new Uic.FormView(options);
            view.setModel(new Nis.Model.Concept());
            return view;
        },
        makeButtons:function(buttons, cbFunc) {
            var view = new Uic.Buttons({
                buttons:buttons,
            });
            view.on('click', cbFunc.bind(this));
            return view;                        
        },
        getDefaultTemplate:function(options) {
            var ret = ''
                +'<div id="conceptList"> '
                +'</div>'
                +'<div id="conceptButtons"> '
                +'</div>'
                +'<div id="conceptDetail"> '
                +'</div>';
            return ret;
        },

    }); // end of Nis.View.ConceptSetLayout

})();

