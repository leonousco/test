<!doctype html>
<html lang="en" data-framework="marionettejs">
	<head>
		<meta charset="utf-8">
		<title>Marionette Valueset</title>

		<meta http-equiv="content-type" content="text/html; charset=iso-8859-1">
		<meta http-equiv="X-UA-Compatible" content="IE=9" />
		<meta name="generator" content="HAPedit 3.0">

		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="">
		<meta name="author" content="">

		<link href="resources/css/nis/bootstrap.css" rel="stylesheet">
		<link href="resources/css/nis/mystyle.css" rel="stylesheet">
	</head>
	<body>

<!--
	<section id="todoapp">
		<header id="header"></header>
		<section id="main"></section>
		<footer id="footer"></footer>
	</section>
-->
	<div id="header"> </div>

	<div class="wrapper">
		<div class="container">    	
	        <div id="main"> main </div>        			   	    	
		</div>
	</div>

	<div class="footer" id="footer"> footer </div>

	<div class="modal fade" id="loadingModal">
		<div class="modal-dialog">
	    	<div class="modal-content">
				<div class="modal-body">
					<img src="./resources/images/nis/ajax-loader_white.gif"/>
					<span>  Attendere...</span>
				</div>
			</div>
		</div>	
	</div>
		<!-- vendor libraries -->

		<script src="resources/js/lib/nis/jquery-1.9.1.js"></script>

		<script src="resources/js/lib/nis/underscore-1.7.0.js"></script>

		<script src="resources/js/lib/backbone/backbone-1.1.2.js"></script>
		<script src="resources/js/lib/backbone/backbone.validation.js"></script>
		<script src="resources/js/lib/nis/json2.js"></script>
		<script src="resources/js/lib/backbone/backbone.babysitter.js"></script>
		<script src="resources/js/lib/backbone/backbone.wreqr.js"></script>
		

		<script src="resources/js/lib/nis/bootstrap.min.js"></script>

		<!--script src="lib/holder.js"></script-->

		<!--  plugin sources -->
		<script src="resources/js/lib/nis/plugin/transition.js"></script>
		<script src="resources/js/lib/nis/plugin/alert.js"></script>
		<script src="resources/js/lib/nis/plugin/button.js"></script>
		<script src="resources/js/lib/nis/plugin/carousel.js"></script>
		<script src="resources/js/lib/nis/plugin/collapse.js"></script>
		<script src="resources/js/lib/nis/plugin/dropdown.js"></script>
		<script src="resources/js/lib/nis/plugin/modal.js"></script>
		<script src="resources/js/lib/nis/plugin/scrollspy.js"></script>
		<script src="resources/js/lib/nis/plugin/tab.js"></script>
		<script src="resources/js/lib/nis/plugin/tooltip.js"></script>
		<script src="resources/js/lib/nis/plugin/popover.js"></script>
		<script src="resources/js/lib/nis/plugin/affix.js"></script>


		<script src="resources/js/lib/backbone/backbone.localStorage.js"></script>
		<script src="resources/js/lib/backbone/backbone.marionette.js"></script>
		<script src="resources/js/lib/backbone/backbone.radio.js"></script>
		<script src="resources/js/lib/backbone/marionette.templatemanager.js"></script>		
		<!-- application -->		
				
		<script src="resources/js/vs/app/SearchResultView.js"></script>
		<script src="resources/js/vs/app/EntityDetailsView.js"></script>
		<script src="resources/js/vs/app/EntityListView.js"></script>
		<script src="resources/js/vs/app/HomeView.js"></script>
		<script src="resources/js/vs/app/HeaderView.js"></script>
		<script src="resources/js/vs/app/FooterView.js"></script>		
		<script src="resources/js/vs/app/ContentView.js"></script>
		<script src="resources/js/vs/app/NisMVC.Model.js"></script>
		<script src="resources/js/vs/app/NisMVC.Layout.js"></script>
		<script src="resources/js/vs/app/NisMVC.Router.js"></script>
		
		<script src="resources/js/lib/nis/nis_env_mgr.js"></script>
		<script src="resources/js/lib/nis/nis-common.js"></script>
		
		<script src="resources/js/vs/template-info.js"></script>
		
		<script src="resources/js/vs/app/NisMVC.js"></script>
		<script src="resources/js/vs/app/NisMVC.Application.js"></script>		
		<script src="resources/js/vs/app/NisApp.js"></script>		
		
	</body>
</html>
