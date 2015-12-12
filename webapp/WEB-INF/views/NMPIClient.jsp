 <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <meta charset="utf-8">
  <title>NMPI - Client</title>
  <meta name="generator" content="Bootply" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <meta name="description" content="" />
  <link href="resources/css/bootstrap-3.3.5.css" rel="stylesheet">
  <link href="resources/css/nis/fixfooter.css" rel="stylesheet">
  <link href="resources/css/nis/NMPI_panel.css" rel="stylesheet">
  <link href="resources/css/nis/NMPI_client.css" rel="stylesheet">
  <link href="resources/css/nis/bootstrap-formhelpers.css" rel="stylesheet">

</head>
        <!-- HTML code from Bootply.com editor -->
<body>

  <div id=header class="header"></div>
  <div class="wrapper">
      <div id="contents" class="container">
      </div>
  </div>
  <div id=footer class="footer"></div>

    <!-- vendor libraries -->

    <script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
    <script src="resources/js/lib/nis/jquery-1.9.1.js"></script>
    <script src="resources/js/lib/nis/underscore-1.7.0.js"></script>

    <script src="resources/js/lib/backbone/backbone-1.1.2.js"></script>
    <script src="resources/js/lib/backbone/backbone.validation.js"></script>
    <script src="resources/js/lib/nis/json2.js"></script>
    <script src="resources/js/lib/backbone/backbone.babysitter.js"></script>
    <script src="resources/js/lib/backbone/backbone.wreqr.js"></script>
    <script src="resources/js/lib/handlebars-v4.0.2.js"></script>

    <script src="resources/js/lib/bootstrap-3.3.5.js"></script>
