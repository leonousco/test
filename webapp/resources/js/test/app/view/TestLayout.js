/*global NisMVC:true, Backbone */

var NisMVC = NisMVC || {};

(function () {
	'use strict';

	NisMVC.TestLayout = Uic.LayoutView.extend({
		tagName:'div',
		className:'col-sm-12',
		id:'page_contents',
		regions: {
		    north: '#north',
		    south: '#south',
		},                		
		menuMap:null,
		getDefaultTemplate:function(options) {
			var ret =
	                '<div id="north" class="row-sm-5"></div>'
	                +'<div id="south" class="row-sm-2"></div>';
	                +'<div id="south" class="row-sm-5"></div>';
			return ret;
		},
		initialize: function(options) {
			console.log('initialize:', options);
			this.super().initialize.call(this, options);
			this.showMenu(this.param);
			this.showResult(this.param);
		},
		showTestView:function(view) {
			this.south.show(view);
		},
		onSelected:function(name) {
			this.menuMap.get(name)(name);
		},
		addMenu:function(view, name, cb) {
			view.addItem(name);
			this.menuMap.put(name, cb.bind(this));
		},
		showMenu:function(param) {
			console.log('showMenu:');
			var view_args = {
				data: {
					button: {
						title:'test',
						class:'btn btn-default btn-lg dropdown-toggle',
						data: {
							title:'test',
						},
					},
				},
			};


			var self = this;

			var view = new Uic.DropDownButton(view_args, {testAarg:'ttt'});
			this.menuMap = new Nis.Map();
			this.addMenu(view, 'SButton', this.testSButton);
			this.addMenu(view, 'Modal', this.testModal);
			this.addMenu(view, 'Well', this.testWell);
			this.addMenu(view, 'CollapseButton', this.testCollapseButton);
			this.addMenu(view, 'Table', this.testTable);
			this.addMenu(view, 'WaitingDialog', this.testWaitingDialog);
			this.addMenu(view, 'TableView', this.testTableView);
			this.addMenu(view, 'SelectPicker', this.testSelectPicker);
			this.addMenu(view, 'FormView', this.testFormView);
			this.addMenu(view, 'FormLayout', this.testFormLayout);
			this.addMenu(view, 'Buttons', this.testButtons);
			this.addMenu(view, 'Uic.Modal', this.testUicModal);
			this.addMenu(view, 'RadioView', this.testRadioView);
			this.addMenu(view, 'CountryPicker', this.testCountryPicker);
			this.addMenu(view, 'LoginDialog', this.testLoginDialog);
			this.addMenu(view, 'AccordionPanel', this.testAccordionPanel);
			this.addMenu(view, 'Input.Phone', this.testInputPhone);
			this.addMenu(view, 'AddressSearch', this.testAddressSearch);

			view.on(view.triggerSelected, function(args) {
				console.log("dropdown Selected: ", args);
				self.onSelected(args);
			});

			console.log("-------------->>>>>", view);
			this.north.show(view);
			console.log("<<<<<--------------", view);
		},
		showResult:function(param) {
			console.log('showResult:');
			this.south.show(new Uic.HBView('showResult'));
		},
		testAddressSearch:function(param) {
			var view = new Uic.AddressSearch();
			view.on('onComplete', function(addr){
				console.log('testAddressSearch:', addr);
			});
			this.showTestView(view);	
			//view.initView();
		},
		events: {
			"change"        : "onChange",
		},		
		testInputPhone:function(param) {
			var view = new Uic.Input.Phone({
				type:'tel',
			});
			view.on('change', function(event) {
				var target = event.target;
				console.log('testInputPhone:', target.getValue());
				// body...
			});
			this.showTestView(view);	
			//view.setValue('01112345678');
			view.setValue('03112345678');
			//view.initView();
		},
		onChange:function(event){
			console.log('onChange:', event);
		},
		testAccordionPanel:function(param) {
			var view = new Uic.AccordionPanelView({
				id:'test',
			});
			this.showTestView(view);			
			view.addPanelView({
				title:'sub_title1',
				items:[
					{
						title:'sub_title1-1',
					},
					{
						title:'sub_title1-2',
					},
				],
			});


			var apanel = view.addItem({
				title:'sub_title',
			});


			var view2 = new Uic.AccordionPanelView({
				id:'test2',
				items:[
					{
						title:'sub_title2-1',
					},
					{
						title:'sub_title2-2',
					},
				],
			});
			var apanel2 = view2.addItem({
				title:'sub_title2-3',
				body:'afafafafafa',
			});

			apanel.setBodyView(view2);

		},
		testLoginDialog:function(param) {
			var view = new Uic.LoginDialog($);
			view.open();
		},
		testCountryPicker:function(param) {
			var options = {
				raw:'<div class="bfh-selectbox bfh-states" data-country="US" data-state="CA"></div>',
				data:'',
			};
			var view = new Uic.View(options);
			var bf = view.$('.bfh-selectbox');
			view.$('.bfh-selectbox').bfhstates({country:'US',state:'CA'});
			view.on('click.radio', function(value, element) {
				console.log("testRadioView:", value, element);
			});
			this.showTestView(view);			
			//var bfhc = new BFHCountries(view.$('bfh-selectbox'));
			//bfhc.displayCountry();
		},
		testRadioView:function(param) {
			var options = {
				items:this.getRadioItems(),
				conceptId:"sex",
			};
			var view = new Uic.RadioView(options);
			view.on('click.radio', function(value, element) {
				console.log("testRadioView:", value, element);
			});
			this.showTestView(view);
		},
		testUicModal:function(param) {
			var view = new Uic.SButton();
			view.setText(param + ' Test');
			view.on('click', function(args, button) {
			    console.log("view.on:", args, ", button:", button);
			    var modal = new Uic.Modal({width:'500px'});
			    var contents = new Uic.Textarea();
			    modal.setContent(contents);
			    modal.open(function(view) {
			    		var ta = view.getContent();
			    					    	
			    });
			    modal.showProgress({show:true});
			});
			this.showTestView(view);
		},
		testButtons:function(param) {
			//var view = Backbone.Marionette.CompositeView();

			var view = new Uic.Buttons({buttons:this.getTestButtonsInfo()});
			view.on('click', function(id, text, button) {
				console.log("testButtons:", id, text, button);
			});
			this.showTestView(view);			
		},
		getTestButtonsInfo:function() {
			var buttons = [
			    {
			        data: {
			            buttonId:"save",
			            buttonClass:"btn btn-xx",
			            buttonTitle:"저장",
			        },
			    },
			    {
			        data: {
			            buttonId:"delete",
			            buttonClass:"btn btn-xx",
			            buttonTitle:"delete",
			        },
			    },
			];
			return buttons;
		},
		testFormView:function(param) {
			var view = new Uic.FormView({items:this.getFormItems()});
			this.showTestView(view);
		},
		testFormLayout:function(param) {

			var options = {
				title: {
					text:param,
				},
				items:this.getFormItems(),
				formFooter:{
					buttons:this.getTestButtonsInfo(),
				},
			};
			var view = new Uic.FormLayout(options);
			view.on('click.button', function(id, text, button) {
				console.log("testFormLayout:", id, text, button);
			});
			this.showTestView(view);
		},
		testSelectPicker:function(param) {
			var view = new Uic.SelectPicker({
				class: 'btn btn-primary show-menu-arrow show-tick',
				//items:['aaa', 'bbb'],
				items:[ 
					{
						text:'aaa',
						value:'aaaValue',

					},
					{
						text:'bbb',
						value:'bbbValue',

					},
				],
			});
			view.on('onChange', function(value) {
				console.log("testSelectPicker::", value);
			});
			//view.setText(param + ' Test');
			/*
			view.on('click', function(args, button) {
				console.log("view.on:", args, ", button:", button);
				var dlg = new Uic.WaitingDialog($);
				setTimeout(
					function(dlg) {
					dlg.hide();
				}, 2000, dlg);
				dlg.show("sending ... ", {dialogSize:'sm'});
			});
*/
			this.showTestView(view);
		},
		//[20151107 leo #9803]
		testWaitingDialog:function(param) {
			var view = new Uic.SButton();
			view.setText(param + ' Test');
			view.on('click', function(args, button) {
				console.log("view.on:", args, ", button:", button);
				var dlg = new Uic.WaitingDialog($);
				setTimeout(
					function(dlg) {
					dlg.hide();
				}, 2000, dlg);
				dlg.show("sending ... ", {dialogSize:'sm'});
			});
			this.showTestView(view);
		},
		testSButton:function(param) {
			var view = new Uic.SButton();
			view.setText(param + ' Test');
			view.on('click', function(args, button) {
			    console.log("view.on:", args, ", button:", button);
			});
			this.showTestView(view);
		},
		testWell:function(param) {
			var view = new Uic.Well();
			view.setText(param + ' Test');
			view.addClass('well-lg');
			//view.on('click', function(args, button) {
			//    console.log("view.on:", args, ", button:", button);
			//});
			this.showTestView(view);
		},
		testModal:function(param) {
			var view = new Uic.SButton();
			view.setText(param + ' Test');
			view.on('click', function(args) {
			    console.log("showTestModal:", args);
			    var modal = new Backbone.BootstrapModal({
			    	title:'Backbone.BootstrapModal test',
			    	content:'Backbone.BootstrapModal content',
			    });
			    modal.open(function(args) {
			    		console.log("showTestModal: on modal button clicked, args:", args);
			    });
			});
			this.showTestView(view);
		},
		testCollapseButton:function(name) {
			var view = new Uic.CollapseButton();
			//view.setText(name + ' Test');
			this.showTestView(view);
			//view.addItem(new Uic.SButtonModel());
			//view.addItem(new Uic.CollapseModel());
		},
		makeTable:function() {
            var columns = [
                {
                    name: "id", // The key of the model attribute
                    label: "일련번호", // The name to display in the header
                    editable: false, // By default every cell in a column is editable, but *ID* shouldn't be
                    // Defines a cell type, and ID is displayed as an integer without the ',' separating 1000s.
                    cell: Backgrid.IntegerCell.extend({
                        orderSeparator: ''
                    })
                },
                {
                    name: "name",
                    label: "의료기관 이름",
                    // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
                    cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
                },
                {
                    name: "createDate",
                    label: "최초 생성일",
                    cell: "string" // An integer cell is a number cell that displays humanized integers
                },
                ];

			var options = {
				raw: '<thead><tr>'
					+'<th>#</th>'
					+'<th>Firstname</th>'
					+'<th>Lastname</th>'
					+'<th>Age</th>'
					+'<th>City</th>'
					+'<th>Country</th>'
					+'</tr></thead>'
					+'<tbody><tr>'
					+'</tr></tbody>',
	                itemTemplate:{
	                    raw:'<td>{{id}}</td> <td>{{name}}</td>',
	                },
	                columns:columns,
	                pageSize:2,
			};
			var view = new Uic.Table(options);
			return view;
		},
		testTable:function(name) {
			var table = this.makeTable();
			table.addModel(new Nis.Model({id:1, name:'leo'}));
			table.addModel(new Nis.Model({id:2, name:'din'}));
			table.addModel(new Nis.Model({id:3, name:'din'}));
			table.addModel(new Nis.Model({id:4, name:'din'}));
			this.showTestView(table);
			table.addModel(new Nis.Model({id:5, name:'leo'}));
			table.addModel(new Nis.Model({id:6, name:'din'}));
			table.addModel(new Nis.Model({id:7, name:'din'}));
			table.addModel(new Nis.Model({id:8, name:'din'}));
		},
		testTableView:function() {
			var view = new Uic.TableView();
			var table = this.makeTable();
			view.setTable(table);
			//var pagination = new Uic.Pagination();
			//view.setPagination(pagination);
			this.showTestView(view);
			table.addModel(new Nis.Model({id:1, name:'leo'}));
		},
		getFormItems:function() {
			var formItems = [
									
				{
	                    labelTitle:"환자성명",
	                    dbid:"patientName",					
				},			
				{
	                    labelTitle:"ccc",	                    
	                    dbid:"patientName2",					
				},			
				{
	                    labelTitle:"text area",
	                    dbid:"patientName3",
	                    type:'textarea',
	                    data_raw:''
	                    +'<div>'
	                    +'<textarea id="{{inputId}}" dbid="{{dbid}}" class="form-control" placeholder="{{placeholder}}" value="{{inputValue}}" rows="5" id="comment"></textarea>'
	                    +'</div>',
				},											
				{
	                    labelTitle:"Check Box",
	                    dbid:"patientName4",
	                    type:'checkbox',
	                    checkText:'checked',
	                    raw:''
	                    	+'<div>'
						+'<div class="checkbox">'
						+'  <label><input type="checkbox" value="">Option 1</label>'
						+'</div>'
						+'</div>',
				},			
				{
	                    labelTitle:"Check Box inline",
	                    dbid:"patientName5",
	                    type:'checkbox',
				},							
				{
	                    labelTitle:"Radio inline",
	                    dbid:"patientName6",
	                    type:'radio',
	                    items:this.getRadioItems(),
	                    data_raw:''
	                    	+'<div>'
						+'<label class="radio-inline"><input type="radio" name="optradio">Option 1</label>'
						+'<label class="radio-inline"><input type="radio" name="optradio">Option 2</label>'
						+'</div>',
				},			
				{
	                    labelTitle:"Switch",
	                    dbid:"switch6",
	                    type:'checkbox',
	                    data_raw:''
	                    	+'<div>'
						+'<input type="checkbox" name="my-checkbox" checked>'
						+'</div>',
				},			
			];
			return formItems;
		},
		getRadioItems:function() {
			var items = [
					{
						data: {
							text:'aaa1',	
							conceptId:'c1',
							value:'M',
							//checked:'checked',
						},
						raw:'<input type="radio" name="optradio" value="{{value}}" conceptId="{{conceptId}}" checked=""> {{text}}',
					},
					{
						data: {
							text:'bbb',
							conceptId:'c2',
							value:'F',
						},						
						raw:'<input type="radio" name="optradio" value="{{value}}" conceptId="{{conceptId}}"> {{text}}',
					},
				];
			return items;
		},
	});

})();

