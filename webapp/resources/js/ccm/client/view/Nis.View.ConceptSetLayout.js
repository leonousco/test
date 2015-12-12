
(function () {
	'use strict';

    Nis.View.ConceptSetLayout = Uic.LayoutView.extend({
        className:'col-sm-12',
        id:'page_contents',
        regions: {
            header: '#page-title',
            list: '#left_north',
            list_item: '#left_south',
            items: '#right',
            //itemDetail: '#right_south',
            //buttons: '#right_footer',
        },
        initialize:function(options) {
            Uic.LayoutView.prototype.initialize.call(this, options);
            //this.showTitle();
            this.showConceptSetTableForm();
            //this.showConceptView();
            //this.showConceptSetList();
        },
        showConceptView:function(model) {
            if(this.items.currentView == null) {
                var view = new Nis.View.ConceptLayout();
                this.items.show(view);                
            }
            this.items.currentView.setModel(model);            
        },
        showTitle:function() {
            var view = new Uic.View({raw:'<h3>ConceptSet List</h3>'});
            this.header.show(view);
        },
        showConceptSetTableForm:function() {
            var view = new Uic.FormLayout();
            view.setTitle("ConceptSet List");
            var list = this.makeConceptSetList();
            view.setForm(list);
            var buttons = this.makeButtons(
                {buttonId:['add']},
                //Nis.UiInfo.Concept.conceptSetButtons,
                this.onConceptSetButtons);
            view.setFooter(buttons);
            this.list.show(view);
        },
        showConceptSetForm:function() {
            var view = new Uic.FormLayout();
            view.setTitle("ConceptSet");
            var form = this.makeConceptSetForm();
            view.setForm(form);
            var buttons = this.makeButtons(
                //Nis.UiInfo.Concept.submitButtons,
                {buttonId:['submit', 'cancel']},
                this.onConceptSetSubmit);
            view.setFooter(buttons);
            this.list_item.show(view);
        },
        getConceptSetForm:function() {
            return this.list_item.currentView.getForm();            
        },
        makeConceptSetList:function() {
            var options = {
                collection:new Nis.Collection.ConceptSet(),
                columns:Nis.UiInfo.Concept.columns,
            };
            var table = new Uic.Table(options);
            var view = new Uic.TableView();
            view.setTable(table);
            view.on('itemClick', this.onClickTableItem.bind(this));
            view.setCurrentPage(0);
            return view;
        },
        onClickTableItem:function(view, model, options) {
            console.log('onClickTableItem:', model);
            this.showConceptView(model);
        },
        makeConceptSetForm:function() {
            var options = {                
                items:Nis.UiInfo.Concept.columns,
            };
            var view = new Uic.FormView(options);
            view.setModel(new Nis.Model.ConceptSet());
            return view;
        },
        makeButtons:function(buttons, cbFunc) {
            var view = new Uic.Buttons({
                buttons:buttons,
            });
            view.on('click', cbFunc.bind(this));
            return view;                        
        },
        onConceptSetButtons:function(id, text, button) {
            console.log("onConceptSetButtons:", id, text);
            switch(id) {
                case 'add': {
                    this.showConceptSetForm();
                    break;
                }
            };
        },
        onConceptSetSubmit:function(id, text, button) {
            console.log("onConceptSetSubmit:", id, text);
            switch(id) {
                case 'submit': {
                    this.getConceptSetForm().save();
                    this.list_item.empty();          
                    break;
                }
                case 'cancel': {
                    this.list_item.empty();          
                    break;
                }
            };
        },
        showConceptList:function() {
            var view = new FormLayout();
            this.items.show(view);
        },
        getDefaultTemplate:function(options) {
            var ret = ''
                +'<div id="left" class="col-sm-6">'
                //+ '<div id = "page-title" class="page-header">page-header</div>'
                    +'<div id="left_north" class="row-sm-6">conceptset table'
                    +'</div>'
                    +'<div id="left_south" class="row-sm-6">conceptset table'
                    +'</div>'
                +'</div>'
                +'<div id="right" class="col-sm-6">'
                +'</div>';
            return ret;
        },

    }); // end of Nis.View.ConceptSetLayout

})();

