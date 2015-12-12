
(function () {
    'use strict';

    Nis.View.CCMList = Uic.LayoutView.extend({
        className:'col-sm-12',
        id:'page_contents',
        regions: {
            listHeader: '#list-title',
            preHeader: '#pre-title',
            list: '#left_north',
            list_item: '#left_south',
            items: '#right_north',
            itemDetail: '#right_south',
            buttons: '#right_footer',
        },
        initialize:function(options) {
            Uic.LayoutView.prototype.initialize.call(this, options);
            this.showConceptSetTableForm();
        },
        showTitle:function() {
            var view = new Uic.View({raw:'<h3>CCM List</h3>'});
            this.listHeader.show(view);
        },
        showPreTitle:function() {
            var view = new Uic.View({raw:'<h3>CCM Preview</h3>'});
            this.preHeader.show(view);
        },
        showModiTitle:function() {
            var view = new Uic.View({raw:'<h3>CCM Modify</h3>'});
            this.preHeader.show(view);
        },
        showConceptSetTableForm:function() {
            this.showTitle();
            var view = new Uic.FormLayout();
            var searchView = new Nis.View.SearchView(this.param);
            view.setTitle(searchView);
            var list = this.makeConceptSetList();            
            view.setForm(list);
            this.list.show(view);
        },
        makeConceptSetList:function() {
            var options = {
                collection:new Nis.Model.CCMList(),
                columns:Nis.Model.CCM.columns,
            };
            var table = new Uic.Table(options);
            var view = new Uic.TableView();
            table.on(Uic.Table.ItemClick, this.onClickTableItem.bind(this));
            view.setTable(table);
            view.setCurrentPage(0);
            return view;
        },
        makePreviewFormButtons:function(){
            var buttons = this.makeButtons(
                Nis.Model.CCM.buttons,
                this.onClickButtonPreviewForm,
                false);
            return buttons;
        },
        getPreviewFormButtons:function(){
            return this.getPreviewForm().getFooter();
        },
        showPreviewForm:function(model) {
            this.showPreTitle();
            var view = new Uic.FormLayout();
            var list = this.makePreview(model);
            view.setForm(list);
            this.itemDetail.show(view);
            view.setFooter(this.makePreviewFormButtons());
        },
        getPreviewForm:function() {
            return this.itemDetail.currentView;
        },
        onSuccessMultiModel:function(model) {
            this.getPreviewFormButtons().setEnable(true);
            this.getPreviewFormButtons().model = model;
        },
        makePreview:function(model) {
            var view = new Nis.View.CCMPreview({model:model});
            view.on('onSuccessMultiModel', this.onSuccessMultiModel.bind(this));
            

            var header = new Uic.List({
                tagName:'ul',
                itemRaw:'<li>{{title}} : {{text}}</li>',
                items :[
                {
                    title: 'Model Name',
                    text:model.attributes.modelName,
                },
                {
                    title: 'Model ID',
                    text:model.attributes.modelId,
                },
                {
                    title: 'Model Type',
                    text:model.attributes.modelType,
                },
                {
                    title: 'Value Representation',
                    text:model.attributes.modelType,
                },
                ],
            });
            this.items.show(header);
            return view;
        },
        makeButtons:function(buttons, cbFunc, enable) {
            var enable0 = true;
            if(! _.isUndefined(enable))
                enable0 = enable;
            var view = new Uic.Buttons({
                buttons:buttons,
                enable:enable0,
            });
            view.on('click', cbFunc.bind(this));
            return view;                        
        },
        onClickButtonPreviewForm:function(id, text) {
            console.log("onConceptSetButtons:", id, text);

            if (id === 'modify'){
                console.log("modify btn clicked");
                    var model = this.getPreviewFormButtons().model;
                    console.log('onClickButtonPreviewForm:', model);
                    //this.showModifyForm(model);
                    this.loadModelDetailContents(model.id);

            }
            /*switch(id) {
                case 'modify': {
                    console.log("modify btn clicked");
                    var model = this.getPreviewFormButtons().model;
                    console.log('onClickButtonPreviewForm:', model);
                    this.showModifyForm(model);
                    break;
                }
            };*/
        },
        showModifyForm:function(model) {
            this.itemDetail.show(this.makeModifyForm(model));
            //this.loadModelDetailContents(model.id);
            //this.showModiTitle();
            //this.makeModifyForm(model);
        },
        loadModelDetailContents:function(modelId){
            var model = new Nis.Model.CCMObj.MultiModelLoad();
            var options = {
                modelId:modelId,
                success:this.onSuccessCCMModi.bind(this),
                error:this.onErrorCCMModi.bind(this),
            };
            model.getByModelId(options);
        },
        onSuccessCCMModi:function(resp) {
            console.log('onSuccessCCMModi:', resp);
            var model = resp.body;
            this.showModifyForm(model);
        },
        onErrorCCMModi:function(resp) {
            console.log('onErrorCCMModi:', resp);
        },        
        onClickButtonModifyForm:function(id, text, button, model) {
            console.log("onConceptSetButtons:", id, text);
        },
        makeModelForm:function(util, items){            
            var formItems = util.select(items);
            var modelForm = new Uic.FormView({ items:formItems});
            return modelForm;
        },
        makeModifyForm:function(model) {
            var view = new Uic.FormLayout();
            view.setTitle("Show ...");
            //var list = new Nis.View.CCMModify({model:model});
            var util = new Nis.UiInfo.ItemUtil({items:Nis.Model.CCMModify.columns});
            var buttons = this.makeButtons(
                Nis.Model.CCMModify.buttons,
                this.onClickButtonModifyForm);
            view.setFooter(buttons);
            view.setGroups({
                groups:[
                    {
                        title:'Model',
                        body:this.makeModelForm(util, ['dateCreated', 'userCreated','modelName','modelType','processType','valueRepresentaion','clinicalDomain']),
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
            view.setModelAttrs(model);
            //view.setForm(list);
            //this.itemDetail.show(view);
            console.log(view);
            //view.setFooter(buttons);
            return view;
        },
        onClickTableItem:function(model, view, event) {
            console.log('onClickTableItem:', model);   
            this.showPreviewForm(model);         
        },
        getDefaultTemplate:function(options) {
            var ret = ''
            +'<div id="left" class="col-sm-6">'
            + '<div id = "list-title" class="page-header"></div>'
            +'<div id="left_north" class="row-sm-6">'
            +'</div>'
            +'<div id="left_south" class="row-sm-6">'
            +'</div>'
            +'<a class="btn btn-default" href="http://192.168.0.153:8880/ccm_server/api/v1/token/no-token/excel/download">download</a>'
            +'</div>'
            +'<div id="right" class="col-sm-6">'
            + '<div id = "pre-title" class="page-header"></div>'
            +'<div id="right_north" class="row-sm-6">'
            +'</div>'
            +'<div id="right_south" class="row-sm-6">'
            +'</div>'
            +'</div>';
            return ret;
        },
    }); // end of Nis.View.ConceptSetLayout

})();

