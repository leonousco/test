

var Uic = Uic || {};

(function () {
    'use strict';

    Uic.FormLayout = Uic.LayoutView.extend({
        className: 'form-group',
        regions: {
            container: "#form-container",
            title: "#form-title",
            content: "#form-content",
            footer: "#form-footer",
        },
        initialize: function (options) {
            //console.log("initialize: ", options);
            this.initOptions(options);
            this.renderView();

            if(_.isUndefined(this.options.title)) {
                if(options.formTitle) {
                    this.options.title = options.formTitle;
                }
            }
            if(_.isUndefined(options.items)) {
                if(options.formItems) {
                    this.options.items = options.formItems;
                }
            }
            if(this.options.title) {
                this.setTitle(this.options.title);
            }
            if(this.options.items) {
                var form = this.makeFormContents({items:this.options.items});
                this.setForm(form);
            }
            if(options.formFooter) {
                var buttons = this.makeFormFooter(options.formFooter);
                this.setFooter(buttons);
            }
        },
        setGroups:function(options) {
            var view = new Uic.AccordionPanelView({
                id:'test',
            });
            this.content.show(view);
            for(var i=0; i<options.groups.length;i++) {
                var group = options.groups[i];
                view.addItem(group);
            }
        },
        getDefaultTemplate:function(options) {
            if(options && options.raw)
                return options.raw;
            var ret =
                '<article id="form-container"> '
                    +'<div id="form-title" class="page-header"> </div>'
                    +'<div id="form-content"> </div>'
                    +'<div id="form-footer"> </div>'
                +'</article>';
            return ret;
        },
        setTitle:function(options) {
            //console.log('setTitle: ', options);
            var formTitle = this.makeTitle(options);
            if(formTitle)
                this.title.show(formTitle);
        },
        makeTitle:function(options) {
            if(options == null) {
                return;
            }
            else if(options.data && options.data.title){
                var formTitle = new Uic.View({
                    tagName:'h3',
                    data:{
                        text:options.data.title,
                    },
                    raw:'{{text}}',
                });
                return formTitle;
            }
            else if(options.text){
                var formTitle = new Uic.View({
                    tagName:'h3',
                    data:options,
                    raw:'{{text}}',
                });
                return formTitle;
            }
            else if(typeof options === 'string') {
                var formTitle = new Uic.View({
                    tagName:'h3',
                    data:'',
                    raw:options,
                });
                return formTitle;
            }
            else if(options.raw) {
                var formTitle = new Uic.View(options);
                return formTitle;
            }
            return options;
        },
        makeFormFooter:function(options) {
            var buttons = new Uic.Buttons(options);
            buttons.on('click', this.onButtonClick.bind(this));
            return buttons;
        },
        setFooter:function(view) {
            this.footer.show(view);
        },
        getFooter:function(view) {
            return this.footer.currentView;
        },
        makeFormContents:function(options) {
            var form = new Uic.FormView(options);
            return form;
        },
        setForm:function(form) {
            this.content.show(form);
        },
        getForm:function() {
            return this.content.currentView;
        },
        setModel:function(model) {
            this.getForm().setModel(model);
        },
        getModel:function() {
            return this.getForm().getModel();
        },
        fetch:function(options, successCb, failCb) {
            this.getForm().fetch(options, successCb, failCb);
        },
        onButtonClick:function(id, text, button) {
            //console.log("onButtonClick: ", id, text, button);
            this.trigger('click.button', id, text, button);
        },
        setModelAttrs:function(attributes){
            this.content.currentView.setModelAttrs(attributes);
        },
        setModel:function(model){
            this.content.currentView.setModel(model);
        },
        getModel:function() {
            return this.content.currentView.getModel();
        },
    }); // end of Uic.FormLayout


})();
