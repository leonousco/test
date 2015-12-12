/*global Backbone, NisMVC:true */

var Nis = Nis || {};

(function () {
    'use strict';

    Nis.Model.AppInfo = Nis.UiInfo.extend ({
        title:"CCM Manager",
        subTitle:"",
        //constructor: function() {
        //    console.log("constructor:");
        //},        
        initialize: function (options) {
            console.log("initialize: options:", options);

            NisMVC.uiStore.rootLayout = this.rootLayout();
            NisMVC.uiStore.contentsLayout = this.contentsLayout();
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
                add:'Add Req',
                modify:'Modify Req',
                delete:'Delete Req',
            };
            var mode = 'main';
            if(modeParam)
                mode = modeParam;
            var ret = {
                regions: {
                    page_header: '#page_header',
                    page_contents: '#page_contents',
                    left_contents: '#left_contents',
                    right_contents: '#right_contents',
                    right_sub1_contents: '#right_sub1_contents',
                    right_sub2_contents: '#right_sub2_contents',
                },  
                tagName:'div',              
                entityUi:function() {
                    return self.organizationUi();
                },
            };
            ret.raw = 
                '<div id="page_header" class="page-header"> <h3>{{page_title}} </h3></div>'
                +'  <div id="page_contents" class="col-sm-12"> '
                //+'    <div id="page_contents" class="container"> '
                +'      <div id="left_contents" class="col-sm-6"></div>'
                +'      <div id="right_contents" class="col-sm-6">'                
                +'          <div id="right_sub1_contents" class="row-sm-6"></div>'                
                +'          <div id="right_sub2_contents" class="row-sm-6"></div>'                
                +'      </div>';
                +'  </div>';
                +'</div>';
            ret.data = this.pageTitle(titles[mode]); //{page_title:titles[mode]};

            return ret;            
        },
        pageTitle:function(title) {
            return {page_title:title};
        },
    });  //Nis.Model.AppInfo


})();
