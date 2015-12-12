/*global Backbone, NisMVC:true */

var Nis = Nis || {};

(function () {
    'use strict';

    Nis.UiInfo.AppHeader = Nis.UiInfo.extend ({
        initialize: function (options) {
            //console.log("initialize: options:", options);
        },
        getInfo:function(options) {
            var ret = {
                HeaderView:{
                    tagName:'div',
                    className:'navbar navbar-default',
                    HeaderTitle:{
                        tagName:'div',
                        className:'navbar-header',
                        renderOnInit:true,
                        replaceToParent:true,
                        data:{
                            title:'CCM Developer',
                        },
                    },
                    HeaderCollapse:{
                        tagName:'div',
                        className:'collapse navbar-collapse',
                        renderOnInit:true,
                        data:{
                            add:{
                                className:'register',
                                id:'register',
                                href:'#register',
                                title:'CCM 등록',
                            },
                            modify:{
                                className:'viewer',
                                id:'viewer',
                                href:'#viewer',
                                title:'CCM 확인',
                            },
                            delete:{
                                className:'evaluate',
                                id:'evaluate',
                                href:'#evaluate',
                                title:'CCM 심사',
                            },
                            preview:{
                                className:'preview',
                                id:'preview',
                                href:'#preview',
                                title:'preview',
                            },
                             logout:{
                                className:'logout',
                                id:'logout',
                                href:'#logout',
                                title:'로그아웃',
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
                +'  <a class="navbar-brand" href="#" id = "home"> {{title}} </a>';

            ret.HeaderView.HeaderCollapse.raw = 
                '    <ul class="nav navbar-nav">'
                +'        <li class={{add.className}}><a href={{add.href}}>{{add.title}}</a></li>'
                +'        <li class={{modify.className}}><a href={{modify.href}}><i class="icon-edit icon-white"></i>{{modify.title}}</a></li>'
                +'        <li class={{delete.className}}><a href={{delete.href}}><i class="icon-edit icon-white"></i>{{delete.title}}</a></li>'
                + '<li class={{login.className}}><a href={{login.href}}>{{login.title}}</a></li>'
                +'        <li class={{signin.className}}><a href={{signin.href}}><i class="icon-edit icon-white"></i>{{signin.title}}</a></li>'
                +'    </ul> '
                +'    <form class="navbar-form navbar-right"> '
                +'        <img id="loadingimage" src="resources/images/nis/ajax-loader.gif" style="display:none;margin-right:5px"/>'
                +'        <div class="form-group">'
                +'            <input id="searchText" type="text" class="search-query form-control dropdown-toggle" placeholder="search ccm name" '
                +'            autocomplete="off"><a href="#detail">상세검색</a>'
                +'          <a href={{logout.href}}><input type="button" value={{logout.title}} /></a>'
                +'        </div>'
                +'    </form>';


            return ret;
        },
    });
})();
