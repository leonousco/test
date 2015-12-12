
(function () {
    'use strict';

    Uic.NoticeModal = Uic.LayoutView.extend({
        className: 'modal',
        regions: {
            header: "#header",
            content: "#content",
            footer: "#footer",
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
            this.setFooter(this.options.footer);
        },
        initOptions:function(options) {
            this.options = _.extend({
                raw:this.getDefaultTemplate(options),
                data:{},
                footer:this.getDefaultFooter(options),
            }, options);
        },
        getDefaultTemplate:function(options) {
            if(options && options.raw)
                return options.raw;
            var ret =
                    '<div class="modal-dialog"> modal-dialog </div>'
                        +'<div class="modal-content">'
                            +'<div id="header" class="modal-header"> </div>'
                            +'<div id="content" class="modal-body" > </div>'
                            +'<div id="footer" class="modal-footer"> </div>';
                        +'</div>'
                    +'</div>'
            return ret;
        },
        setContent:function(view) {
            this.content.show(view);
        },
        setHeader:function(view) {
            this.header.show(view);
        },
        getContent:function() {
            return this.content.currentView;
        },
        setFooter:function(view) {
            this.footer.show(view);
        },
        getDefaultFooter:function() {
            var view = new Uic.Buttons({buttons:this.getDefualtButtonsInfo()});
            var self = this;
            view.on('click', function(id, text, button) {
                console.log("testButtons:", id, text, button);
                if(id === 'saveNotice') {
                    // self.trigger('click.saveNotice', self);
                    self.onSaveNoticeClick(self);
                }
                else if(id === 'cancel') {
                    // self.trigger('click.cancel', self);
                    self.close();
                }
            });
            return view;
        },
        getDefualtButtonsInfo:function() {
            var buttons = [
                {
                    data: {
                        buttonId:"saveNotice",
                        buttonClass:"btn",
                        buttonTitle:"작성",
                    },
                },
                {
                    data: {
                        buttonId:"cancel",
                        buttonClass:"btn",
                        buttonTitle:"취소",
                    },
                },
            ];
            return buttons;
        },
        open:function(cb) {
            this.$el.modal(_.extend({
                keyboard: this.options.allowCancel,
                backdrop: this.options.allowCancel ? true : 'static'
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
        },
        onSaveNoticeClick:function(button){
            console.log("onSaveNoticeClick: ", button);
            var titleInput = document.getElementById('noticeTitle');
            var contentsInput = document.getElementById('noticeContents');
            var now = this.formatDate(new Date());
            var cData = {
                dateCreated:'',
                dateModified:"",
                dateVoided:"",
                userCreated:localStorage.getItem("id"),
                contents:contentsInput.value,
                title:titleInput.value,
                createdDate:now,
            };
            var cUrl = "http://192.168.0.153:8880/ccm_server/api/v1/token/no-token/CCMNotice";
            var options = {
                success:this.onSuccess.bind(this),
            };
            $.ajax({
                type:"POST",
                url:cUrl,
                data:JSON.stringify(cData),
                contentType:"application/json",
                success:options.success,
            });
        },
        onSuccess:function(){
            this.close();
            location.reload();
        },
        formatDate:function(date) {
            var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            hour = '' + d.getHours(),
            minute = '' + d.getMinutes(),
            second = '' + d.getSeconds();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
            if(hour.length < 2)
                hour = '0'+hour;
            if(minute.length < 2)
                minute = '0' + minute;
            if(second.length < 2)
                second = '0' + second;

            return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':');
        },

    });

    Uic.Modal.count = 0;


})();
