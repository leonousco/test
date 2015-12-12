/*global Backbone, NisMVC:true */

var Nis = Nis || {};

(function () {
    'use strict';

    Nis.Model.AppInfo = Nis.UiInfo.extend ({
        title:"USER Manager",
        subTitle:"User information",
        initialize: function (options) {
            console.log("initialize: options:", options);
        },
        rootLayout:function(options) {
            var ret = {
                regions: {
                    header: '#header',
                    contents: '#contents',
                    footer: '#footer'
                },                
            };
            return ret;
        },
        contentsLayout:function(modeParam) {
            var self = this;
            var titles = {
                main:'Main', 
                add:'add',                
            };            
            var currentPage = (currentPage == null || currentPage =="undefined" ) ? 0 :currentPage ;
            var mode = 'main';
            if(modeParam)
                mode = modeParam;
            var ret = {
                regions: {
                    page_header: '#page_header',
                    page_contents: '#page_contents',
                    contents: '#contents',
                    bottom_contents:'#bottom_contents',
                                       
                },
                data : {
                    
                   page_title: titles[mode],
                   className:'useraddReq',                                           
                   currentPage:currentPage                       
                    
                }  ,
                tagName:'div',              
                LoginUi:function() {
                    return self.LoginUi();
                },
            };
                        
                ret.raw = 
                    //'<div id="page_header" class="page-header"> <h3>{{page_title}} </h3></div>'
                    '  <div id="page_contents" class="col-sm-11"> '
                    //+'    <div id="page_contents" class="container"> '
                    +'      <div id="contents" class="col-sm-11"></div>'                                                                                
                    +'      <div id="bottom_contents" class="col-sm-11"></div>';
                    +'</div>';                                

                //<a href={{href}}>add</div>'                        

                                    
            //ret.data = this.pageTitle(titles[mode]); //{page_title:titles[mode]};
            return ret;            
        },        
        pageTitle:function(title) {
            return {page_title:title};
        },
        LoginUi:function(options) {
            this.uiInfo = new Nis.Model.LoginUi(options);
            return this.uiInfo;
        }
    });  //Nis.Model.AppInfo


})();
