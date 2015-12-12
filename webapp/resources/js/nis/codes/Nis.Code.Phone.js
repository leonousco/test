
(function () {
	'use strict';

	Nis.Code.MobilePhone = {
		loadData:function(){
			var ret = {
				conceptId:'mobilePrefix',
				displayName:'mobilePrefix',
				conceptSet: [
					{
						conceptId:'m010',
						displayName:'010',
						code:'010',
					},
					{
						conceptId:'m011',
						displayName:'011',
						code:'011',
					},
					{
						conceptId:'m016',
						displayName:'016',
						code:'016',
					},
					{
						conceptId:'m017',
						displayName:'017',
						code:'017',
					},
					{
						conceptId:'m019',
						displayName:'019',
						code:'019',
					},
				],
			};
			return ret;
		},
	};

	Nis.Code.HomePhone = {
		loadData:function(){
			var ret = {
				conceptId:'phoneLocal',
				displayName:'지역번호',
				conceptSet: [
					{
						conceptId:'m02',
						displayName:'02', //서울특별시
						code:'02',
					},
					{
						conceptId:'m031',
						displayName:'031', //경기도
						code:'031',
					},
					{
						conceptId:'m032',
						displayName:'032', //인천광역시
						code:'032',
					},
					{
						conceptId:'m033',
						displayName:'033', //강원도
						code:'033',
					},
				],
			};
			return ret;
		},
	};

})();

