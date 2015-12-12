
(function () {
	'use strict';

	Nis.View.HospitalBottom = Nis.View.VerticalLayout.extend({
		initialize: function(options) {
			console.log('initialize:', options);
            Nis.View.VerticalLayout.prototype.initialize.call(this, {id:'HospitalBottom'});
            this.model = options.model;
            this.showTitle("환자 세부 정보");
            this.showView('bottom');
		},
        makeView:function(position) {
            if(position === 'bottom') {
                var options = {
                    items:Nis.UiInfo.Patient.items,
                };
                var view = new Uic.FormView(options);
                if(! _.isUndefined(this.model))
                    view.setModel(this.model);

                var formLayout = new Uic.FormLayout();
                formLayout.addGroups({
                    groups:[
                        {                        
                            title:'bbbbb',
                            body:view,
                        }
                    ],
                });

                //return view;
                return formLayout;
            }
        },
    })
})();

