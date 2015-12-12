/*global Backbone, NisMVC:true */

var Nis = Nis || {};

(function () {
    'use strict';

    Nis.UiInfo.AppHeader = Nis.UiInfo.extend ({
        initialize: function (options) {
            console.log("initialize: options:", options);
        },
        getInfo:function(options) {
            var ret = {
                HeaderView:{
                    tagName:'div',
                    className:'navbar navbar-inverse navbar-fixed-top',
                    HeaderTitle:{
                        tagName:'div',
                        className:'navbar-header',
                        renderOnInit:true,
                        replaceToParent:true,
                        data:{
                            href:'',
                            title:'CCM Manager',
                        },
                    },
                    HeaderCollapse:{
                        tagName:'div',
                        className:'navbar-collapse collapse',
                        renderOnInit:true,
                        data:{
                            manager:{
                                className:'manager',
                                id:'manager',
                                href:'#manager',
                                title:'관리자 관리',
                            },
                            user:{
                                className:'user',
                                id:'user',
                                href:'#user',
                                title:'사용자 관리',
                            },
                            ccm:{
                                className:'ccm',
                                id:'ccm',
                                href:'#ccm',
                                title:'CCM 관리',
                            },
                            approval:{
                                className:'approval',
                                id:'approval',
                                href:'#approval',
                                title:'가입 승인',
                            },
                            userInfo:{
                                className:'userInfo',
                                id:'userInfo',
                                href:'#userInfo',
                                title:'회원 정보',
                            },
                            requestDrop:{
                                className:'requestDrop',
                                id:'requestDrop',
                                href:'#requestDrop',
                                title:'탈퇴 요청',
                            },
                            logout:{
                                className:'logout',
                                id:'logout',
                                href:'#logout',
                                title:'로그아웃',
                            },
                            addManager:{
                                className:'addManager',
                                id:'addManager',
                                href:'#addManager',
                                title:'관리자 추가',
                            },
                            checkManager:{
                                className:'checkManager',
                                id:'checkManager',
                                href:'#checkManager',
                                title:'관리자 확인',
                            },
                        },
                    },
                },
            };     
            ret.HeaderView.raw = 
                '<div class="container">'
                +'  <div class="navbar-header"> </div>'
                +'  <div class="navbar-collapse collapse"> </div>'
                +'</div>';          

            ret.HeaderView.HeaderTitle.raw = 
                '  <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">'
                +'    <span class="icon-bar"></span>'
                +'    <span class="icon-bar"></span>'
                +'    <span class="icon-bar"></span>'
                +'  </button>'
                +'  <a class="navbar-brand" href={{href}}> {{title}} </a>';

            ret.HeaderView.HeaderCollapse.raw = 
                '    <ul class="nav navbar-nav">'
                +'        <li class={{manager.className}}><a href={{manager.href}}>{{manager.title}}</a></li>'
                +'        <li class={{user.className}}><a class="dropdown-toggle" data-toggle="dropdown" href={{user.href}}><i class="icon-edit icon-white"></i>{{user.title}}</a>'
                +               '<ul class="dropdown-menu">'
                +                   '<li class={{approval.className}}><a href={{approval.href}}>{{approval.title}}</a></li>'
                +                   '<li class={{userInfo.className}}><a href={{userInfo.href}}>{{userInfo.title}}</a></li>'
                +                   '<li class={{requestDrop.className}}><a href={{requestDrop.href}}>{{requestDrop.title}}</a></li>'
                +               '</ul>'
                +         '</li>';

            if(localStorage.getItem("roleName") != Nis.Code.PermissionRole.ccmAdmin){
                ret.HeaderView.HeaderCollapse.raw += '<li class={{ccm.className}}><a href={{ccm.href}}><i class="icon-edit icon-white"></i>{{ccm.title}}</a></li>';
            }

            ret.HeaderView.HeaderCollapse.raw = ret.HeaderView.HeaderCollapse.raw
                +'    </ul>          '
                +'    <form class="navbar-form navbar-right"> '
                +'          <span id="currentUser" style="color:white"></span>'
                +'          <a href={{logout.href}}><input type="button" value={{logout.title}} /></a>'
                +'    </form>';


            return ret;
        },
    });
})();
