
(function () {
    'use strict';

    //console.log("Nis.Code loading ...");
    Nis.Code = Backbone.Marionette.Object.extend({
        initialize:function() {
            this.conceptSetMap = new Nis.Map();
            this.conceptMap = new Nis.Map();
            this.initLocalConcepts();
        },
        getConcept:function(conceptId, options) {
            var concept = this.conceptMap.get(conceptId);
            if(concept) {
                return options.success(concept);
            }
            else {
                this.loadConcept(conceptId, options);
            }
        },
        getConceptSet:function(conceptId, options) {
            var conceptSet = this.conceptSetMap.get(conceptId);
            if(conceptSet) {
                return options.success(conceptSet, conceptId);
            }
            else {
                this.loadConceptSets(conceptId, options);
            }
        },
        loadConcept:function(conceptId, options) {
            console.log('loadConcept:', conceptId);
        },
        loadConceptSets:function(conceptId, options) {
            console.log('loadConceptSets:', conceptId);
            switch(conceptId){
                case 'mobilePrefix': {
                    this.loadData(Nis.Code.MobilePhone.loadData());                
                    break;
                }     
                case 'phoneLocal': {
                    this.loadData(Nis.Code.HomePhone.loadData());                
                    break;
                }     
                default:
                    return;
            }
            this.getConceptSet(conceptId, options);
        },
        addConcept:function(conceptId, concept) {
            this.conceptMap.put(conceptId, concept);
            return concept;
        },
        addConceptSet:function(conceptId, conceptSet) {
            if($.isArray(conceptSet)) {
                for(var i=0; i<conceptSet.length; i++) {
                    this.addConcept(conceptSet[i].conceptId, conceptSet[i]);
                }
                this.conceptSetMap.put(conceptId, conceptSet);
            }
            else {
                this.addConcept(conceptSet.conceptId, conceptSet);
                var sets = this.conceptSetMap.get(conceptId);
                if(typeof sets === 'undefined') {
                    sets = [];
                    this.conceptSetMap.put(conceptId, sets);
                }
                sets.push(conceptSet);
            }
        },
        loadData:function(data){
            this.addConcept(data.conceptId, {conceptId:data.conceptId, displayName:data.displayName});
            for(var i=0; i<data.conceptSet.length; i++){
                var conceptSet = data.conceptSet[i];
                this.addConceptSet(data.conceptId, {
                    conceptId: conceptSet.conceptId,
                    displayName: conceptSet.displayName,
                    code: conceptSet.code,
                });
            }
        },
        initLocalConcepts:function() {
            var conceptId = 'sex';
            this.addConcept(conceptId, {conceptId:conceptId, displayName:'sex'});
            this.addConceptSet(conceptId, {conceptId:conceptId, conceptId:'sex.m', displayName:'남', code:'M'});
            this.addConceptSet(conceptId, {conceptId:conceptId,conceptId:'sex.f', displayName:'여', code:'F'});

            var conceptId = 'PatientSelectionCondition';
            this.addConcept(conceptId, {conceptId:conceptId, displayName:'Patient Selection Condition'});
            this.addConceptSet(conceptId, {
                conceptId: conceptId,
                conceptId: 'PatientSelectionCondition.register',
                displayName: '생성',
                code: 'Register',
            });
            this.addConceptSet(conceptId, {
                conceptId: conceptId,
                conceptId: 'PatientSelectionCondition.merge',
                displayName: '병합',
                code: 'Merge',
            });
            var conceptId = 'DoctoryLicenseType';
            this.addConcept(conceptId, {conceptId:conceptId, displayName:'면허 종류'});
            this.addConceptSet(conceptId, {
                conceptId: 'DoctoryLicenseType.00',
                displayName: '의사면허',
                code: '00',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'DoctoryLicenseType.01',
                displayName: '간호사면허',
                code: '01',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'DoctoryLicenseType.02',
                displayName: '약사면허',
                code: '02',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'DoctoryLicenseType.03',
                displayName: '간호사면허',
                code: '03',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'DoctoryLicenseType.04',
                displayName: '임상병리사면허',
                code: '04',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'DoctoryLicenseType.05',
                displayName: '방사선사면허',
                code: '05',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'DoctoryLicenseType.06',
                displayName: '물리치료사면허',
                code: '06',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'DoctoryLicenseType.07',
                displayName: '영양사면허',
                code: '07',
            });

            var conceptId = 'HospitalType';
            this.addConcept(conceptId, {conceptId:conceptId, displayName:'요양기관종별구분'});
            this.addConceptSet(conceptId, {
                conceptId: 'HospitalType.2',
                displayName: '의원',
                code: '2',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'HospitalType.3',
                displayName: '병원',
                code: '3',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'HospitalType.4',
                displayName: '종합병원',
                code: '4',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'HospitalType.5',
                displayName: '종합전문요양기관',
                code: '5',
            });


            var conceptId = 'HospitalArea';
            this.addConcept(conceptId, {conceptId:conceptId, displayName:'요양기관기호지역구분'});
            this.addConceptSet(conceptId, {
                conceptId: 'HospitalArea.11',
                displayName: '서울',
                code: '11',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'HospitalArea.21',
                displayName: '부산',
                code: '21',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'HospitalArea.22',
                displayName: '인천',
                code: '22',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'HospitalArea.21',
                displayName: '대구',
                code: '23',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'HospitalArea.24',
                displayName: '광주',
                code: '24',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'HospitalArea.25',
                displayName: '대전',
                code: '25',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'HospitalArea.26',
                displayName: '울산',
                code: '26',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'HospitalArea.31',
                displayName: '경기',
                code: '31',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'HospitalArea.32',
                displayName: '강원',
                code: '32',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'HospitalArea.33',
                displayName: '충북',
                code: '33',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'HospitalArea.34',
                displayName: '충남',
                code: '34',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'HospitalArea.35',
                displayName: '전북',
                code: '35',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'HospitalArea.36',
                displayName: '전남',
                code: '36',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'HospitalArea.37',
                displayName: '경북',
                code: '37',
            });

            this.addConceptSet(conceptId, {
                conceptId: 'HospitalArea.38',
                displayName: '경남',
                code: '38',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'HospitalArea.39',
                displayName: '제주',
                code: '39',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'HospitalArea.41',
                displayName: '세종',
                code: '41',
            });

            var conceptId = 'IsForeigner';
            this.addConcept(conceptId, {conceptId:conceptId, displayName:'외국인여부'});
            this.addConceptSet(conceptId, {
                conceptId: 'IsForeigner.Local',
                displayName: '내국인',
                code: 'Local',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'IsForeigner.Foreigner',
                displayName: '외국인',
                code: 'Foreigner',
            });

            var conceptId = 'MultipleBirth';
            this.addConcept(conceptId, {conceptId:conceptId, displayName:'쌍둥이여부'});
            this.addConceptSet(conceptId, {
                conceptId: 'MultipleBirth.Y',
                displayName: '예',
                code: 'Y',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'MultipleBirth.N',
                displayName: '아니오',
                code: 'N',
            });

            var conceptId = 'BirthOrder';
            this.addConcept(conceptId, {conceptId:conceptId, displayName:'출생순위'});
            this.addConceptSet(conceptId, {
                conceptId: 'BirthOrder.1',
                displayName: '첫번째',
                code: '1',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'BirthOrder.2',
                displayName: '두번째',
                code: '2',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'BirthOrder.3',
                displayName: '세번째',
                code: '3',
            });
            this.addConceptSet(conceptId, {
                conceptId: 'BirthOrder.4',
                displayName: '네번째',
                code: '4',
            });

            var conceptId = 'RequestType';
            this.addConcept(conceptId, {conceptId:conceptId, displayName:'Request Type'});
            this.addConceptSet(conceptId, {
                conceptId: 'RequestType.create',
                displayName: '생성 요청',
                code: Nis.Code.RequestType.create,
            });
            this.addConceptSet(conceptId, {
                conceptId: 'RequestType.modify',
                displayName: '변경 요청',
                code: Nis.Code.RequestType.modify,
            });
            this.addConceptSet(conceptId, {
                conceptId: 'RequestType.delete',
                displayName: '삭제 요청',
                code: Nis.Code.RequestType.delete,
            });

            var conceptId = 'ReqStatus';
            this.addConcept(conceptId, {conceptId:conceptId, displayName:'ReqStatus'});
            this.addConceptSet(conceptId, {
                conceptId: 'ReqStatus.REQUEST',
                displayName: '요청',
                code: Nis.Code.ReqStatus.request,
            });
            this.addConceptSet(conceptId, {
                conceptId: 'ReqStatus.REJECT',
                displayName: '거절',
                code: Nis.Code.ReqStatus.reject,
            });
            this.addConceptSet(conceptId, {
                conceptId: 'ReqStatus.CONFIRMED',
                displayName: '승인',
                code: Nis.Code.ReqStatus.confirmed,
            });


        }, // end of initLocalConcepts:
    }); // end of Nis.Code

Nis.Code.Concept = {
    conceptId:null,
    conceptSets:null,

};

Nis.Code.ReqStatus = {
    request:'REQUEST',
    reject:'REJECT',
    confirmed:'CONFIRMED',
};

Nis.Code.RequestType = {
    create:'CREATE',
    modify:'MODIFY',
    delete:'DELETE',
};

Nis.Code.PatientEventType = {
    create:'CREATE',
    register:'REGISTER',
    revisit:'REVISIT',
};

Nis.Code.RoleName = {
    nidsOrgManager:'ROLE_NIDS_ORG_MANAGER',
    nidsUser:'ROLE_NIDS_USER',
    nmpiManager:'ROLE_NMPI_MANAGER',
    oidManager:'ROLE_OID_MANAGER',
};

Nis.Code.PermissionRole = {
    ccmAdmin:'ROLE_CCM_ADMIN',
    ccmManager:'ROLE_CCM_MANAGER',
};

Nis.Code.ResponseOk = 200;

Nis.Code.ErrorCode = {
    ECS_SERVER_START:1000+800,
    ECS_ALREADY_EXIST:1000+800+1,
    ECS_NOT_EXIST:1000+800+3,
    ECS_UNKNOWN_ERROR:1000+800+4,
    ECS_NO_SERVICE:1000+800+5,
    ECS_INVALID_CONTEXT:1000+800+6,
    ECS_PERMISSION_DENIED:1000+800+7,
    ECS_INVALID_URI:1000+800+8,
    ECS_UNKOWN_COMMAND:1000+800+9,
    ECS_NOT_IMPLEMENTED:1000+800+10,
    ECS_INVALID_PARAM:1000+800+11,
    ECS_INVALID_PASSWORD:1000+800+12,
    ECS_INVALID_ID:1000+800+13,
    ECS_INVALID_TOKEN:1000+800+14,
    ECS_TIMEOUT:1000+800+15,

    ECS_FAIL_CREATE_IX:1000+800+21,
    ECS_FAIL_REMOVE_IX:1000+800+22,

    ECC_CLIENT_START:1000+900,
    ECC_UNKOWN_COMMAND:1000+900+1,
    ECC_CONVERSION:1000+900+2,
    ECC_NOT_EXIST:1000+900+3,
    ECC_NOT_IMPLEMENTED:1000+900+4,

    ECC_MalformedURL:1000+900+5,
    ECC_IOException:1000+900+6,
    ECC_FAIL_CONNECT:1000+900+7,

    ECC_INVALID_PARAM:1000+800+8,
    ECC_ALREADY_EXIST:1000+800+9,

    ECC_INVALID_TOKEN:1000+800+10,


        //TODO: [20151107 leo #9620] need more define
    };

    //console.log("Nis.Code loaded.", Nis.Code);

})();


