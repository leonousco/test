(function () {
    'use strict';

    //Nis.View.SearchControlBase = Uic.CompositeView.extend({
        Nis.View.SearchControlBase = Uic.View.extend({
        tagName:'div',
        className:'form-group',
        events: {
            "change"        : "onChange",
        },        
        widgetMap:new Nis.Map(),
        selected:{},
        initialize: function (options) {
            this.collection = options.collection;
            Uic.CompositeView.prototype.initialize.call(this, options);
        },
        getColumn:function(dbid){
            return this.collection.getItemUtil().getColumn(dbid);
        },
        appendView:function(targetId, view) {
            var target = this.$el.find('#' + targetId);
            target.append(view.el);      
            this.widgetMap.put(targetId, view);
        },
        onChange:function(event){
            var target = event.target;
            var change = {};
            var dbid = $(target).attr('dbid');
            this.selected[dbid]=target.value;
            console.log('onChange:', this.selected);
            this.trigger('onChange', this.selected, dbid);
        },
        getQueryParam:function(){
            return this.selected;
        },
        makeSearchButton:function() {
            var options = {                
                data: {
                    buttonId:'Search',
                },
            };
            var view = new Uic.SButton(options);
            view.render();
            view.$el.addClass("form-control");
            view.on('click', this.onClickButton.bind(this));
            return view;
        },
        makeTextInputByDbid:function(dbid) {
            return this.makeTextInputByColumn(this.getColumn(dbid));
        },
        makeTextInputByColumn:function(column) {
            var options = {
                attributes: {
                    dbid:column.dbid,
                    type:'text',
                    label:column.label,
                    placeholder:column.label, 
                },
                data: {
                    dbid:column.dbid,
                },
            };
            return this.makeTextInput(options);
        },
        makeTextInput:function(options) {
            var inputView = new Uic.Input(options);
            inputView.$el.addClass("form-control");
            return inputView;
        },
        makeSelect:function(conceptId, dbid, label) {
            var options = {
                conceptId:conceptId,
                label:label,
                attributes:{
                    dbid:dbid,
                },
            };
            var inputView = new Uic.SelectPicker(options);
            inputView.$el.addClass("form-control");
            return inputView;
        },
        onClickButton:function() {
            this.trigger('click.search', this.selected);
            //this.trigger('click.search', 'localId', oid, localId);
        },
        getInputValue:function(id){
            var el = this.$el.find(id);
            return $(el).val();
        },
        getDefaultTemplate:function(options) {
            var ret =''
                +'      <form id="menu" class="form-inline">';
                for(var i=0; i<this.items.length; i++) {
                    ret += this.getItemTemplate(this.items[i]);
                }
                +'      </form>';
                return ret;
        },
        getItemTemplate:function(id){
            var ret = '<div id="'+id+'" class="form-group" style="margin-right: 5px; !import;">'
                +'          </div>'
            return ret;
        },

    });  //Nis.UiInfo.SearchLayout

})();
