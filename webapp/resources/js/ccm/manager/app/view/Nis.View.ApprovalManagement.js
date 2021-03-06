
(function () {
	'use strict';

    Nis.View.ApprovalManagement = Uic.LayoutView.extend({
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
                collection:new Nis.Model.CCMApprovalModelList(),
                columns:Nis.Model.CCMModel.userManagementColumns,
            };
            this.showConceptSetTableForm(options);
        },
        showTitle:function() {
            var view = new Uic.View({raw:'<h3>가입 승인</h3>'});
            this.header.show(view);
        },
        showConceptSetTableForm:function(options) {
            this.showTitle();
            var view = new Uic.FormLayout();
            // this.param.dataList = new Array("sample1", "sample2");
            var searchView = new Nis.View.SearchView(this.param);
            searchView.on('click.searchButton', this.onSearchButtonClick.bind(this));
            view.setTitle(searchView);
            var list = this.makeTable(options);
            view.setForm(list);
            var buttons = this.makeButtons(
                Nis.Model.CCMModel.approvalManagementButtons,
                this.onConceptSetButtons);
            this.list_item.show(buttons);
            // view.setFooter(buttons);
            this.list.show(view);
        },
        makeTable:function(options) {
            this.table = new Uic.Table(options);
            this.tableView = new Uic.TableView();
            // table.on('click.checkbox', this.onClickCheckbox.bind(this));
            this.table.on('click.id', this.onClickId.bind(this));
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
                case 'approval': {
                    console.log("approval btn clicked");
                    break;
                }
                case 'reject': {
                    console.log("reject btn clicked");
                    break;
                }
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

        // onClickCheckbox:function(id, model, element) {
        //     console.log('onClickCheckbox:', id, model, element);
        //     if(_.isUndefined(model)) {
        //         var isHeaderChecked = $(element).prop("checked");
        //         var length = $("tbody").children().length;
        //         for(var i = 0 ; i < length ; i++){
        //             var checkbox = $('tbody').children().eq(i).find("input");
        //             $(checkbox).prop('checked', isHeaderChecked);
        //         }
        //     }
        // },
        onClickId:function(id, model, element){
            this.trigger('click.approvalUserId', id, model, element);
            // window.location.href="#approvalUser";
        },
        render:function() {
            return this;
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
                collection:new Nis.Model.CCMApprovalModelList(result.body),
                columns:Nis.Model.CCMModel.userManagementColumns,   
                hasQuery:false,
                queryParam: {
                    column:'id',
                    keyword:this.keyword,
                }   
            }                               
            this.showConceptSetTableForm(options);
            // this.table.collection.reset(result.body);
        }
    }); // end of Nis.View.ConceptSetLayout

})();

