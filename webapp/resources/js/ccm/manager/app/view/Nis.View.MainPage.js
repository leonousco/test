
(function () {
	'use strict';

    Nis.View.MainPage = Uic.LayoutView.extend({
        className:'col-sm-12',
        id:'page_contents',
        regions: {
            header: '#page-title',
            north: '#north',
            northTop: '#north_top',
            northBottom: '#north_bottom',
            south: '#south',
        },
        initialize:function(options) {
            Uic.LayoutView.prototype.initialize.call(this, options);
            this.options = options;
            this.showConceptSetTableForm();
        },
        showTitle:function() {
            var view = new Uic.View({raw:'<h3>ConceptSet List</h3>'});
            this.header.show(view);
        },
        showConceptSetTableForm:function() {
            var view = new Uic.FormLayout();
            view.setTitle("메인화면");
            var list = this.makeConceptSetList();
            view.setForm(list);
            var buttons = this.makeButtons(
                Nis.Model.NoticeModel.noticeButtons,
                this.onConceptSetButtons);
            // this.south.show(buttons);
            // var uiInfo = (new Nis.UiInfo.CCMInfo()).getInfo().ret;
            // this.southView = new Nis.View.MainPageGuide(uiInfo);
            var uiInfo = new Nis.UiInfo.CCMInfo();
            var html = uiInfo.getInfo();
            this.southView = new Uic.View({raw:html.raw});
            // this.southView = new Uic.View({raw:new Nis.UiInfo.CCMInfo()).getInfo().ret.raw});
            // view.setFooter(buttons);
            this.northTop.show(view);
            this.northBottom.show(buttons);
            this.south.show(this.southView);
        },
        makeConceptSetList:function() {
            var options = {
                collection:new Nis.Model.CCMNoticeModelList(),
                columns:Nis.Model.NoticeModel.mainPageColumns,
            };
            this.table = new Uic.Table(options);
            var view = new Uic.TableView();
             // table.fetch();
            this.table.on('click.checkbox', this.onClickCheckbox.bind(this));
            this.table.on('click.id', this.onClickId.bind(this));
            view.setTable(this.table);
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
                case 'add': {
                    console.log("notice add btn clicked");
                    
                    var modalInfo = new Nis.Model.NoticeModalFormUi();
                    // var modal = new Uic.Modal(modalInfo.getInfo());
                    var modal = new Uic.NoticeModal();
                    var view = new Uic.UserForm(modalInfo.getInfo());
                    // var view = new Nis.View.ManagerManagement();
                    modal.setContent(view);
                    // modal.on('click.saveNotice', this.onSaveNoticeClick.bind(this));
                    modal.open(function(view) {
                    //     // var ta = view.getContent();
                    //     // $.extend(formData, {"memo": ta.controlValue});
                    });
                    break;
                }
                case 'delete': {
                    console.log("delete btn clicked");
                    var length = $("tbody").children().length;
                    for(var i = 0 ; i < length ; i++){
                        var checkbox = $('tbody').children().eq(i).find("input");
                        var isChecked = $(checkbox).prop("checked");
                        if(isChecked){
                            var checkBoxId = $(checkbox).attr("modelid");
                            console.log(checkBoxId);
                            var options = {
                                success:this.onDeleteSuccess.bind(this),
                            }
                            this.table.collection.deleteNotice(options, checkBoxId);

                            // var cUrl = "http://192.168.0.153:8880/ccm_server/api/v1/token/no-token/remove/CCMNotice/"+checkBoxId;
                            // $.ajax({
                            //     url:cUrl,
                            //     type:'GET',
                            // }).done(function(){
                            //     console.log("Checked notice is deleted");
                            // });
                            // var model = this.table.getCollection().get(checkBoxId); 
                            // model.destroy({success:function(){
                            //     console.log("destroy");
                            // }});
                        }
                    }
                    break;
                }
            };
        },
        onDeleteSuccess:function(){
            console.log("onDeleteSuccess: ");
            location.reload();
        },
        getDefaultTemplate:function(options) {
            var ret = ''
                +'<div id="left" class="col-sm-12">'
                //+ '<div id = "page-title" class="page-header">page-header</div>'
                    +'<div id="north" class="row-sm-6">'
                    +   '<div id="north_top"></div>'
                    +   '<div id="north_bottom"></div>'
                    +'</div>'
                    +'<div id="south" class="row-sm-6">'
                    +'</div>'
                +'</div>';
            return ret;
        },

        onClickCheckbox:function(id, model, element) {
            console.log('onClickCheckbox:', id, model, element);
            if(_.isUndefined(model)) {
                var isHeaderChecked = $(element).prop("checked");
                var length = $("tbody").children().length;
                for(var i = 0 ; i < length ; i++){
                    var checkbox = $('tbody').children().eq(i).find("input");
                    $(checkbox).prop('checked', isHeaderChecked);
                }
            }
        },
        onClickId:function(id, model, element){
            this.trigger('click.Id', id, model, element);
            window.location.href="#checkManager";
        },
        render:function() {
            return this;
        },
    }); // end of Nis.View.ConceptSetLayout

})();

