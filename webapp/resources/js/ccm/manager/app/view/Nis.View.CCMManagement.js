
(function () {
	'use strict';

    Nis.View.CCMManagement = Uic.LayoutView.extend({
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

            var options = {
                collection:new Nis.Model.CCMManagementModelList(),
                columns:Nis.Model.CCMManagementModel.ccmManagementColumns,
                // collection:new Nis.Model.CCMModelList(),
                // columns:Nis.UiInfo.Concept.ccmManagementColumns,
            };
            this.showConceptSetTableForm(options);
        },
        showTitle:function() {
            var view = new Uic.View({raw:'<h3>CCM 관리</h3>'});
            this.header.show(view);
        },
        showConceptSetTableForm:function(options) {
            this.showTitle();
            var view = new Uic.FormLayout();
            this.param.dataList = new Array("sample1", "sample2");
            var searchView = new Nis.View.SearchView(this.param);
            searchView.on('click.searchButton', this.onSearchButtonClick.bind(this));
            view.setTitle(searchView);
            var list = this.makeTable(options);
            view.setForm(list);
            var buttons = this.makeButtons(
                Nis.Model.CCMManagementModel.ccmManagementButtons,
                this.onConceptSetButtons);
            this.list_item.show(buttons);
            this.list.show(view);
        },
        makeTable:function(options) {
            this.table = new Uic.Table(options);
            this.tableView = new Uic.TableView();
            this.table.on('click.checkbox', this.onClickCheckbox.bind(this));
            this.table.on('click.button', this.onClickVersionControl.bind(this));
            this.tableView.setTable(this.table);
            this.tableView.setCurrentPage(0);
            return this.tableView;
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
                // case 'makePublic': {
                //     console.log("makePublic btn clicked");
                //     break;
                // }
                // case 'makePrivate': {
                //     console.log("makePrivate btn clicked");
                //     break;
                // }
                // case 'delete': {
                //     console.log("delete btn clicked");
                //     break;
                // }
            };
        },
        getDefaultTemplate:function(options) {
            var ret = ''
                +'<div id="left" class="col-sm-12">'
                + '<div id = "page-title" class="page-header"></div>'
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
        onClickVersionControl:function(event){
            console.log('onClickVersionControl: ');
            var target = $(event.currentTarget);
            var modelId = $(target).attr("modelid");
            var model = this.table.collection.get(modelId);
            this.trigger('click.versionControl', model);
        },
        onSearchButtonClick:function(buttons, inputBox){
            console.log('onSearchButtonClick userInfoView: ', buttons, inputBox);
            this.keyword = inputBox.value;
            var options = {
                success:this.onSearchSuccess.bind(this),
            }
            this.table.collection.searchData(options, this.keyword);
        },
        onSearchSuccess:function(result){
            var table = this.tableView.getTable();
            var view = new Uic.FormLayout();
            var options = {
                collection:new Nis.Model.CCMManagementModelList(),
                columns:Nis.Model.CCMManagementModel.ccmManagementColumns,   
                hasQuery:true,
                queryParam: {
                    modelName:this.keyword,
                    // keyword:this.keyword,
                }   
            }                               
            this.showConceptSetTableForm(options);
            // this.table.collection.reset(result.body);
        },
    }); // end of Nis.View.ConceptSetLayout

})();