<!--    <script src="resources/js/lib/nis/backbone.bootstrap-modal.js"></script> -->
    <script src="resources/js/lib/bootstrap-validator-0.9.0.js"></script>
    <script src="resources/js/lib/backbone/backbone.localStorage.js"></script>
    <script src="resources/js/lib/backbone/backbone.marionette.js"></script>
    <script src="resources/js/lib/backbone/backbone.radio.js"></script>
    <script src="resources/js/lib/backbone/marionette.templatemanager.js"></script>

    <script src="resources/js/lib/nis/backbone.paginator.js"></script>


    <!-- Nis libs -->
    <script src="resources/js/nis/Nis.js"></script>
    <script src="resources/js/nis/util/map.js"></script>
    <script src="resources/js/nis/util/ConceptSetUtil.js"></script>
    <script src="resources/js/nis/Nis.Code.js"></script>
    <script src="resources/js/nis/nis_env_mgr.js"></script>
    <script src="resources/js/nis/nis-common.js"></script>
    <script src="resources/js/nis/NisTestEnv.js"></script>
    <script src="resources/js/nis/model/Nis.Model.js"></script>
    <script src="resources/js/nis/model/Nis.Model.HasNisRequest.js"></script>
    <script src="resources/js/nis/model/Nis.Collection.js"></script>
    <script src="resources/js/nis/model/Nis.UiInfo.js"></script>
    <script src="resources/js/nis/model/Nis.Model.Concept.js"></script>
    <script src="resources/js/nis/model/Nis.Model.Login.js"></script>
    <script src="resources/js/nis/model/Nis.Model.UserRequest.js"></script>
    <script src="resources/js/nis/model/Nis.Model.Organization.js"></script>
    <script src="resources/js/nis/app/NisMVC.js"></script>
    <script src="resources/js/nis/app/NisApp.js"></script>
    <script src="resources/js/nis/app/NisMVC.Application.js"></script>
    <script src="resources/js/nis/app/NisMVC.Layout.js"></script>

    <!-- ui components -->
    <script src="resources/js/uic/Uic.js"></script>
    <script src="resources/js/uic/View.js"></script>
    <script src="resources/js/uic/ItemView.js"></script>
    <script src="resources/js/uic/CompositeView.js"></script>
    <script src="resources/js/uic/LayoutView.js"></script>
    <script src="resources/js/uic/Button.js"></script>
    <script src="resources/js/uic/ButtonGroup.js"></script>
    <script src="resources/js/uic/Label.js"></script>
    <script src="resources/js/uic/Input.js"></script>
    <script src="resources/js/uic/Form.js"></script>
    <script src="resources/js/uic/InputFormGroup.js"></script>
    <script src="resources/js/uic/PageHeader.js"></script>
    <script src="resources/js/uic/GridView.js"></script>
    <script src="resources/js/uic/HBView.js"></script>
    <script src="resources/js/uic/LayoutView.js"></script>
    <script src="resources/js/uic/Backgrid.js"></script>
    <script src="resources/js/uic/Well.js"></script>
    <script src="resources/js/uic/DropDownButton.js"></script>
    <script src="resources/js/uic/Span.js"></script>
    <script src="resources/js/uic/SButton.js"></script>
    <script src="resources/js/uic/CollapseButton.js"></script>
    <script src="resources/js/uic/Table.js"></script>
    <script src="resources/js/uic/TableView.js"></script>
    <script src="resources/js/uic/Pagination.js"></script>
    <script src="resources/js/uic/WaitingDialog.js"></script>
    <script src="resources/js/uic/SelectPicker.js"></script>
    <script src="resources/js/uic/FormView.js"></script>
    <script src="resources/js/uic/FormLayout.js"></script>
    <script src="resources/js/uic/Buttons.js"></script>
    <script src="resources/js/uic/Modal.js"></script>
    <script src="resources/js/uic/Textarea.js"></script>
    <script src="resources/js/uic/RadioView.js"></script>
    <script src="resources/js/uic/FGLayout.js"></script>
    <script src="resources/js/uic/VLayout.js"></script>
    <script src="resources/js/uic/JsTree.js"></script>
    <script src="resources/js/uic/PanelLayout.js"></script>
    <script src="resources/js/uic/LoginDialog.js"></script>
    <script src="resources/js/uic/List.js"></script>
    <script src="resources/js/uic/AccordionPanel.js"></script>
    <script src="resources/js/uic/ProgressBar.js"></script>
    <script src="resources/js/uic/AddressSearch.js"></script>

    <!-- Nis Views -->
    <script src="resources/js/nis/view/View.Footer.js"></script>
    <script src="resources/js/nis/view/AppHeader.js"></script>
    <script src="resources/js/nis/view/SearchControlBase.js"></script>
    <script src="resources/js/nis/view/SearchTopTemplate.js"></script>
    <script src="resources/js/nis/view/HasSearchControl.js"></script>
    <script src="resources/js/nis/view/HasListPanel.js"></script>
    <script src="resources/js/nis/view/HasDetailsPanel.js"></script>
    <script src="resources/js/nis/view/HasProgress.js"></script>
    <script src="resources/js/nis/view/SearchTopLayout.js"></script>
    <script src="resources/js/nis/view/RequestBased.js"></script>
    <script src="resources/js/nis/app/NisMVC.BaseController.js"></script>
    <script src="resources/js/nis/app/NisMVC.ClientController.js"></script>

    <!-- application -->

    <script> console.log("=========================") </script>

    <script src="resources/js/nmpi/uiinfo/Nis.UIInfo.Buttons.js"></script>

    <script src="resources/js/nmpi/model/Nis.Model.Patient.js"></script>
    <script src="resources/js/nmpi/model/Nis.Model.PatientRegistry.js"></script>
    <script src="resources/js/nmpi/model/Nis.Model.PatientVisit.js"></script>
    <script src="resources/js/nmpi/model/Nis.Model.PatientMergeHistory.js"></script>


    <script src="resources/js/nmpi/view/VerticalLayout.js"></script>
    <script src="resources/js/nmpi/view/MainLayout.js"></script>
    <script src="resources/js/nmpi/view/PatientSearchControl.js"></script>
    PatientSearchControl



    <script src="resources/js/nmpi/client/app/view/PatientAdd.js"></script>
    <script src="resources/js/nmpi/client/app/view/MergeInfoLayout.js"></script>
    <script src="resources/js/nmpi/client/app/view/PatientSearchLayout.js"></script>
    <script src="resources/js/nmpi/client/app/view/MergeSearchLayout.js"></script>
    <script src="resources/js/nmpi/client/app/view/MSearchContainer.js"></script>
    <script src="resources/js/nmpi/client/app/view/PatientSearchControl.js"></script>
    <script src="resources/js/nmpi/client/app/view/PatientsTable.js"></script>
    <script src="resources/js/test/app/view/TestLayout.js"></script>

    <script src="resources/js/nmpi/client/app/NisMVC.Router.js"></script>


    <script>
      console.log("------------------------")
      var NisMVC = NisMVC || {};
      NisMVC.rMode = "local";
      NisMVC.entityUi = "Organizaion";
    </script>

</body>
</html>
 