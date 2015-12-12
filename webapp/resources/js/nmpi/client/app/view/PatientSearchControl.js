
(function () {
	'use strict';

	NisMVC.PatientSearchControl = Uic.CompositeView.extend({
        className:'form-inline row',
        events: {
            "change" : "onChange",
        },
        change:{
            patientFirstRrn:'',
            patientLastRrn:'',
        },
        initView:function(collection){
            this.$el.find('button').on('click', this.onClickButton.bind(this));
            this.collection = collection;
        },
        getCollection:function(){
            return this.collection;
        },
        onChange:function(){
            var target = event.target;
            //this.change = {};
            var dbid = $(target).attr('dbid');
            console.log("change:", dbid, target.value);
            this.change[dbid] = target.value;
            if(dbid === 'localId') {
                this.trigger('onChange', {
                    localId:target.value,
                    oid:NisMVC.App.getOidInfo().oid,
                });
                //this.change[dbid] = target.value;
                //this.trigger('onChange', this.change);
            }
            else {
                if(this.change.patientFirstRrn.length === 6 && this.change.patientLastRrn.length === 7) {
                    this.trigger('onChange', {
                        patientFirstRrn:this.change.patientFirstRrn,
                        patientLastRrn:this.change.patientLastRrn,
                    });
                }
            }
        },
        /*
        startSearch:function(options) {
            var searchOption ={
                hasQuery:true,
                queryParam:options,
                success:this.onSuccessSearch.bind(this),
            }
            this.getCollection().searchPatientByQuery(options);

        },
        onSuccessSearch:function(){
        },
        */
        onClickButton:function() {
            console.log('onClickButton:');
            this.trigger('onClickButton', this.change);
        },
        getDefaultTemplate:function() {
            var ret = ''
                +'<div class = "form-group" style="margin: 2px; !import;"><label>환자번호:</label>'
                +'</div>'
                +'<div id="intput1" class="form-group" style="margin: 2px; !import;">'
                    +'<input dbid="localId", type="input" class="form-control" id="" placeholder="" size="10">'
                +'</div>'
                +'<div class = "form-group" style="margin: 2px; !import;" ><label>주민번호:</label>'
                +'</div>'
                +'<div id="intput2" class="form-group" style="margin: 2px; !import;">'
                    +'<input dbid="patientFirstRrn", type="input" class="form-control" id="" placeholder="" size="6">'
                +'</div>'
                +'<span>-</span>'
                +'<div id="intput3" class="form-group" style="margin: 2px; !import;">'
                    +'<input dbid="patientLastRrn", type="input" class="form-control" id="" placeholder="" size="7">'
                +'</div>'
                +'<div id="searchButton" class="form-group" style="margin: 2px; !import;">'
                    +'<button type="button" class="btn btn-search" > 검색 </button>'
                +'</div>'
            return ret;
        },
	}); // end of NisMVC.MergeSearchLayout

})();

