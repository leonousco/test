
(function () {
    'use strict';

    Uic.Modal = Uic.LayoutView.extend({
        className: 'modal fade',
        attributes: {
            role:'dialog',
            style:'margin:auto; width:600px;'
        },
        regions: {
            header: "#modal-header",
            content: "#modal-content",
            progressBar: '#progressBar',
            footer: "#modal-footer",
        },
        events: {
            'click .close': function(event) {
                event.preventDefault();
                this.trigger('cancel');
                if (this.options.content && this.options.content.trigger) {
                    this.options.content.trigger('cancel', this);
                }
            },
        },
        initialize: function (options) {
            this.initOptions(options);
            this.renderView();
            if(this.options.footer) {
                this.setFooter(this.options.footer);                
            }            
            if(options.showProgress) {
                this.showProgress({show:options.showProgress});
            }
        },
        initOptions:function(options) {
            this.options = _.extend({
                raw:this.getDefaultTemplate(options),
                data:{},
                footer:this.getDefaultFooter(options),
            }, options);
        },
        clearViews:function(){
            this.header.empty();
            this.content.empty();
            this.progressBar.empty();
            this.footer.empty();
        },
        showProgress:function(options) {
            if(options.show) {
                var view = new Uic.Progress();
                this.progressBar.show(view);         
                view.initView();       
            }
            else {
                this.progressBar.empty();
            }
        },
        getDefaultTemplate:function(options) {
            if(options && options.raw)
                return options.raw;
            var ret =
                    '<div class="modal-dialog" data-backdrop="static" data-keyboard="false"> modal-dialog </div>'
                        +'<div class="modal-content">'
                            +'<div id="modal-header" class="modal-header" style="background-color:#428bca;color:#e5e5e5;"> </div>'
                            +'<div id="modal-body" class="modal-body" >'
                                +'<div id="modal-content" >'
                                +'</div>'
                                //+'<div id="progressBar" class="progress" style="margin:0;">'
                                +'<div id="progressBar" style="margin:0;">'
                                +'</div>'
                            +'</div>'
                            +'<div id="modal-footer" class="modal-footer"> </div>'
                        +'</div>'
                    +'</div>'
            return ret;
        },
        setContent:function(view) {
            this.content.show(this.createView(view));
        },
        setHeader:function(view) {
            this.header.show(this.createView(view));
        },
        getContent:function() {
            return this.content.currentView;
        },
        setFooter:function(view) {
            this.footer.show(view);
        },
        createView:function(options){
            if(options instanceof Backbone.View) {
                return options;
            }            
            if(_.isUndefined(options))
                return null;
            var view = new Uic.View();
            if(options instanceof jQuery) {
                view.setElement(options);
            }
            else if(_.isString(options)) {
                view.$el.html(options)
            }
            else if(options && options.title) {
                view = new Uic.View({
                    raw:'<h2>'+options.title+'</h2>',
                });
            }
            return view;
        },

        getDefaultFooter:function(options) {
            if(! _.isUndefined(options.hasFooter) && options.hasFooter == false)
                return null;
            if(options && options.footer)
                return options.footer;
            var view = new Uic.Buttons({buttons:this.getDefualtButtonsInfo()});
            var self = this;
            view.on('click', function(id, text, button) {
                console.log("testButtons:", id, text, button);
                if(id === 'ok') {
                    self.trigger('click.ok', self);
                    self.close();
                }
                else if(id === 'cancel') {
                    self.close();
                }
            });
            return view;
        },
        getDefualtButtonsInfo:function() {
            var buttons = [
                {
                    data: {
                        buttonId:"ok",
                        buttonClass:"btn",
                        buttonTitle:"OK",
                    },
                },
                {
                    data: {
                        buttonId:"cancel",
                        buttonClass:"btn",
                        buttonTitle:"Cancel",
                    },
                },
            ];
            return buttons;
        },
        open:function(cb) {
            this.$el.modal(_.extend({
                keyboard: false,
                backdrop: 'static',
                //keyboard: this.options.allowCancel,
                //backdrop: this.options.allowCancel ? true : 'static'
            }, this.options));
            if(cb) {
                this.on('click.ok', cb);
            }
        },
        close: function() {
          var self = this,
              $el = this.$el;

          //Check if the modal should stay open
          if (this._preventClose) {
            this._preventClose = false;
            return;
          }

          $el.one('hidden.bs.modal', function onHidden(e) {
            // Ignore events propagated from interior objects, like bootstrap tooltips
            if(e.target !== e.currentTarget){
              return $el.one('hidden', onHidden);
            }
            self.remove();

            if (self.options.content && self.options.content.trigger) {
              self.options.content.trigger('hidden', self);
            }

            self.trigger('hidden');
          });

          $el.modal('hide');

          Uic.Modal.count--;
        },

        preventClose: function() {
          this._preventClose = true;
        }

    });

    Uic.Modal.count = 0;


})();
