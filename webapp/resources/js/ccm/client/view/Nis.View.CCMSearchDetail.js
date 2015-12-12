
(function () {
    'use strict';

    Nis.View.CCMSearchDetail = Uic.LayoutView.extend({
        className:'col-sm-12',
        id:'page_contents',
        regions: {
            searchHeader: '#search-title',
            resultHeader: '#result-title',
            list: '#left_north',
            list_item: '#left_south',
            items: '#right',
            itemDetail: '#right_south',
            buttons: '#right_footer',
        },
        initialize:function(options) {
            Uic.LayoutView.prototype.initialize.call(this, options);
            this.showSearchDetailForm();
        },
        showTitle:function() {
            var view = new Uic.View({raw:'<h3>CCM Search Detail</h3>'});
            this.searchHeader.show(view);
        },
        showSearchDetailForm:function() {
            this.showTitle();
            var view = new Uic.FormLayout();
            var searchView = new Nis.View.SearchView(this.param);
            searchView.on('click.search', this.onSearchButtonClick.bind(this));
            var detail = this.makeSearchDetail();
            detail.on('click.checkbox', this.onCheckBoxClick.bind(this));
            this.list.show(searchView);
            view.setForm(detail);
            this.list_item.show(view);
        },
        makeSearchDetail:function() {
            var view = new Uic.List({
                tagName:'ul',
                className:'list-group',
                itemRaw:'<li class="list-group-item"><input type="checkbox" id="{{id}}" value="{{id}}" checked="checked"> {{title}}</li>',
                items:[
                {
                    title:'ClinicalObservation',
                    id:'ClinicalObservation',
                },
                {
                    title:'Laboratory',
                    text:'Laboratory',
                },
                {
                    title:'ccmModel',
                    text:'ccmModel',
                },
                {
                    title:'ccmEntity',
                    text:'ccmEntity',
                },
                {
                    title:'ccmModifier',
                    text:'ccmModifier',
                },
                {
                    title:'ccmQualifier',
                    text:'ccmQualifier',
                },
                {
                    title:'ValueItem',
                    text:'ValueItem',
                },
                {
                    title:'ValueSet',
                    text:'ValueSet',
                },
                ],
            });
            return view;
        },
        showResultForm:function() {
            console.log("showResultForm : ");
            this.showPreTitle();
            var list = this.makePreview();
            var buttons = this.makeButtons(
                Nis.UiInfo.Concept.evaluateButtons,
                this.onConceptSetButtons);
            this.list_item.show(buttons);
            view.setForm(list);
            view.setFooter(buttons);
            this.itemDetail.show(view);
        },
        makeResult:function() {
            console.log("makeResult : ");
            var options = {
                collection:new Nis.Model.EvaluateReqList(),
                columns:Nis.UiInfo.Concept.ccmEvaluateList,
            };
            var view = new Uic.AccordionPanelView();
            return view;
        },
          makeButtons:function(buttons, cbFunc) {
            var view = new Uic.Buttons({
                buttons:buttons,
            });
            view.on('click', cbFunc.bind(this));
            return view;                        
        },
        getCheckBoxValue:function(){


        },
        onSearchButtonClick:function(buttons, inputBox) {
            console.log('onSearchButtonClick : ', model);

            this.showResultForm();         
        },
        getDefaultTemplate:function(options) {
            var ret = ''
                +'<div id="left" class="col-sm-6">'
                + '<div id = "search-title" class="page-header"></div>'
                    +'<div id="left_north" class="row-sm-6">'
                    +'</div>'
                    +'<div id="left_south" class="row-sm-6">'
                    +'</div>'
                +'</div>'
                +'<div id="right" class="col-sm-6">'
                + '<div id = "result-title" class="page-header"></div>'
                    +'<div id="right_north" class="row-sm-6">'
                    +'</div>'
                    +'<div id="right_south" class="row-sm-6">'
                    +'</div>'
                +'</div>';
            return ret;
        },
    }); // end of Nis.View.ConceptSetLayout

})();

