
(function () {
	'use strict';

    Nis.View.ManagerManagement = Uic.LayoutView.extend({
        className:'col-sm-12',
        id:'page_contents',
        regions: {
            header: '#page-title',
            list: '#left_north',
            list_item: '#left_south',
            // items: '#right',
            // itemDetail: '#right_south',
            // buttons: '#right_footer',
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
            view.setTitle("관리자 관리");
            var list = this.makeConceptSetList();
            view.setForm(list);
            var buttons = this.makeButtons(
                Nis.Model.CCMModel.managerManagementButtons,
                this.onConceptSetButtons);
            this.list_item.show(buttons);
            // view.setFooter(buttons);
            this.list.show(view);
        },
        makeConceptSetList:function() {
            var options = {
                collection:new Nis.Model.CCMModelList(),
                columns:Nis.Model.CCMModel.managerManagementColumns,
                // hasQuery:false,
                queryParam:{
                    type:"MANAGER"
                },
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
                    console.log("add btn clicked");
                    this.trigger('click.addManager', id, text, button);
                    window.location.href="#addManager";
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
                            var model = this.table.getCollection().get(checkBoxId); 
                            model.destroy({success:function(){
                                console.log("destroy");
                            }});
                        }
                    }
                    break;
                }
            };
        },
        getDefaultTemplate:function(options) {
            var ret = ''
                +'<div id="left" class="col-sm-12">'
                //+ '<div id = "page-title" class="page-header">page-header</div>'
                    +'<div id="left_north" class="row-sm-6">'
                    +'</div>'
                    +'<div id="left_south" class="row-sm-6">'
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

