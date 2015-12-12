
(function () {
    'use strict';

    Nis.View.CCMEvaluateRequest = Uic.LayoutView.extend({
        className:'col-sm-12',
        id:'page_contents',
        regions: {
            evalHeader: '#eval-title',
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
            var view = new Uic.View({raw:'<h3>CCM Evaluation Request List</h3>'});
            this.evalHeader.show(view);
        },
        showPreTitle:function() {
            var view = new Uic.View({raw:'<h3>CCM Preview</h3>'});
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
                collection:new Nis.Model.EvaluateReqList(),
                columns:Nis.Model.EvaluateReq.columns,
            };
            var table = new Uic.Table(options);
            var view = new Uic.TableView();
            table.on(Uic.Table.ItemClick, this.onClickTableItem.bind(this));
            view.setTable(table);
            view.setCurrentPage(0);
            return view;
        },
        showEvalPreviewForm:function(model) {
            this.showPreTitle();
            var view = new Uic.FormLayout();
            var list = this.makeEvalPreview(model);
            var buttons = this.makeButtons(
                Nis.Model.EvaluateReq.buttons,
                this.onConceptSetButtons);
            view.setForm(list);
            this.itemDetail.show(view);
            view.setFooter(buttons);
        },
        replaceAll:function (str, searchStr, replaceStr) {
                return str.split(searchStr).join(replaceStr);
        },
        makeEvalPreview:function(model) {
            var test = model.attributes.json;
            var jsonText = this.replaceAll(test, "'", '"');
            var jsonObj = JSON.parse(jsonText);
            var view = new Nis.View.CCMEvalPreview({model:jsonObj});

            var header = new Uic.List({
                tagName:'ul',
                itemRaw:'<li>{{title}} : {{text}}</li>',
                items :[
                    {
                        title: 'Model Name',
                        text:jsonObj.model.modelName,
                    },
                    {
                        title: 'Model ID',
                        text:jsonObj.model.modelId,
                    },
                    {
                        title: 'Model Type',
                        text:jsonObj.model.modelType,
                    },
                    {
                        title: 'Value Representation',
                        text:jsonObj.model.valueRepresentation,
                    },
                ],
            });
            this.items.show(header);
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
            var formData = {
                "dateCreated": "20151124011041"
                , "userCreated": null    // userId
             };

            switch(id) {
                case 'reject': {
                    console.log("reject btn clicked");
                    $.extend(formData, {"opinion": "REJECT"});
                    break;
                }
                case 'confirm': {
                    console.log("confirm btn clicked");
                    $.extend(formData, {"opinion": "ACCEPT"});
                    break;
                }
            }

            var modal = new Uic.Modal();
            var contents = new Uic.Textarea();
            modal.setContent(contents);
            modal.open(function(view) {
                var ta = view.getContent();
                $.extend(formData, {"memo": ta.controlValue});

                alert(JSON.stringify(formData));

                $.ajax({
                    url : "http://192.168.0.153:8880//ccm_server/api/v1/token/no-token/Evaluation/request_id/1"
                    , type: "POST"
                    , data : JSON.stringify(formData)
                    , contentType: "plain/text"
                    , success:function(data){
                        alert("success");
                    }
                    , error: function (request, status, error) {
                        alert("error");
                    }
                });
            });
        },
        onClickTableItem:function(model, view, event) {
            console.log('onClickTableItem:', model);   
            this.showEvalPreviewForm(model);         
        },
        getDefaultTemplate:function(options) {
            var ret = ''
                +'<div id="left" class="col-sm-6">'
                + '<div id = "eval-title" class="page-header"></div>'
                    +'<div id="left_north" class="row-sm-6">'
                    +'</div>'
                    +'<div id="left_south" class="row-sm-6">'
                    +'</div>'
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

