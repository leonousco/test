
(function () {
   'use strict';

   Uic.LoginDialog = Uic.LayoutView.extend({
    className: 'modal fade',
    attributes: {
        //tabindex:"-1",
        role:"dialog",
        //"aria-hidden":"true",
    },
    regions: {
        header: "#modal-header",
        content: "#modal-body",
        organization: '#organization',
    },
    events: {
        "change"        : "onChange",
    },        
    collection:new Nis.Model.OrganizationList(),
    initialize: function (options) {
        this.initOptions(options);
        this.renderView();
        var body = this.$el.find('#modal-body');
        this.orgSelector = new Uic.SelectPicker({});
        $(body).append($(this.getCredentialTemplate(options)));
        this.$el.find('#signin').on('click', this.onClickSingin.bind(this));
        if(this.options.isClient) {
            this.collection.getPagedList({}, this.onSuccessOrg.bind(this), this.onErrorOrg.bind(this));
        }
        this.$el.find('input').keyup(this.onKeyupInput.bind(this));
        this.disableSignButton(true);  
    },
    initOptions:function(options) {
        this.options = _.extend({
            isClient:true,
            raw:this.getDefaultTemplate(),
            data:{},
        }, options);
    },
    disableSignButton:function(enable) {
        this.$el.find('#signin').prop('disabled', enable);
    },
    onChange:function(event){
        var target = event.target;
        this.checkValid();
        //console.log("onChange:", target.value);
    },
    onKeyupInput:function(){
        this.checkValid();
    },
    checkValid:function(){
        var userId = this.$el.find('#userId').val();
        var passwd = this.$el.find('#passwd').val();        
        //console.log("onKeyupInput:", userId, passwd);
        if(userId.length > 1 && passwd.length > 1 && this.checkSelectedOrg())
            this.disableSignButton(false);  
        else 
            this.disableSignButton(true);  
    },
    checkSelectedOrg:function(){
        if(this.options.isClient && this.organization.currentView) {
            var organizationInfo = this.getOrganizationInfo();
            if(organizationInfo) {
                return true;
            }
            return false;
        }
        return true;
    },
    open:function(cb) {
        //var height = '300px';
        var height = 'auto';
        //if(this.options.isClient){
            //height = '400px';
        //    height = 'auto';
        //}
        $('.modal-body',this.$el).css({width:'auto',height:height, 'max-height':'100%'});
        this.preventClose();
        this.$el.modal({
            keyboard: false,
            backdrop: 'static',                
        });
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

        Uic.LoginDialog.count--;
    },
    preventClose: function() {
            this._preventClose = true;
    },
    getOrganizationInfo:function(){
        var oid = this.organization.currentView.getValue();
        var hospitalName = this.organization.currentView.getSelectedLabel();
        var organizationInfo = this.collection.findWhere({oid:oid});
        return organizationInfo;
    },
    onClickSingin:function() {
        var userId = this.$el.find('#userId').val();
        var passwd = this.$el.find('#passwd').val();
        var oid = '';
        if(this.options.isClient && this.organization.currentView) {
            oid = this.organization.currentView.getValue();
            var hospitalName = this.organization.currentView.getSelectedLabel();
            var organizationInfo = this.getOrganizationInfo();
            if(organizationInfo == null)
                return;
            NisMVC.App.saveOrgInfo(organizationInfo.attributes);
            console.log("onClickSingin:", oid, hospitalName, organizationInfo.attributes);
            NisMVC.App.saveOidInfo({
                oid:oid,
                hospitalName:hospitalName,
                userId:userId,
            });
        }
        else {
            //oid = 'seoul';
            oid = '2.16.410.123456';
            NisMVC.App.saveOidInfo({
                oid:oid,
                hospitalName:"SSIS",
                userId:userId,
            });
        }
        console.log("onClickSingin:", userId, passwd);
        var loginClient = new Nis.Model.Login({
            username:userId,
            password:passwd,
            oid : oid,
            //location:this.options.loginLocation,
        });
        var options = {
            location:this.options.loginLocation,
            success:this.onSuccessLogin.bind(this),
            error:this.onErrorLogin.bind(this),
        }
        loginClient.login(options);
    },
    onSuccessLogin:function(options){
        //console.log("onSuccessLogin:", options);
        if(options.userInfo.roleName != NisMVC.App.getRequredAccessLevel()) {
            console.log("onSuccessLogin:", options.userInfo.roleName);
            delete options.location;
            this.onErrorLogin(Uic.LoginDialog.errNet, err, e);
        }
        else {
            NisMVC.App.userInfo = options.userInfo;
            this.hide();            
        }
    },
    onErrorLogin:function(err, e, options){
        console.log("onErrorLogin:", options, e);
        this.onError(Uic.LoginDialog.errNet, err, e);
        //this.showAlert('login fail !!!', 'error');
    },
    onSuccessOrg:function(resp){
        //console.log("onSuccessOrg:", resp);
        var orgList = resp;
        if(resp.body)
            orgList = resp.body;
        var options = {items:[]};
        for(var i=0;i<orgList.length;i++) {
            options.items.push({
                value:orgList[i].oid,
                text:orgList[i].name,
            })
        }
        options.className = 'form-control input-lg selectpicker show-tick';
        var view = new Uic.SelectPicker(options);
        this.organization.show(view);
        //console.log("onSuccessOrg:", view.$el.html());
    },
    onErrorOrg:function(resp){
        console.log("onErrorOrg:", resp);
        this.onError(Uic.LoginDialog.errOrg, resp);
    },
    onError:function(errCode, err, options){
        var msg = this.getErrMessage(errCode, err, options);
        this.showAlert(msg);
        this.disableSignButton(true);  
    },
        showAlert:function(options) {
            $('#login_alert').append(
                '<div class="alert fade in alert-block alert-danger">' +
                '<button type="button " class="close" data-dismiss="alert">' +
                '&times;</button>' 
                + '<h4 class="alert-heading">'+options.title+'</h4>'
                + options.message 
                + '<strong>  '+options.errCode+'</strong>'
                + '</div>');   

        },
        hide: function () {
            console.log("hide:");
            this.$el.modal('hide');
        },
        getDefaultTemplate:function(options) {
            if(options && options.raw)
                return options.raw;
            var ret =''
            +'<div class="modal-dialog" data-backdrop="static" data-keyboard="false" >'
            +'<div class="modal-content">'
            +'<div id="modal-header" class="modal-header">'
            +'<h1 class="text-center">Login</h1>'
            +'</div>'
            +'<div id="modal-body" class="modal-body" >'
            +'<div id="organization" class="form-group">'
            +'</div>'                                
            +'</div>'    
            +'<div id="login_alert"></div>'                        
            +'</div>'                        
            +'</div>';
            return ret;
        },
        getCredentialTemplate:function(options) {
            var ret =''
            +            '<div class="form-group">'
            +              '<input id="userId" type="text" class="form-control input-lg" placeholder="User ID">'
            +            '</div>'
            +            '<div class="form-group">'
            +              '<input id="passwd"  type="password" class="form-control input-lg" placeholder="Password">'
            +            '</div>'
            +            '<div class="form-group">'
            +              '<button id="signin" class="btn btn-primary btn-lg btn-block">Sign In</button>';
            if(options.hasRegisterOnLogin)
                ret +=         '<span class="pull-right"><a href="#register">Register</a></span><span><a href="#help">Need help?</a></span>';
            ret +=            '</div>';
            return ret;
        },
        getErrMessage:function(errCode, err, options) {
            var ret = {
                title:'로그인 실패',
                message : 'Unknown Error',
                errCode : '  (ERRCD: ' + err + '_'+ errCode + ')',
            };
            switch(errCode) {
                case Uic.LoginDialog.errOrg: {
                    ret.message = 'Net Error';
                }
                break;
                case Uic.LoginDialog.errAcl: {
                    ret.message = '사용권한이 없습니다.';
                }
                break;
                case Uic.LoginDialog.errNet: {
                    if(err === Nis.Model.Login.ERR_unmatchRole) {
                        ret.message = '사용권한이 없습니다';
                    }
                    else if(err === Nis.Model.Login.ERR_failGetRole) {
                        ret.message = 'Net Error';
                    }                
                    else if(err === Nis.Model.Login.ERR_failGetToken) {
                        ret.message = 'Net Error';
                    }                
                    else if(err === Nis.Model.Login.ERR_failGetKey) {
                        ret.message = 'Net Error';
                    }                                    
                }
                break;
            }
            return ret;
        },

    }); // end of Uic.LoginDialog

Uic.LoginDialog.count = 0;

Uic.LoginDialog.errNet = 100;
Uic.LoginDialog.errOrg = 110;
Uic.LoginDialog.errAcl = 120;


})();

