
(function () {
	'use strict';

	NisMVC.PatientsTable = Uic.TableView.extend({
		initialize: function(options) {
			console.log('initialize:', options);
            Uic.TableView.prototype.initialize.call(this, options);

            var columns = (new Nis.UiInfo.ItemUtil({
                items:Nis.Model.Patient.columns
            })).select(['patientName','dateOfBirth', 'gender', 'patientPhoneNumber', 'email']);

            var tableOptions = {
                collection:options.collection,
                columns:columns,
            };

            if(options.hasQuery) {
                tableOptions.hasQuery = options.hasQuery;
                tableOptions.queryParam =  options.queryParam;
            }

            var table = new Uic.Table(tableOptions);
            table.on('click:table:item', this.onClickTableItem.bind(this));
            //var view = new Uic.TableView({pageSize:2});

            this.setTable(table);
            this.setCurrentPage(0);
		},
        onClickTableItem:function(model, view, options) {
            this.trigger('click:table:item', model, view, options);
        }
    });


})();
