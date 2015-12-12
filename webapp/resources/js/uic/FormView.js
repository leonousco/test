

var Uic = Uic || {};

(function () {
    'use strict';

    Uic.FormView = Uic.CompositeView.extend({
        tagName:'form',
        className: 'form-horizontal',
        attributes:{
            "data-toggle":"validator",
            role:"form",
        },
        events: {
            "change"        : "change",
        },
        //inputMap: null,  //new Nis.Map(),
        initialize: function (options) {
            //console.log("initialize: ", options);
            this.inputMap = new Nis.Map();
            this.initOptions(options);
            this.renderView();

            if(_.isUndefined(options.items)) {
                if(options.formItems) {
                    this.options.items = options.formItems;
                }
            }
            if(this.options.items) {
                this.makeFormContents(this.options.items);
            }
        },
        makeFormContents:function(formItems) {
            if(! formItems)
                return;
            var view = $(this.el);
            if(formItems.length){
                for (var i = 0; i < formItems.length; i++) {
                    var item = this.getFormItem(formItems[i]);
                    if(this.options.readOnly)
                        item.readOnly = true;
                    if(item.data.conceptId) {
                        this.addConcept(item.data.conceptId, item.data.dbid);
                    }
                    if(item.buildCb) {
                        var inputView = item.buildCb(item);
                        if(inputView) {
                            $(view).append(inputView.el);
                            inputView.$el.attr('dbid', item.data.dbid);
                            this.inputMap.put(item.data.dbid, inputView);                                                    
                        }
                    }
                    else{
                        var inputView = new Uic.InputFormGroup(item);
                        $(view).append(inputView.el);
                        inputView.$el.attr('dbid', item.data.dbid);
                        this.inputMap.put(item.data.dbid, inputView);
                        if(item.data.type === 'postalCode') {
                            inputView.on('onAddressSearched', this.onAddressSearched.bind(this));
                        }                        
                    }
                }
            }
            else {
                $(view).append(formItems.el);
            }
        },
        addConcept:function(conceptId, dbid){
            if(_.isUndefined(this.conceptSetUtil)) {
                this.conceptSetUtil = new Nis.ConceptSetUtil();
            }
            this.conceptSetUtil.addConcept(conceptId, dbid);
        },
        getInputFormGroup:function(dbid) {
            return this.inputMap.get(dbid);
        },
        getInput:function(dbid) {
            var fg = this.getInputFormGroup(dbid);
            if(fg)
                return fg.getInput();
        },
        setModel:function(model) {
            this.model = model;
            this.setModelAttrs(model.attributes);
            model.on('sync', this.onSync, this);
            this.listenTo(model, 'change', this.onModelChange.bind(this));
        },
        onModelChange:function(params){
            //console.log('onModelChange:', params);
            var changed = params.changed;
            for (var key in changed) {
               if (changed.hasOwnProperty(key)) {
                    var input = this.getInput(key);
                    if(input)
                        input.setValue(changed[key]);
                    //console.log(key, params[key]);
               }
            }            
        },
        getModel:function() {
            return this.model;
        },
        onSync:function(options) {
            console.log("onSync: ", options);
            if(options.attributes)
                this.setModelAttrs(options.attributes);
            else
                this.setModelAttrs(options);
        },
        save:function(){
            this.getModel().save();
        },
        setModelAttrs:function(attributes) {
            //if(this.conceptSetUtil) {
            //    attributes = this.conceptSetUtil.getDisplayNames(attributes);
            //}
            var view = $(this.el); //.find(this.content.el);
            if(this.options.readOnly) {
                for(var key in attributes) {
                    var inputView = this.inputMap.get(key);
                    if(inputView)
                        inputView.setValue(attributes[key]);
                }
                /*
                view = $(view).find('.nis-input');
                view.each(function(index, el) {
                    var attr = $(el).attr('dbid');
                    var value = attributes[attr];
                    //console.log("setModel: ",  index, ": ", attr, ", value:", value);
                    if(value) {
                        $(el).parent().parent().show();
                        $(el).text(value);
                    }
                    else {
                        $(el).parent().parent().hide();
                    }
                });
*/
            }
            else {
                for(var key in attributes) {
                    var inputView = this.inputMap.get(key);
                    if(inputView)
                        inputView.setValue(attributes[key]);
                }
            }
        },
        fetch:function(options, successCb, failCb) {
            this.model.fetch(options, successCb, failCb);
        },
        change: function (event) {
            var target = event.target;
            var change = {};
            var dbid = $(target).attr('dbid');            
            if(dbid) {
                var inputView = this.inputMap.get(dbid);
                var value = inputView.getValue(dbid);
                change[dbid] = value;
                console.log("change:", dbid, value);
                //change[dbid] = target.value;
                if(this.model) {
                    this.model.set(change);
                    var check = this.model.validateItem(dbid);
                    if(check) {
                        //$(target).validator();
                        //this.getInputFormGroup(dbid).$el.removeClass('has-error');
                        //$(target).parent().parent().removeClass('has-error');
                        this.setValidatedUi(true, dbid);
                        this.trigger('onValidated', dbid, value);
                    }
                }
            }
        },
        setValidate:function(rules){
            var el = this.$el;
            el.validator({
                rules:rules,
                highlight: function (element) {
                    $(element).closest('.control-group').removeClass('success').addClass('error');
                },
                success: function (element) {
                    element.text('OK!').addClass('valid')
                      .closest('.control-group').removeClass('error').addClass('success');
                },
            });
        },
        setValidatedUi:function(flag, dbid, msg) {
            var inputFormGroup = this.getInputFormGroup(dbid);
            inputFormGroup.setValidatedUi(flag, dbid, msg);
        },
        getFormItem:function(formItem) {
            var options = {
                //raw:this.getDefaultItemTemplate(formItem),
            };
            var data = _.extend({
                formGroupId:null,
                labelForName:null ,
                labelTitle:"" ,
                inputId:null ,
                type:null,
                inputType:null ,
                dbid:"" ,
                placeholder:null ,
                inputValue:"" ,
                dataId:null,
                type:'text',
                mandatory:false,
            }, formItem);
            if(formItem.label)
                data.labelTitle = formItem.label;
            if(data.inputId == null)
                data.inputId = data.dbid;
            if(data.labelForName == null)
                data.labelForName = data.dbid;
            if(data.placeholder == null)
                data.placeholder = data.labelTitle;
            if(data.formGroupId == null)
                data.formGroupId = "formGroup_"+data.inputId;
            if(data.dataId == null)
                data.formGroupId = "data_"+data.inputId;
            if(data.inputType)
                data.type = data.inputType;
            if(data.inputType == null)
                data.inputType = data.type;
            if(formItem.minlength)
                data.minlength = formItem.minlength;
            if(formItem.readOnly)
                options.readOnly = formItem.readOnly;
            if(formItem.controlLabel)
                data.controlLabel = formItem.controlLabel;

            options.data = data;
            //console.log('getFormItem:', options);
            if(formItem.buildCb)
                options.buildCb = formItem.buildCb;

            return options;
        },
        render:function() {
            return this;
        },
    }); // end of Uic.FormView

    _.extend(Uic.FormView.prototype, Uic.Input.HasAddressSearch);


})();
