

(function () {
	'use strict';

	Nis.Model.PersonEntityName = "IndividualProvider";


	Nis.Model.MPerson = Nis.Model.extend({
		defaults: {
			id: null,
			oid: "",
			licenseNumber: "",
			licenseType: "",
			name: "",
			specialistNumber: "",
			email: "",
			state: "",
			phoneNumber: "",
			address: "",
			language: "",
			gender: "",
			mrDeliveryEmail: "",
			electronicServiceUri: "",
			orgName:"",
			dateCreated: "",
			dateVoided: "",
			dateModified: "",
			userCreated: "",
			userVoided: "",
			link: "",
			requestStatus:Nis.Code.ReqStatus.confirmed,
			requestType:Nis.Code.RequestType.create,
		},
		initialize: function () {
			this.validators = {};
			var newOptions = {
				entityName:Nis.Model.PersonEntityName,
				serverName:Nis.Model.NHPServer,
			};
			return Nis.Model.prototype.initialize.call(this, newOptions);
		},
		validateItem: function (key) {
			return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
		},
		validateAll: function () {

			var messages = {};

			for (var key in this.validators) {
				if(this.validators.hasOwnProperty(key)) {
					var check = this.validators[key](this.get(key));
					if (check.isValid === false) {
						messages[key] = check.message;
					}
				}
			}
			return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
		},		
		save:function(options){
			if(this.attributes.id)
				this.attributes.requestType = Nis.Code.RequestType.modify;
			else
				this.attributes.requestType = Nis.Code.RequestType.create;
			Nis.Model.prototype.save.call(this, this.attributes, options);
		},
	});

_.extend(Nis.Model.MPerson.prototype, Nis.Model.HasNisRequest);

	// ---------------
	Nis.Model.MPersonList = Nis.Collection.extend({
		model: Nis.Model.MPerson,
		initialize: function(){
			console.log("collection initialized");
			var newOptions = {
				entityName:Nis.Model.PersonEntityName,
				serverName:Nis.Model.NHPServer,
			};
			this.setItemUtil(Nis.Model.PersonColumns);
			return Nis.Model.prototype.initialize.call(this, newOptions);
		},

		fetch:function(options) {
			console.log("fetch:", this.url());
			var collection = this;
			$.ajax({
				url:collection.url(),
				dataType:"json",
				success:function (response) {
					console.log("fetch success: " + response.body + ", options:" + options);
					var values = response.body;
					collection.parse(response);
					return Backbone.Collection.prototype.fetch.call(collection, options) ;
				}
			});
		},
		parse: function (response) {
			console.log("Inside Parse");
			var values = response.body;
			for (var i = 0, length = values.length; i < length; i++) {
				var currentValues = values[i];
				this.push(currentValues);
			}
			console.log(this.toJSON());
			return this.models;
		},
		findByName:function (key) {
			var url = entityUrl.url() + "/query?displayName="+key;
			console.log('findByName: ' + url);
			console.log('findByName: ' + key);
			var self = this;
			$.ajax({
				url:url,
				dataType:"json",
				success:function (data) {
					console.log("search success: " + data.body.length);
					self.reset(data.body);
				}
			});
		},
	});
Nis.Model.PersonColumns = [
{
	label:"OID",
	dbid: "oid" ,
},
{
	label:"이름",
	dbid: "name",
},
{
	label:"면허번호",
	dbid: "licenseNumber",
},
{
	label:"전문의 면허번호",
	dbid: "specialistNumber",
},
{
	label:"면허종류",
	dbid: "licenseType",
	type: 'select',
	conceptId:'DoctoryLicenseType',
	controlLabel:'면허종류 선택',
},
{
	label:"메일주소",  	
	dbid: "email",	
},
{
	label:"국가",
	dbid: "state",
},
{
	label:"전화번호",
	dbid: "phoneNumber",
},
{
	label:"주소",
	dbid: "address",
},
{
	label:"언어",
	dbid: "language",
},
{
	label:"성별",
	dbid: "gender",
},
{
	label:"의무기록전달 email",
	dbid: "mrDeliveryEmail",
},
{
	label:"electronic service uri",
	dbid: "electronicServiceUri",
},
{
	label:"신청상태",
	dbid: "requestStatus",
},
{
	label:"승인상태",
	dbid: "approveStatus",
},
{
	label:"최초생성일",
	dbid: "dateCreated",
},
{
	label:"최근변경일",
	dbid: "dateModified",
},
{
	label:"최근변경한 사용자",
	dbid: "userCreated",
},
{
	label:"없어진 날짜",
	dbid: "dateVoided",
},
{
	label:"삭제한 사용자",
	dbid: "userVoided",
},
];
})();


