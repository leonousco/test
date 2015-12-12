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
                    className:'navbar navbar-inverse navbar-fixed-top',
                    HeaderTitle:{
                        tagName:'div',
                        className:'navbar-header',
                        renderOnInit:true,
                        replaceToParent:true,
                        data:{
                            title:'ValueSet Manager',
                        },
                    },
                    HeaderCollapse:{
                        tagName:'div',
                        className:'navbar-collapse collapse',
                        renderOnInit:true,
                        data:{
                            add:{
                                className:'addReq',
                                id:'addReq',
                                href:'#addReq',
                                title:'추가 요청',
                            },
                            modify:{
                                className:'modifyReq',
                                id:'modifyReq',
                                href:'#modifyReq',
                                title:'변경 요청',
                            },
                            delete:{
                                className:'deleteReq',
                                id:'deleteReq',
                                href:'#deleteReq',
                                title:'삭제 요청',
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
                +'    </ul>          '
                +'    <form class="navbar-form navbar-right"> '
                +'        <img id="loadingimage" src="resources/images/nis/ajax-loader.gif" style="display:none;margin-right:5px"/>                            '
                +'        <div class="form-group">'
                +'            <input id="searchText" type="text" class="search-query form-control dropdown-toggle" placeholder="search account name" autocomplete="off">'
                +'        </div>'
                +'        <div class="dropdown"></div>'
                +'    </form>';


            return ret;
        },
    });
})();
