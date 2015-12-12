
(function () {
	'use strict';

    Nis.View.CCMVersionControl = Uic.LayoutView.extend({
        className:'col-sm-12',
        id:'page_contents',
        regions: {
            header: '#page-title',
            ccmName:"#ccmName",
            bTop: '#top',
            bMiddle: '#middle',
            bBottom: '#bottom',
            // items: '#right',
            // itemDetail: '#right_south',
            // buttons: '#right_footer',
        },
        initialize:function(options) {
            this.options = options;
            Uic.LayoutView.prototype.initialize.call(this, options);
            this.showConceptSetTableForm();
        },
        showTitle:function() {
            var view = new Uic.View({raw:'<h3>CCM Version Control</h3>'});
            this.header.show(view);
        },
        showCcmName:function(){
            var view = new Uic.View({raw:
                    '<div>'
                +       '<h3 id="ccmNameTitle"><h4 id="ccmIsPublic"></h4></h3>'
                +   '</div>'
            });
            this.ccmName.show(view);
            var ccmNameTitle = $(view.el).find('h3');
            $(ccmNameTitle).text(this.options.attributes.modelName);
            var ccmIsPublic = $(view.el).find('h4');
            $(ccmIsPublic).text(this.options.attributes.display);
        },
        showConceptSetTableForm:function() {
            this.showTitle();

            this.showCcmName();

            this.needVersionTable = this.makeNeedVersionTable();
            this.bTop.show(this.needVersionTable);

            if(this.options.modelId && this.options.modelId > 0){
                var view = new Uic.FormLayout();
                var list = this.makeConceptSetList();
                view.setForm(list);
                // view.setFooter(buttons);
                this.bMiddle.show(view);
            }

            var buttons = this.makeButtons(
                Nis.Model.CCMVersionControlModel.ccmVersionControlButtons,
                this.onConceptSetButtons);
            this.bBottom.show(buttons);
        },
        makeNeedVersionTable:function(){
            var options = {
                // collection:new Nis.Model.CCMManagementModelList(2),
                columns:Nis.Model.CCMVersionControlModel.ccmNeedVersionColumns,
                // collection:new Nis.Model.CCMModelList(),
                // columns:Nis.UiInfo.Concept.ccmVersionControlColumns,
            };
            this.table = new Uic.Table(options);
            this.table.addModel(new Nis.Model.CCMManagementModel(this.options.attributes));
            this.table.on('click.button', this.onClickControlButton.bind(this));
            return this.table;
        },
        makeConceptSetList:function() {
            var options = {
                collection:new Nis.Model.CCMVersionControlModelList(1),
                columns:Nis.Model.CCMVersionControlModel.ccmVersionControlColumns,
                // collection:new Nis.Model.CCMModelList(),
                // columns:Nis.UiInfo.Concept.ccmVersionControlColumns,
            };
            var table = new Uic.Table(options);
            var view = new Uic.TableView();
            view.setTable(table);
            view.setCurrentPage(0);
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
                case 'makePublic': {
                    console.log("makePublic btn clicked");
                    this.changeMode(id, text, button);
                    break;
                }
                case 'makePrivate': {
                    console.log("makePrivate btn clicked");
                    this.changeMode(id, text, button);
                    break;
                }
                case 'list':{
                    window.location.href = "#ccm";
                    break;
                }
            };
        },
        getDefaultTemplate:function(options) {
            var ret = ''
                +'<div id="left" class="col-sm-12">'
                + '<div id = "page-title" class="page-header"></div>'
                    +'<div id="ccmName" class="row-sm-4">'
                    +'</div>'
                    +'<div id="top" class="row-sm-4">'
                    +'</div>'
                    +'<div id="middle" class="row-sm-4">'
                    +'</div>'
                    +'<div id="bottom" class="row-sm-4">'
                    +'</div>'
                +'</div>';
            return ret;
        },
        onClickControlButton:function(event){
            console.log('onClickControlButton: ');
            var button = $(event.currentTarget);
            var buttonType = $(button).attr("spec");
            switch(buttonType){
                case 'accept':{
                    this.onClickAcceptButton(event);
                    break;
                }
                case 'reject':{
                    this.onClickRejectButton(event);
                    break;
                }
            }
        },
        onClickAcceptButton:function(event){
            console.log('onClickAcceptButton: ');
            var target = $(event.currentTarget);
            var modelId = $(target).attr("modelid");
            var model = this.table.collection.get(modelId);
            this.trigger('click.versionInfo', model);
        },
        onClickRejectButton:function(event){
            console.log('onClickRejectButton: ', event);
            var target = $(event.currentTarget);
            var modelId = $(target).attr("modelid");
            // var model = this.table.collection;//.get(modelId);
            // model.rejectVersion(modelId);
            this.table.collection.get(modelId).rejectCCM(modelId);
            // var cUrl = "http://192.168.0.153:8880/ccm_server/api/v1/token/no-token/ModelIndex/reject/reqId/"+modelId;
            // $.ajax({
            //     url:cUrl,
            // }).done(function(){
            //     console.log("this version is rejected.");
            //     javascript:history.back();
            // });
        },
        changeMode:function(id, text, button){
            var model = this.options.attributes;
            var modelId = model.modelId;
            var isPublic;
            if(modelId > 0){
                console.log('modelId is not null');
                if(id === 'makePublic'){
                    isPublic = "public";
                } else if(id === 'makePrivate'){
                    isPublic = "private";
                }
                var options = {
                    success:this.onChangeModeSuccess.bind(this),
                };
                var sample = this.table.collection.get(model.id);
                sample.changeCCMDisplayMode(modelId, isPublic, options);
            }
        },
        onChangeModeSuccess:function(result){
            console.log("CCM Mode is changed");
            var isPublic = result.body.public;

            if(isPublic)
                this.options.attributes.display = "public";
            else
                this.options.attributes.display = "private";

            var ccmIsPublic = $(this.el).find('#ccmIsPublic');
            $(ccmIsPublic).text((this.options.attributes.display).toUpperCase());
        },

    }); // end of Nis.View.ConceptSetLayout

})();