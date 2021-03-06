/*global Backbone, NisMVC:true */

var Nis = Nis || {};

(function () {
    'use strict';

    Nis.UiInfo.CCMInfo = Nis.UiInfo.extend ({
        initialize: function (options) {
            console.log("initialize: options:", options);
            this.setItems(this.getItems());
        },
        getInfo:function(options) {
            var ret = {
                    tagName:'div',
                    className:'row-sm-6',
                    id:'page_contents',
                    regions: {
                        header: '.page-header',
                        menu: '#menu',
                        result: '#result',
                    },
            };
            ret.raw = ''
            +'<form name="page" id="page" class="col-sm-12">'
            +'<div id="right_wrap">'
            +'<div class="cont" style="width:730px;">'
            +'<img src="../resources/images/layout/about_img.jpg" alt="About CCM" /><br />            '
            +'<div class="mt25">'
            +'<img src="../resources/images/layout/ccm.jpg" alt="Clinical Contents Model" align="absmiddle" />'
            +'</div>'
            +'<div class="mt40 clear">'
            +'<img src="../resources/images/title/title_1_1.jpg" alt="연구성과" align="absmiddle" />'
            +'<div class="text_1 mt5">'
                    +'표준용어 기반의 데이터사전과 임상콘텐츠모형을 고안하여, 이를 활용한 서식 템플릿 및 구조화된 입력 도구를 개발하여 환자 데이터의 '
                    +'일관성을 유지하고, 표준적 의미 해석이 가능한 활용중심의 EMR시스템 인프라를 구축하였습니다. '
                +'</div>'
            +'</div>'
            +'<div class="content mt30 mb35">'
                +'<img src="../resources/images/title/h2_1_1.jpg" alt="" />'
                +'<div class="text_2 mb30">'
                    +'임상콘텐츠 모형이란 임상데이터 사이의 관계에 따라 데이터를 논리적으로 구성한 것으로 미국, 영국, 호주 네덜란드 등의 국가 및 HL7, '
                    +'CEN등 국제 표준기구에 의해 광범위하게 전개되고 있습니다. 이 중 대표적인 임상데이터모델은 호주의 OpenEHR의 Archetype과 미국 '
                    +'인터마운틴 헬스케어센터의 Clinical Element Model(CEM)로 환자데이터 저장소에 일관된 표현방식으로 환자 정보를 저장하여 CDSS 및 '
                    +'자동보고프로그램 뿐 아니라, 컴퓨터 간 인터페이스, 데이터 입력화면 구성에 활용됩니다. 본 연구에서는 이러한 선진사례를 분석하여 국내 '
                    +'의료현장에 적합한 <span class="type_7">Clinical Contents Model(CCM)을 고안</span>하였습니다. <br /><br />'

+'CCM은 임상개념을 재활용이 가능한 단위로 스텐다드하게 구조화한 모델로 CCM콘텐츠 개발자가 CCM을 정확하게 이해하고, CCM을 생성할 수 있도록 CCM의 정의, '
+'구성요소, 개발원칙 등에 대한 <span class="type_7">CCM개발 가이드라인</span>을 개발하였습니다. 또한 본 CCM은 특정 시스템이나 개발언어, DBMS에 독립적인 '
+'모형으로 쉽게 이식할 수 있도록 XML형식의 언어로 표현하며, XML자체는 범위가 무한하여 CCML이라는 약식 XML을 정의하여 표현하도록 하였으며, 이에 대한' 
+'<span class="type_7">CCML 작성 가이드라인</span>을 개발하였습니다. '
                +'</div>'
                +'<img src="../resources/images/title/h2_1_2.jpg" alt="" />'
                +'<div class="text_2">'
                    +'환자데이터의 일관된 표현과 의미해석을 지원하도록 고안된 CCM에 맞게 CCM 인스턴스를 개발 중입니다. 일산공단병원의 임상영역 전문가들과 '+'의료정보 전문가가 모여 CCM인스턴스를 개발하고, 이를 EHR사업단에서 재 검토하는 과정을 거쳐 <span class="type_7">CCM 인스턴스를 '+'개발</span>하였습니다. 크게 임상영역, 처치영역, 검사영역, 약제영역 4개로 분류하였고, 유사한 패턴으로 조합되어 설명되는 그룹에 '
                    +'따라 <span class="type_7">CCM템플릿으로 사전 정의</span>하여 유사한 패턴의 CCM을 쉽게 생성할 수 있습니다. <br />'
+'또한 XML로 표현되는 CCM을 만들기 위해 <span class="type_7">CCM Editor</span>를 개발하여 개발언어를 모르는 임상의도 CCM콘텐츠를 생성할 임상지식만 있다면 '+'Web기반의 GUI를 통해 드래그 앤 드롭 및 간단한 조작만으로 XML형식의 CCM콘텐츠를 생성할 수 있습니다. '
                +'</div>'
                +'<img src="../resources/images/layout/img_1_1.jpg" vspace="27" />'               
                +'<img src="../resources/images/title/h2_1_3.jpg" alt="" />'
                +'<div class="text_2 mb20">'
                   +'의료정보를 정확한 개념으로 표현하고 의미를 해석할 수 있도록 하기 위해서 <span class="type_7">CCM의 각 구성 요소(Entity, Qualifier/'
                    +'Modifier, Value 등)를 표준의료용어체계와 매핑</span>하였습니다. 표준의료용어체계와의 매핑을 통해서, 모델 개발자와 모델 사용자는 '
+'의미적 손실없이 정확한 개념으로 정보를 이해할 수 있습니다. 이러한 정보가 축적되면 사람 뿐 아니라 기계를 통하여 정보를 일괄 처리할 수 있으며, 다양한 '
+'컴퓨터 알고리즘 및 정보기술을 활용하여 정보를 가공하거나 새로운 정보를 발굴할 수 있는 원천자료로 사용할 수 있게 됩니다.'
                +'</div>'
                +'<img src="../resources/images/layout/img_1_2.jpg" vspace="10" />'
                +'<div class="text_5 mb15">'
                +'상기 예는 <b>Hypertension CCM</b>을 보건의료표준용어(KOSTOM)와 매핑한 예시입니다.  Hypertension은 KS0013859와 매핑되며, qualifier 및 '+'각 value에 대해서도 매핑이 가능합니다. 현재 KOSTOM은 개발과정에 있으므로, 해당 CCM의 개념 중 보건의료표준용어와 매핑되지 않은 '
                +'용어는 공란으로 표기되었습니다. '
                +'</div>'                
                +'<img src="../resources/images/layout/img_1_3.jpg" vspace="10" />'
                +'<div class="text_5 mb30">'
                +'상기 예는 <b>Diplopia CCM</b>을 보건의료표준용어(KOSTOM)와 매핑한 예시입니다.  Diplopia는 KOSTOM코드 KS0081153과 매핑되며, qualifier '+'및 각 value에 대해서도 매핑이 가능합니다. 현재 KOSTOM은 개발과정에 있으므로, 해당 CCM의 개념 중 보건의료표준용어와 매핑되지 않은 '
                +'용어는 공란으로 표기되었습니다. '
                +'</div>'
                +'<img src="../resources/images/title/h2_1_4.jpg" alt="" />'
                +'<div class="text_2 mb30">'
                    +'독립적인 의료기관들이 EHR을 공유하기 위해서는 정보교환의 표준, 용어의 표준도 중요하지만, 의무기록 서식에 대한 표준도 필요합니다. 그러나'
                    +', 병원별, 의사별, 질병별 또한 더욱 복잡하고 자세해 지는 임상서식마다 모두 표준화하여 사용하기는 사실상 불가능하기 때문에, 표준은 '
                    +'최소화하고, 의무기록 서식을 특성화해 줄 수 있는 방법이 필요합니다. 이러한 방법의 일환으로 기 개발된 임상콘텐츠모형을 유연하게 조합, '+'해체하여 특화된 다양한 임상서식을 만들 수 있는 동시에 거기서 획득되는 데이터의 일관성은 보장할 수 있는 <span class="type_7">'
                    +'템플릿 모델을 구현</span>하였습니다. CCM을 조합하여 Section을 만들고, Section을 조합하여 하나의 Template을 만들 수 있습니다. '
                    +'사용빈도가 높은 서식을 분석하여, 범용적으로 우선 사용가능한 서식 템플릿을 만들어 <span class="type_7">템플릿 라이브러리</span>를 '
                    +'구축하였습니다. 또한, CCM을 조합하여 쉽게 Section과 템플릿을 만들고 사용자 인터페이스에 사용되는 UI 콤포넌트 지정도 가능한 <span '
                    +'span class="type_7">이를 레거시 시스템과 연동</span>을 성공리에 구현하였습니다. '
                +'</div>'
                +'<div class="bullet_text floatl">'
                +'문의 사항이 있는 경우 <a href="http://ehrkorea.org/infonotify/qa_list.aspx" target="_blank">EHR사업단 홈페이지 Q&amp;A</a>를 '
                +'이용하시기 바랍니다. <br />'
                +'EHR사업단 연구에 대한 정보는 <a href="http://ehrkorea.org" target="_blank">www.ehrkorea.org</a>로 가시면 확인하실 수 있습니다.'
                +'</div>                '
            +'</div><!-- //content -->'
        +'</div><!-- //cont -->'
+'</div><!-- //right_wrap -->'
+'</form>'

                return ret;
        },
    });  //Nis.Model.AppInfo
})();
