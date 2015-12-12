<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<html lang="en">

<head>
	
	<meta http-equiv="content-type" content="text/html; charset=iso-8859-1">
    <meta http-equiv="X-UA-Compatible" content="IE=9" />
	<meta name="generator" content="HAPedit 3.0">
    
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="shortcut icon" href="../../assets/ico/favicon.png">	

    <title>Healthcare Provider Organization</title>
    
	<!-- Bootstrap core CSS -->    
    <link href="resources/css/nis/bootstrap.css" rel="stylesheet">        
    <!-- Custom styles for this template -->
    <link href="resources/css/nis/mystyle.css" rel="stylesheet">
        		
	<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="lib/html5shiv.js"></script>
      <script src="lib/respond.min.js"></script>
    <![endif]-->
    
</head>

<body>

<div class="header"></div>

<div id="headerView"></div>

<div class="wrapper">
	<div class="container">    	
        <div id="content"></div>        			   	    	
	</div>
</div>

<div class="footer"></div>

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

<!-- Placed at the end of the document so the pages load faster -->    

<!-- script src="lib/jquery-1.7.2.min.js"></script-->
<script src="resources/js/lib/nis/jquery-1.9.1.js"></script>

<script src="resources/js/lib/underscore-1.7.0.min.js"></script>

<script src="resources/js/vs/backbone.js"></script>
<script src="resources/js/lib/backbone.validation.js"></script>
<script src="resources/js/vs/backbone.marionette.js"></script>
<script src="resources/js/vs/json2.js"></script>
<script src="resources/js/vs/backbone.babysitter.js"></script>

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

<!-- JAVASCRIPT  -->
<script src="resources/js/lib/nis/nis-utils.js"></script>

<script src="resources/js/vs/models/model.js"></script>

<script src="resources/js/lib/nis/views/paginator.js"></script>

<script src="resources/js/vs/views/header.js"></script>
<script src="resources/js/lib/nis/views/footer.js"></script>
<script src="resources/js/vs/views/home.js"></script>
<script src="resources/js/vs/views/list.js"></script>
<script src="resources/js/vs/views/details.js"></script>

<script src="resources/js/vs/template-info.js"></script>
<script src="resources/js/vs/main.js"></script>

<script src="resources/js/lib/nis/nis-common.js"></script>
<script src="resources/js/vs/backbone.bootstrap-modal.js"></script>

    <div id="content">
    </div>
  
    <script type="text/template" id="villain-template">
    </script>
    
    <script type="text/template" id="accordion-group-template">
      <div class="accordion-heading">
        <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#heroList" </a>
      </div>
      
      <div id="hero" class="accordion-body collapse" style="height: 0px;">
          <div class="accordion-inner">
            <ul>
            </ul>
          </div>
      </div>
    </script>
    
</body>

</html>