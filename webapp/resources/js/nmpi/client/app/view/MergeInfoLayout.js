/*global NisMVC:true, Backbone */

var NisMVC = NisMVC || {};

(function () {
	'use strict';

	NisMVC.MergeInfoLayout = Uic.LayoutView.extend({
        className:'form-group',
        id:'page_contents',
        regions: {
            left: '#left',
            center: '#center',
            right: '#right',
            bottom: '#bottom',
        },
		initialize: function(options) {
			console.log('initialize:', options);
            Uic.LayoutView.prototype.initialize.call(this, options);
            var leftView = new NisMVC.MSearchContainer({
                type:"source",
                titleTop:"소멸 정보 환자 검색",
                titleBottom:"환자정보",
            });
            this.left.show(leftView);
            leftView.$el.css({
                "margin-right":"20px",
            });
            var rightView = new NisMVC.MSearchContainer({
                type:"target",
                titleTop:"유지 정보 환자 검색",
                titleBottom:"환자정보",
            });
            this.right.show(rightView);
            rightView.$el.css({
                "margin-left":"20px",
            });

            this.showSearchButton();
		},
        showSearchButton:function() {
            var button = new Uic.SButton({
                class:"btn-primary btn",
                data: {
                    text:"병합",
                    enable:true,
                    icon : "arrow-right",
                },
            })
            button.on('click', this.onClickMergeButton.bind(this));
            this.center.show(button);

            button.$el.css({
                "position" : "absolute;",
                "top" : "240px",
                "font-size" : "18px",
                // "margin-left":"10px",
                // "margin-right":"10px",
            });
        },
        onClickMergeButton:function() {
            console.log("onClickMergeButton:");
            var leftp = this.left.currentView.getLocalIdInfo();
            var rightp = this.right.currentView.getLocalIdInfo();
            var options = {
                from:leftp,
                to:rightp,
                success:this.onSuccessMerge.bind(this),
                error:this.onErrorMerge.bind(this),
            };
            var model = new Nis.Model.PatientRegistry();
            model.sendMergePatientWithOid(options);
        },

        onSuccessMerge:function(options) {
            console.log("onSuccessMerge:", options);
            var collection = this.result.currentView.getCollection();
            //var result = collection.parse(response);
            var result = response;
            if(response.body)
                result  =response.body;
            collection.reset(result);
        },
        onErrorMerge:function(options) {
            console.log("onErrorMerge:", options);
        },

        getDefaultTemplate:function() {
            var ret =''
                +'<div class="form-group">'
                    +'<div id = "left" class = "col-sm-5"> '
                    +'</div>'
                    +'<div id = "center" class = "col-sm-1">tt'
                    +'</div>'
                    +'<div id = "right" class = "col-sm-5"> '
                    +'</div>'
                +'</div>'
                +'<div class="row" id=bottom_merge>'
                    +'<div id = "bottom" class = "row-sm-12"> '
                    +'</div>'
                +'</div>'
            return ret;
        },

    })
})();

